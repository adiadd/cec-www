import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const reasonsOptions = [
  { id: "build", label: "to build cool shit" },
  { id: "learn", label: "to learn and level up my skills" },
  { id: "meet", label: "to meet other cracked engineers" },
  { id: "flex", label: "to flex my projects and get feedback" },
  { id: "chaos", label: "just here for the chaos 🚀" },
  { id: "other", label: "other" },
] as const;

const interestsOptions = [
  { id: "coding", label: "coding & software hacks" },
  { id: "robotics", label: "robotics & hardware tinkering" },
  { id: "printing", label: "3d printing & cad design" },
  { id: "ai", label: "ai & machine learning" },
  { id: "gamedev", label: "game dev & graphics" },
  { id: "electronics", label: "electronics & circuitry" },
  { id: "breaking", label: "just here to break stuff and make it better" },
] as const;

const skillLevels = [
  { value: "newbie", label: "newbie (just getting started)" },
  { value: "hobbyist", label: "hobbyist (i've built a few things)" },
  { value: "pro", label: "pro (i live and breathe this stuff)" },
  { value: "legend", label: "legend (i'm the one people call for help)" },
] as const;

const discoveryOptions = [
  { value: "social", label: "social media (twitter/x, instagram, tiktok)" },
  { value: "youtube", label: "youtube" },
  { value: "friend", label: "friend or colleague" },
  { value: "search", label: "online search" },
  { value: "other", label: "other" },
] as const;

const formSchema = z.object({
  email: z.string().email("please enter a valid email"),
  twitter: z.string().min(1, "please enter your twitter/x handle"),
  website: z
    .string()
    .transform((value) => {
      if (!value) return "";
      // Clean up the URL by removing whitespace and spaces
      const cleanedUrl = value.trim().replace(/\s+/g, "");
      // If URL doesn't start with protocol, prepend https://
      if (!/^https?:\/\//i.test(cleanedUrl)) {
        return `https://${cleanedUrl}`;
      }
      return cleanedUrl;
    })
    .pipe(
      z
        .string()
        .url("please enter a valid url")
        .refine((url) => {
          try {
            const parsed = new URL(url);
            return parsed.hostname.includes(".");
          } catch {
            return false;
          }
        }, "please enter a valid domain")
        .optional()
        .or(z.literal(""))
    ),
  why: z.string().min(1, "please tell us why you want to join"),
  reasons: z.array(z.string()).min(1, "please select at least one reason"),
  interests: z
    .array(z.string())
    .min(1, "please select at least one interest")
    .max(3, "please select up to 3 interests"),
  skillLevel: z.string().min(1, "please select your skill level"),
  discovery: z.string().min(1, "please tell us how you found us"),
  discoveryOther: z.string().optional(),
  expectations: z
    .string()
    .min(1, "please tell us what you're looking to get out of this community"),
});

type FormValues = z.infer<typeof formSchema>;

export function JoinDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      twitter: "",
      website: "",
      why: "",
      reasons: [],
      interests: [],
      skillLevel: "",
      discovery: "",
      discoveryOther: "",
      expectations: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Parse the form data through zod schema again for extra safety
      const parsedData = formSchema.parse(data);

      // Clean up the data
      const cleanedData = {
        ...parsedData,
        twitter: parsedData.twitter.startsWith("@")
          ? parsedData.twitter
          : `@${parsedData.twitter}`,
        website: parsedData.website || null, // Convert empty string to null
      };

      console.log("Cleaned form data:", cleanedData);

      // TODO: Send data to your API endpoint
      // const response = await fetch('/api/submit-application', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cleanedData),
      // });

      // if (!response.ok) throw new Error('Failed to submit application');

      toast({
        title: "application submitted!",
        description: "we'll be in touch soon.",
        variant: "default",
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "submission failed",
        description: "please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold transition-all duration-300 hover:scale-105"
        >
          join the club
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">
            join the cracked engineers club
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    twitter/x handle
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    portfolio website (optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-site.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="why"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    why do you want to be a part of this?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="tell us your story..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasons"
              render={() => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    why are you here? (check all that apply)
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {reasonsOptions.map((reason) => (
                      <FormField
                        key={reason.id}
                        control={form.control}
                        name="reasons"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={reason.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(reason.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          reason.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== reason.id
                                          )
                                        );
                                  }}
                                  className="border-primary data-[state=checked]:border-primary"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-foreground">
                                {reason.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    what gets you hyped? (pick up to 3)
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {interestsOptions.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked && field.value.length >= 3) {
                                      return;
                                    }
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          interest.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          )
                                        );
                                  }}
                                  className="border-primary data-[state=checked]:border-primary"
                                />
                              </FormControl>
                              <FormLabel className="font-normal text-foreground">
                                {interest.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skillLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    what's your skill level?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select your skill level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discovery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    how did you find us?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select how you found us" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {discoveryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {form.watch("discovery") === "other" && (
              <FormField
                control={form.control}
                name="discoveryOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold">
                      please specify
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="expectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold">
                    what are you looking to get out of this community?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="tell us what you hope to achieve..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-black font-bold transition-all duration-300 hover:scale-105"
            >
              submit application
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
