import React from 'react';
import { ArrowRight, Github, Star } from 'lucide-react';

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-t from-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join thousands of users who have already made the switch to a better spreadsheet experience
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center">
            Start Free Trial
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => window.open('https://github.com/rybhrdwj/tabular', '_blank')} className="group bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center">
            <Github className="mr-3 w-6 h-6" />
            View on GitHub
          </button>
        </div>
        
        <div className="flex justify-center items-center space-x-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-700"></div>
          <span>10k+ Active Users</span>
          <div className="hidden sm:block w-px h-6 bg-gray-700"></div>
          <span>Free Forever</span>
        </div>
      </div>
    </section>
  );
}

export default CTA;