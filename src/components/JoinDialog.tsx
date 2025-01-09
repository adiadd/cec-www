import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

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
  twitter: z.string().optional(),
  website: z.string().url("please enter a valid url").optional().or(z.literal("")),
  why: z.string().min(1, "please tell us why you want to join"),
  reasons: z.array(z.string()).min(1, "please select at least one reason"),
  interests: z.array(z.string()).min(1, "please select at least one interest").max(3, "please select up to 3 interests"),
  skillLevel: z.string().min(1, "please select your skill level"),
  discovery: z.string().min(1, "please tell us how you found us"),
  discoveryOther: z.string().optional(),
  expectations: z.string().min(1, "please tell us what you're looking to get out of this community"),
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
    console.log("Form data:", data);
    // Here we would typically make an API call
    toast({
      title: "application submitted!",
      description: "we'll be in touch soon.",
    });
    setOpen(false);
    form.reset();
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
          <DialogTitle className="text-xl font-bold mb-4">join the cracked engineers club</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>twitter/x handle (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>portfolio website (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-site.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="why"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>why do you want to be a part of this?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="tell us your story..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasons"
              render={() => (
                <FormItem>
                  <FormLabel>why are you here? (check all that apply)</FormLabel>
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
                                      ? field.onChange([...field.value, reason.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== reason.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {reason.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>what gets you hyped? (pick up to 3)</FormLabel>
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
                                      ? field.onChange([...field.value, interest.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {interest.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skillLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>what's your skill level?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discovery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>how did you find us?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("discovery") === "other" && (
              <FormField
                control={form.control}
                name="discoveryOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>please specify</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="expectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>what are you looking to get out of this community?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="tell us what you hope to achieve..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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