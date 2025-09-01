import React from 'react';
import { ArrowRight, Table2 } from 'lucide-react';
import { useNavigate } from 'react-router';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-gray-600"></div>
          ))}
        </div>
      </div>
      
      {/* Floating Elements */}
      {/* <div className="absolute top-20 left-20 animate-pulse">
        <div className="w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-40 right-32 animate-pulse delay-1000">
        <div className="w-12 h-12 bg-green-500 rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-32 left-16 animate-pulse delay-2000">
        <div className="w-8 h-8 bg-orange-500 rounded-full opacity-70"></div>
      </div> */}
      
      <div className="text-center px-6 max-w-4xl mx-auto relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <Table2 className="w-12 h-12 text-white mr-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Tabular
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-300">
          The most intuitive spreadsheet experience. Built for modern workflows, 
          designed for seamless collaboration.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-500">
          <button onClick={() => navigate('/demo')} className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/15 flex items-center">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="group bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Dashboard
          </button>
        </div>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-12 animate-slide-up delay-700">
          <span className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-700">
            Real-time Collaboration
          </span>
          <span className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-700">
            Advanced Formulas
          </span>
          <span className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-700">
            Cloud Sync
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;