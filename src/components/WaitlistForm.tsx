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
        <h2 className="text-xl font-bold text-center mb-4">
          Be the first to crack the code
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Join the waitlist for exclusive access to projects, tutorials, and a community of like-minded builders.
        </p>
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
            {isSubmitting ? "Joining..." : "Let's Build"}
          </Button>
        </div>
      </div>
    </form>
  );
};