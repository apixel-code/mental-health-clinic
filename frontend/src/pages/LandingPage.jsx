import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteContent } from "../data/content";
import {
  Phone,
  ArrowRight,
  Brain,
  HeartPulse,
  Moon,
  Users,
  Shield,
  Sparkles,
  Quote,
  ChevronRight,
  Frown,
  Smile,
} from "lucide-react";

const iconMap = { Brain, HeartPulse, Moon, Users, Shield, Sparkles };

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============ HERO ============ */
const HeroSection = () => {
  const { hero, meta } = siteContent;
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-[#D98A6C] text-sm font-medium tracking-wider mb-6 uppercase">
              {meta.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-6"
            data-testid="hero-headline"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-[#475569] leading-relaxed mb-10 max-w-2xl"
            data-testid="hero-subheadline"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={meta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-btn"
              className="cta-pulse inline-flex items-center justify-center gap-3 bg-[#2C4B3B] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#1E3529] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <Phone size={20} />
              {hero.cta}
            </a>
            <a
              href="#services"
              data-testid="hero-secondary-btn"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2C4B3B] border border-[#2C4B3B]/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#F3F4F1] transition-all duration-300"
            >
              সেবাসমূহ দেখুন
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============ TRANSFORMATION ============ */
const TransformationSection = () => {
  const { transformation } = siteContent;
  return (
    <section
      data-testid="transformation-section"
      className="py-20 md:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight"
              data-testid="transformation-title"
            >
              {transformation.sectionTitle}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Before */}
          <FadeIn delay={0.1}>
            <div
              className="before-gradient rounded-3xl p-8 sm:p-10 border border-red-100"
              data-testid="transformation-before"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Frown size={24} className="text-red-500" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A]">
                  {transformation.before.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {transformation.before.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-red-400 mt-2.5 shrink-0" />
                    <span className="text-[#475569] text-base leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* After */}
          <FadeIn delay={0.2}>
            <div
              className="after-gradient rounded-3xl p-8 sm:p-10 border border-green-100"
              data-testid="transformation-after"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Smile size={24} className="text-green-600" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A]">
                  {transformation.after.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {transformation.after.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2.5 shrink-0" />
                    <span className="text-[#475569] text-base leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Center CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-16 text-center">
            <ChevronRight className="mx-auto text-[#2C4B3B] mb-4" size={28} />
            <p className="text-[#475569] text-base mb-6">
              পরিবর্তনের প্রথম ধাপ নিন আজই
            </p>
            <a
              href={siteContent.meta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="transformation-cta-btn"
              className="inline-flex items-center gap-2 bg-[#D98A6C] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#C27557] transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <Phone size={18} />
              এখনই কথা বলুন
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ============ AUTHORITY ============ */
const AuthoritySection = () => {
  const { authority } = siteContent;
  return (
    <section
      data-testid="authority-section"
      className="py-20 md:py-32 bg-[#F3F4F1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                <img
                  src={authority.image}
                  alt={authority.name}
                  className="w-full h-auto object-cover aspect-[4/5]"
                  data-testid="doctor-portrait"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#2C4B3B] text-white rounded-2xl p-5 shadow-xl hidden sm:block">
                <p className="text-2xl font-bold font-heading">
                  {authority.stats[0].value}
                </p>
                <p className="text-xs text-[#94A3B8]">
                  {authority.stats[0].label}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.2}>
            <div>
              <span className="text-[#D98A6C] text-sm font-medium tracking-wider uppercase mb-4 block">
                আপনার ডাক্তার
              </span>
              <h2
                className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4"
                data-testid="authority-title"
              >
                {authority.title}
              </h2>
              <h3 className="font-heading text-xl text-[#2C4B3B] font-semibold mb-2">
                {authority.name}
              </h3>
              <p className="text-sm text-[#94A3B8] mb-6">{authority.degrees}</p>
              <p
                className="text-base sm:text-lg text-[#475569] leading-relaxed mb-10"
                data-testid="authority-description"
              >
                {authority.description}
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4"
                data-testid="doctor-stats"
              >
                {authority.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <p className="font-heading text-2xl font-bold text-[#2C4B3B]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ============ SERVICES ============ */
const ServicesSection = () => {
  const { services } = siteContent;
  return (
    <section
      id="services"
      data-testid="services-section"
      className="py-20 md:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4"
              data-testid="services-title"
            >
              {services.sectionTitle}
            </h2>
            <p className="text-base text-[#475569] max-w-2xl mx-auto">
              {services.sectionSubtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon] || Brain;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="card-hover bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                  data-testid={`service-card-${i}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2C4B3B]/10 flex items-center justify-center mb-6">
                    <Icon size={26} className="text-[#2C4B3B]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============ TESTIMONIALS ============ */
const TestimonialsSection = () => {
  const { testimonials } = siteContent;
  return (
    <section
      data-testid="testimonials-section"
      className="py-20 md:py-32 bg-[#F3F4F1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4"
              data-testid="testimonials-title"
            >
              {testimonials.sectionTitle}
            </h2>
            <p className="text-sm text-[#94A3B8]">
              {testimonials.sectionSubtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full flex flex-col"
                data-testid={`testimonial-card-${i}`}
              >
                <Quote size={28} className="text-[#D98A6C] mb-6 shrink-0" />
                <p className="text-[#475569] text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm font-medium text-[#0F172A]">
                    {item.author}
                  </p>
                  <p className="text-xs text-[#94A3B8]">{item.context}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============ CTA SECTION ============ */
const CtaSection = () => {
  const { meta } = siteContent;
  return (
    <section data-testid="cta-section" className="py-20 md:py-32 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-[#1A2E24] rounded-3xl p-10 sm:p-16 text-center">
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
              data-testid="cta-headline"
            >
              আপনার সুস্থতার যাত্রা শুরু হোক আজই
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              একটি কথোপকথনই হতে পারে আপনার জীবনের টার্নিং পয়েন্ট। সাহস করে প্রথম পদক্ষেপটি নিন।
            </p>
            <a
              href={meta.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-book-btn"
              className="cta-pulse inline-flex items-center gap-3 bg-[#D98A6C] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#C27557] transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <Phone size={22} />
              অ্যাপয়েন্টমেন্ট বুক করুন
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ============ LANDING PAGE ============ */
export default function LandingPage() {
  return (
    <main data-testid="landing-page">
      <HeroSection />
      <TransformationSection />
      <AuthoritySection />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
