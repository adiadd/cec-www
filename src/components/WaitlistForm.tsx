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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div className="glass-panel p-6 space-y-4">
</lov-replace>
<lov-search>
            placeholder="Enter your email"
</lov-search>
<lov-replace>
            placeholder="enter your email"
        <div className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-black/50 border-white/10"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold transition-all duration-300 hover:scale-105"
          >
            {isSubmitting ? "joining..." : "let's build"}
          </Button>
        </div>
      </div>
    </form>
  );
};