import Hero from './Hero';
import Features from './Features';
import Demo from './Demo';
import CTA from './CTA';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Features />
      <Demo />
      <CTA />
    </div>
  );
}

export default Landing;