import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the club!",
      description: "We'll notify you when we launch.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[90vw] md:max-w-md mx-auto px-4">
      <div className="glass-panel p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-black/50 border-white/10 text-sm md:text-base"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-neon-blue hover:bg-neon-blue/80 text-black font-bold transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            {isSubmitting ? "joining..." : "let's build"}
          </Button>
        </div>
      </div>
    </form>
  );
};