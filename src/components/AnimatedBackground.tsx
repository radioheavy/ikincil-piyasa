import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa] dark:bg-gray-950">
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
        dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50 opacity-60"
      />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-conic from-purple-500/30 via-purple-500/10 to-purple-500/30 
            blur-2xl rounded-full mix-blend-multiply animate-mesh-1" />
          <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-conic from-blue-500/30 via-blue-500/10 to-blue-500/30 
            blur-2xl rounded-full mix-blend-multiply animate-mesh-2" />
          <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-conic from-indigo-500/30 via-indigo-500/10 to-indigo-500/30 
            blur-2xl rounded-full mix-blend-multiply animate-mesh-3" />
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Glass overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground; 