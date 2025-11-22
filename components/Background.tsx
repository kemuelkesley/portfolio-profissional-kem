import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-vivid-dark">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-vivid-purple/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-vivid-cyan/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-vivid-pink/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    </div>
  );
};

export default Background;