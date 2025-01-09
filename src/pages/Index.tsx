import { Brain } from "@/components/Brain";
import { JoinDialog } from "@/components/JoinDialog";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <main className="container mx-auto flex flex-col items-center justify-center space-y-8 md:space-y-12 z-10">
        {/* Header */}
        <header className="text-center space-y-4 w-full px-4">
          <h1 className="text-3xl md:text-6xl font-mono font-bold neon-text animate-flicker">
            cracked engineers club
          </h1>
        </header>

        {/* Brain visualization */}
        <div className="w-full max-w-[90vw] md:max-w-[600px]">
          <Brain />
        </div>

        {/* Join Dialog */}
        <JoinDialog />

        {/* Footer */}
        <footer className="text-center text-gray-400 mt-8 md:mt-12">
          <p className="animate-pulse font-mono text-sm md:text-base">
            humans doing cool shit
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;