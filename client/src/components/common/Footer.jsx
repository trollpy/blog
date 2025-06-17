import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="relative overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/40 to-slate-100/20"></div>
     
      {/* Ultra-minimal content */}
      <div className="relative container mx-auto px-6 py-0.1">
        <div className="max-w-4xl mx-auto">
         
          {/* Elegant divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-1"></div>
         
          {/* Minimal brand */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-light text-slate-800 tracking-[0.2em] mb-2">
              CODE & CHAOS
            </h2>
            <p className="text-sm text-slate-500 font-light tracking-wide max-w-md mx-auto leading-relaxed">
              Where ideas transform into digital experiences
            </p>
          </div>
         
          {/* Elegant divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-0.1"></div>
         
          {/* Minimal copyright */}
          <div className="text-center">
            <p className="text-xs font-light text-slate-400 tracking-[0.15em]">
              © {currentYear} sheriff thompho
            </p>
          </div>
         
        </div>
      </div>
     
      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </footer>
  );
};

export default Footer;