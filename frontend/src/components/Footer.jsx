import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white py-6 px-4 md:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Column */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#60A5FA]">Boardit</h3>
            <p className="text-[#94A3B8] text-sm">
              Collaborative whiteboard platform
            </p>
          </div>

          {/* Links Columns - Reduced spacing */}
          {[
            ["Product", ["Features", "Pricing", "Integrations"]],
            ["Resources", ["Docs", "Tutorials", "API"]],
            ["Company", ["About", "Blog", "Contact"]]
          ].map(([title, items], i) => (
            <div key={i} className="space-y-1">
              <h4 className="font-medium text-[#60A5FA] text-sm">{title}</h4>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-[#94A3B8] hover:text-[#38BDF8] text-sm hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compact bottom bar */}
        <div className="border-t border-[#334155] mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-[#94A3B8]">
            © {new Date().getFullYear()} Boardit
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-[#94A3B8] hover:text-[#38BDF8] hover:underline"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-[#94A3B8] hover:text-[#38BDF8] hover:underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;