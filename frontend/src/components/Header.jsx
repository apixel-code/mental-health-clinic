import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteContent } from "../data/content";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { meta, nav } = siteContent;

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[#E2E8F0]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col" data-testid="header-logo">
            <span className="font-heading text-lg sm:text-xl font-bold text-[#2C4B3B] leading-tight">
              {meta.siteName}
            </span>
            <span className="text-xs text-[#94A3B8] tracking-wide">
              {meta.tagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {nav.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.path.replace(/[/#]/g, '') || 'home'}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-[#2C4B3B]"
                    : "text-[#475569] hover:text-[#2C4B3B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={meta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-cta-btn"
              className="flex items-center gap-2 bg-[#2C4B3B] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#1E3529] transition-all duration-300 hover:-translate-y-0.5 shadow-md"
            >
              <Phone size={14} />
              <span>যোগাযোগ</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-[#2C4B3B] hover:bg-[#2C4B3B]/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#E2E8F0]/60"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-6 space-y-4">
              {nav.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.path.replace(/[/#]/g, '') || 'home'}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium text-[#475569] hover:text-[#2C4B3B] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={meta.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-cta-btn"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#2C4B3B] text-white px-6 py-3 rounded-full text-base font-medium mt-4"
              >
                <Phone size={16} />
                <span>অ্যাপয়েন্টমেন্ট বুক করুন</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
