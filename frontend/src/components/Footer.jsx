import { siteContent } from "../data/content";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export const Footer = () => {
  const { meta, footer } = siteContent;

  return (
    <footer
      data-testid="site-footer"
      id="contact"
      className="bg-[#1A2E24] text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <h3
              className="font-heading text-2xl font-bold mb-4 text-white"
              data-testid="footer-brand"
            >
              {meta.siteName}
            </h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              {meta.tagline}
            </p>
            <a
              href={meta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-btn"
              className="inline-flex items-center gap-2 bg-[#D98A6C] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#C27557] transition-all duration-300"
            >
              <Phone size={16} />
              অ্যাপয়েন্টমেন্ট বুক করুন
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">
              যোগাযোগ
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${meta.phone}`}
                data-testid="footer-phone"
                className="flex items-start gap-3 text-[#94A3B8] hover:text-white transition-colors text-sm"
              >
                <Phone size={16} className="mt-1 shrink-0" />
                <span>{meta.phone}</span>
              </a>
              <a
                href={`mailto:${meta.email}`}
                data-testid="footer-email"
                className="flex items-start gap-3 text-[#94A3B8] hover:text-white transition-colors text-sm"
              >
                <Mail size={16} className="mt-1 shrink-0" />
                <span>{meta.email}</span>
              </a>
              <div
                className="flex items-start gap-3 text-[#94A3B8] text-sm"
                data-testid="footer-address"
              >
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>{meta.address}</span>
              </div>
            </div>
          </div>

          {/* Chamber Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6 text-white">
              চেম্বার সময়সূচি
            </h4>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
              {meta.chamberHours}
            </p>
            <div
              className="bg-[#2C4B3B] rounded-2xl p-5 border border-white/10"
              data-testid="footer-emergency"
            >
              <p className="text-xs text-[#D98A6C] font-medium mb-1">
                জরুরি হেল্পলাইন
              </p>
              <p className="text-white text-sm">{footer.emergencyNote}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#94A3B8] text-xs">{footer.copyright}</p>
          <p className="text-[#94A3B8] text-xs flex items-center gap-1">
            তৈরি করা হয়েছে <Heart size={12} className="text-[#D98A6C]" /> দিয়ে
          </p>
        </div>
      </div>
    </footer>
  );
};
