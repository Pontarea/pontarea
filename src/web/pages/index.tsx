import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePontareaContent } from "@/hooks/usePontareaContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "wouter";

// ============================================
// PONTAREA - SEGELKURSE IN KROATIEN
// ============================================

const Navigation = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { href: "#kurse", label: t('nav.courses') },
    { href: "#warum-pontarea", label: t('nav.why') },
  ];
  const rightLinks = [
    { href: "#yacht-miete", label: t('nav.yacht') },
    { href: "#faq", label: t('nav.faq') },
    { href: "#kontakt", label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md border-b border-sky-100" : "bg-white/50 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="hidden md:flex items-center gap-6 flex-1">
            {leftLinks.map((link) => (
              <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium whitespace-nowrap">{link.label}</button>
            ))}
          </div>
          <a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center justify-center">
            <img src="/pontarea-logo-animated.gif" alt="Pontarea Logo" className="h-16 md:h-20 object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {rightLinks.map((link) => (
              <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium whitespace-nowrap">{link.label}</button>
            ))}
            <Button onClick={() => scrollToSection("#kontakt")} className="h-10 px-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all">{t('nav.signup')}</Button>
            <LanguageSwitcher />
          </div>
          <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 border-t border-sky-100 ${isMenuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="px-6 py-4 space-y-1">
          {[...leftLinks, ...rightLinks].map((link) => (
            <button key={link.href} onClick={() => scrollToSection(link.href)} className="block w-full text-left py-3 text-gray-700 hover:text-sky-600 transition-colors text-sm">{link.label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ============================================
// HERO
// ============================================
const HeroSection = () => {
  const content = usePontareaContent();
  const { t } = useLanguage();
  const scrollToSection = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      </div>
      <div className="absolute inset-0">
        <img src={content.hero?.heroImage || "/sailing-instructor-new.webp"} alt="Yacht sailing in Croatia" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/60 to-white/80" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-sky-200 rounded-full px-4 py-2 mb-8 animate-fadeIn shadow-sm">
          <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full animate-pulse" />
          <span className="text-gray-700 text-sm tracking-wide font-medium">{t('hero.badge')}</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight animate-fadeInUp leading-tight">{t('hero.title')}</h1>
        <p className="text-2xl text-sky-600 font-semibold mb-8 animate-fadeInUp animation-delay-200">{t('hero.subtitle')}</p>
        <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp animation-delay-400 bg-blue-50 border-l-4 border-sky-500 px-6 py-4 rounded">
          <p className="text-gray-700 font-semibold mb-2">{t('hero.statsTitle')}</p>
          <p className="text-gray-600">{t('hero.statsDescription')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 animate-fadeInUp animation-delay-400">
          {[
            { icon: "📍", text: t('hero.location') },
            { icon: "👥", text: t('hero.group') },
            { icon: "⛵", text: t('hero.format') },
            { icon: "🎯", text: t('hero.goal') },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-left col-span-1 md:col-span-2">
            <span className="text-2xl">📅</span>
            <span className="text-gray-700 font-medium">{t('hero.schedule')}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fadeInUp animation-delay-600">
          <Button size="lg" onClick={() => scrollToSection("#kurse")} className="h-14 px-10 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-full hover:shadow-lg transition-all duration-300">{t('hero.discover')}</Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("#kontakt")} className="h-14 px-10 border-2 border-sky-400 text-sky-600 font-semibold text-lg rounded-full hover:bg-sky-50 transition-all duration-300 bg-white">{t('hero.signupNow')}</Button>
        </div>
        <p className="text-gray-600 text-sm animate-fadeInUp animation-delay-600">{t('hero.answerTime')}</p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-sky-400 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-sky-400 rounded-full" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
      `}</style>
    </section>
  );
};

// ============================================
// TRUST / WHY PONTAREA
// ============================================
const TrustSection = () => {
  const { t } = useLanguage();
  const stats = [
    { number: t('stats.students'), label: t('stats.studentsLabel'), icon: "👥", note: t('stats.studentsNote') },
    { number: t('stats.successRate'), label: t('stats.successRateLabel'), icon: "✅" },
    { number: t('stats.groupSize'), label: t('stats.groupSizeLabel'), icon: "⛵" },
    { number: t('stats.experience'), label: t('stats.experienceLabel'), icon: "🏆" },
  ];

  return (
    <section id="warum-pontarea" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{t('stats.title')}</h2>
          <p className="text-lg text-gray-600">{t('stats.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-sky-600 mb-2">{stat.number}</div>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
              {stat.note && <p className="text-xs text-gray-500 mt-3">{stat.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// REVIEWS
// ============================================
const ReviewsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-sky-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('testimonials.trainerTitle')}</h3>
            <div className="space-y-6 mb-8">
              {['review1', 'review2', 'review3'].map((key) => (
                <div key={key} className="flex gap-2">
                  <span className="text-yellow-400 flex gap-1">★★★★★</span>
                  <p className="text-gray-700 italic">"{t(`testimonials.${key}`)}"</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-sky-300 text-sky-600 hover:bg-sky-50" onClick={() => window.open("https://maps.app.goo.gl/coqwatgTno6VFN9A7", "_blank")}>{t('testimonials.viewAll')}</Button>
          </div>
          <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('testimonials.pontareaTitle')}</h3>
            <div className="space-y-6 mb-8">
              {['review4', 'review5', 'review6'].map((key) => (
                <div key={key} className="flex gap-2">
                  <span className="text-yellow-400 flex gap-1">★★★★★</span>
                  <p className="text-gray-700 italic">"{t(`testimonials.${key}`)}"</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50" onClick={() => window.open("https://maps.app.goo.gl/A6kvwj79UC5c79bM7", "_blank")}>{t('testimonials.viewAll')}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COURSES
// ============================================
const CoursesSection = () => {
  const { t } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const scrollToSection = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const courses = [
    {
      id: 1, title: t('courses.captain.title'), subtitle: t('courses.captain.subtitle'), price: t('courses.captain.price'), dates: ["02.05.2026", "26.09.2026"], duration: t('courses.captain.duration'),
      description: t('courses.captain.description'),
      features: [t('courses.captain.feature1'), t('courses.captain.feature2'), t('courses.captain.feature3'), t('courses.captain.feature4'), t('courses.captain.feature5'), t('courses.captain.feature6')],
      gradient: "from-sky-400 to-blue-500", image: "/captain-helm_new_resized.webp",
      learnTitle: t('courses.captain.learnTitle'),
      learnContent: [t('courses.captain.learn1'), t('courses.captain.learn2'), t('courses.captain.learn3'), t('courses.captain.learn4'), t('courses.captain.learn5'), t('courses.captain.learn6'), t('courses.captain.learn7'), t('courses.captain.learn8')],
    },
    {
      id: 2, title: t('courses.harbor.title'), subtitle: t('courses.harbor.subtitle'), price: t('courses.harbor.price'), dates: ["25.04.2026", "09.05.2026"], duration: t('courses.harbor.duration'),
      description: t('courses.harbor.description'),
      features: [t('courses.harbor.feature1'), t('courses.harbor.feature2'), t('courses.harbor.feature3'), t('courses.harbor.feature4'), t('courses.harbor.feature5'), t('courses.harbor.feature6')],
      gradient: "from-teal-400 to-cyan-500", image: "/marina-docking_resized.webp", unique: true,
      learnTitle: t('courses.harbor.learnTitle'),
      learnContent: [t('courses.harbor.learn1'), t('courses.harbor.learn2'), t('courses.harbor.learn3'), t('courses.harbor.learn4'), t('courses.harbor.learn5'), t('courses.harbor.learn6'), t('courses.harbor.learn7'), t('courses.harbor.learn8')],
      fearsBefore: [t('courses.harbor.fear1'), t('courses.harbor.fear2'), t('courses.harbor.fear3'), t('courses.harbor.fear4'), t('courses.harbor.fear5'), t('courses.harbor.fear6'), t('courses.harbor.fear7')],
    }
  ];

  return (
    <section id="kurse" className="py-32 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('courses.sectionTitle')}</p>
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-6">{t('courses.title')}</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">{t('courses.subtitle')}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white/80 backdrop-blur-xl border-2 border-sky-100 rounded-3xl overflow-hidden hover:border-sky-300 transition-all duration-500 shadow-lg hover:shadow-2xl relative">
              {course.unique && <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">{t('courses.harbor.uniqueBadge')}</div>}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course.id)}>
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${course.gradient} text-white font-bold px-5 py-3 rounded-2xl shadow-lg`}>{course.price}</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${course.gradient}`} />
                  <span className="text-gray-500 text-sm font-medium">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sky-600 text-sm font-semibold mb-4">{course.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                <div className="mb-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <p className="text-gray-700 font-semibold mb-2">{t('courses.nextDates')}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.dates.map((date, idx) => <span key={idx} className="bg-white border border-sky-300 text-sky-700 font-medium px-3 py-1 rounded-full text-sm">{date}</span>)}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => scrollToSection("#kontakt")} className={`w-full h-12 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}>{t('courses.bookNow')}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-700 text-lg mb-2"><strong>{t('courses.location')}</strong></p>
          <p className="text-gray-600">{t('stats.groupSize')} {t('stats.groupSizeLabel')} • {t('stats.students')} {t('stats.studentsLabel')} • {t('stats.successRate')} {t('stats.successRateLabel')}</p>
        </div>
      </div>
      {selectedCourse && (
        <Dialog open={true} onOpenChange={(open) => !open && setSelectedCourse(null)}>
          <DialogContent className="max-w-2xl">
            {(() => {
              const course = courses.find(c => c.id === selectedCourse);
              if (!course) return null;
              return (<>
                <DialogHeader><DialogTitle>{course.title}</DialogTitle><DialogClose onClick={() => setSelectedCourse(null)} /></DialogHeader>
                <div className="px-6 py-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{course.learnTitle}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {course.learnContent.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {course.id === 2 && course.fearsBefore && (
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('courses.fearsDialogTitle')}</h3>
                      <p className="text-gray-600 mb-4">{t('courses.fearsDialogIntro')}</p>
                      <div className="space-y-3 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        {course.fearsBefore.map((fear, idx) => (
                          <div key={idx} className="flex items-start gap-3"><span className="text-orange-500 font-bold flex-shrink-0">✗</span><span className="text-gray-700">{fear}</span></div>
                        ))}
                      </div>
                      <p className="text-gray-600 mt-4 text-sm"><strong>{t('courses.fearsDialogAfter')}</strong> {t('courses.fearsDialogAfterText')}</p>
                    </div>
                  )}
                  <div className="border-t pt-6">
                    <Button onClick={() => { setSelectedCourse(null); scrollToSection("#kontakt"); }} className={`w-full h-12 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}>{t('courses.bookNow')}</Button>
                  </div>
                </div>
              </>);
            })()}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

// ============================================
// INCLUSIVE / PRICING
// ============================================
const InclusiveSection = () => {
  const { t } = useLanguage();
  const included = [t('pricing.item1'), t('pricing.item2'), t('pricing.item3'), t('pricing.item4'), t('pricing.item5'), t('pricing.item6'), t('pricing.item7'), t('pricing.item8')];
  const bordkasseItems = [t('pricing.bordkasse1'), t('pricing.bordkasse2'), t('pricing.bordkasse3')];
  const additionalCosts = [
    { name: t('pricing.cost1Name'), price: t('pricing.cost1Price') },
    { name: t('pricing.cost2Name'), price: t('pricing.cost2Price') },
    { name: t('pricing.cost3Name'), price: t('pricing.cost3Price') },
    { name: t('pricing.cost4Name'), price: t('pricing.cost4Price') },
    { name: t('pricing.cost5Name'), price: t('pricing.cost5Price') },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('pricing.title')}</h2>
          <p className="text-lg text-gray-600">{t('pricing.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-green-500">✓</span> {t('pricing.included')}</h3>
            <ul className="space-y-3">
              {included.map((item, idx) => <li key={idx} className="flex gap-3 text-gray-700"><span className="text-sky-500 font-bold text-lg">•</span><span>{item}</span></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-orange-500">⚠</span> {t('pricing.additional')}</h3>
            <div className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t('pricing.bordkasseTitle')} <span className="text-orange-600">{t('pricing.bordkasseAmount')}</span></h4>
              <p className="text-gray-700 mb-4 text-sm">{t('pricing.bordkasseDesc')}</p>
              <ul className="space-y-2">
                {bordkasseItems.map((item, idx) => <li key={idx} className="flex gap-3 text-gray-700 text-sm"><span className="text-orange-500 font-bold">→</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-sky-300 bg-sky-50"><th className="text-left py-2 font-semibold text-gray-800">{t('pricing.otherCosts')}</th><th className="text-right py-2 font-semibold text-gray-800">{t('pricing.perPerson')}</th></tr></thead>
                <tbody className="divide-y divide-sky-100">
                  {additionalCosts.map((cost, idx) => <tr key={idx} className="hover:bg-sky-50 transition-colors"><td className="py-3 text-gray-700">{cost.name}</td><td className="text-right text-gray-700 font-semibold">{cost.price}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="bg-sky-50 border border-sky-300 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">{t('pricing.kautionTitle')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white border border-sky-200 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">{t('pricing.kautionWithout')}</p>
                  <p className="text-2xl font-bold text-gray-900">{t('pricing.kautionWithoutAmount')}</p>
                  <p className="text-sm text-gray-600 mt-2">{t('pricing.kautionWithoutDesc')}<br/><span className="font-semibold">{t('pricing.kautionWithoutPerPerson')}</span></p>
                  <p className="text-xs text-gray-500 mt-2">{t('pricing.kautionWithoutNote')}</p>
                </div>
                <div className="bg-amber-50 border-2 border-amber-400 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">{t('pricing.kautionWith')}</p>
                  <p className="text-2xl font-bold text-amber-600">{t('pricing.kautionWithAmount')}</p>
                  <p className="text-sm text-gray-700 mt-2">{t('pricing.kautionWithDesc')}<br/><span className="font-semibold text-amber-700">{t('pricing.kautionWithTotal')}</span></p>
                  <p className="text-xs text-amber-700 mt-2 font-semibold">{t('pricing.kautionWithNote')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200"><strong>Wichtig:</strong> {t('pricing.kautionImportant')}</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
              <p className="text-gray-800 text-sm"><strong>{t('pricing.summaryTitle')}</strong><br/>• {t('pricing.summary1')}<br/>• {t('pricing.summary2')}<br/>• {t('pricing.summary3')}<br/><span className="font-semibold">{t('pricing.summaryTotal')}</span> {t('pricing.summaryOptions')}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-green-50 border border-green-300 rounded-lg p-6 text-center">
          <p className="text-gray-800"><strong>{t('pricing.transparencyLabel')}</strong> {t('pricing.transparencyNote')}</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS
// ============================================
const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [
    { number: 1, title: t('howItWorks.step1Title'), description: t('howItWorks.step1Desc'), icon: t('howItWorks.step1Icon') },
    { number: 2, title: t('howItWorks.step2Title'), description: t('howItWorks.step2Desc'), icon: t('howItWorks.step2Icon') },
    { number: 3, title: t('howItWorks.step3Title'), description: t('howItWorks.step3Desc'), icon: t('howItWorks.step3Icon') },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-gray-600">{t('howItWorks.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative h-full">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all h-full flex flex-col">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="inline-block bg-sky-500 text-white font-bold px-4 py-2 rounded-full mb-4 mx-auto">{t('howItWorks.step')} {step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 flex-grow">{step.description}</p>
              </div>
              {idx < steps.length - 1 && <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20"><div className="text-4xl text-sky-300">→</div></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SCHEDULE
// ============================================
const ScheduleDetailSection = () => {
  const { t } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const days = [1, 2, 3, 4, 5, 6, 7, 8];
  const dailySchedule = days.map((d) => ({
    day: t(`schedule.day${d}`),
    title: t(`schedule.day${d}Title`),
    brief: t(`schedule.day${d}Brief`),
    detailed: t(`schedule.day${d}Detailed`),
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('schedule.title')}</h2>
          <p className="text-lg text-gray-600">{t('schedule.subtitle')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('schedule.note')}</p>
        </div>
        <div className="space-y-4 mb-12">
          {dailySchedule.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-sky-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <button onClick={() => setExpandedDay(expandedDay === idx ? null : idx)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-colors">
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900 text-lg">{item.day}</div>
                  <div className="text-sky-600 font-semibold">{item.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{item.brief}</div>
                </div>
                <div className={`text-2xl text-sky-500 transition-transform ${expandedDay === idx ? "rotate-180" : ""}`}>▼</div>
              </button>
              {expandedDay === idx && (
                <div className="px-6 py-4 bg-sky-50 border-t border-sky-200">
                  <p className="text-gray-700"><strong>{t('schedule.detailedAgenda')} {item.day}:</strong> {item.detailed}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded">
          <p className="text-gray-700"><strong>{t('schedule.noteLabel')}</strong> {t('schedule.bottomNote')}</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// YACHT RENTAL
// ============================================
const YachtRentalSection = () => {
  const { t } = useLanguage();
  const offers = [
    { title: t('yacht.offer1Title'), desc: t('yacht.offer1Desc') },
    { title: t('yacht.offer2Title'), desc: t('yacht.offer2Desc') },
    { title: t('yacht.offer3Title'), desc: t('yacht.offer3Desc') },
    { title: t('yacht.offer4Title'), desc: t('yacht.offer4Desc') },
  ];
  const benefits = [
    { icon: "🚤", title: t('yacht.benefit1Title'), desc: t('yacht.benefit1Desc') },
    { icon: "🌍", title: t('yacht.benefit2Title'), desc: t('yacht.benefit2Desc') },
    { icon: "💰", title: t('yacht.benefit3Title'), desc: t('yacht.benefit3Desc') },
    { icon: "👨‍⚓", title: t('yacht.benefit4Title'), desc: t('yacht.benefit4Desc') },
  ];
  const colors = ["from-sky-50 to-blue-50 border-sky-200", "from-teal-50 to-cyan-50 border-teal-200", "from-blue-50 to-indigo-50 border-blue-200", "from-cyan-50 to-sky-50 border-cyan-200"];

  return (
    <section id="yacht-miete" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('yacht.title')}</h2>
          <p className="text-lg text-gray-600">{t('yacht.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('yacht.sectionTitle')}</h3>
            <p className="text-gray-700 mb-4">{t('yacht.intro')}</p>
            <p className="text-gray-700 mb-6"><strong>{t('yacht.offerIntro')}</strong></p>
            <ul className="space-y-3 mb-8">
              {offers.map((o, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700"><span className="text-sky-500 font-bold text-lg">✓</span><span><strong>{o.title}</strong> – {o.desc}</span></li>
              ))}
            </ul>
            <a href="https://pontarea.com/de/search/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105">{t('yacht.browseButton')}</a>
          </div>
          <div className="space-y-4">
            {benefits.map((b, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${colors[idx]} border-2 rounded-2xl p-6 hover:shadow-lg transition-all`}>
                <div className="flex gap-4"><div className="text-4xl">{b.icon}</div><div><h4 className="font-bold text-gray-900 mb-1">{b.title}</h4><p className="text-sm text-gray-700">{b.desc}</p></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 bg-gradient-to-r from-sky-100 to-blue-100 border-2 border-sky-300 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('yacht.ctaTitle')}</h3>
          <p className="text-gray-700 mb-6">{t('yacht.ctaDesc')}</p>
          <a href="https://pontarea.com/de/search/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors">{t('yacht.catalogButton')}</a>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ
// ============================================
const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const faqItems = Array.from({ length: 10 }, (_, i) => ({ question: t(`faq.q${i + 1}`), answer: t(`faq.a${i + 1}`) }));

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('faq.title')}</h2>
          <p className="text-lg text-gray-600">{t('faq.subtitle')}</p>
        </div>
        <Accordion type="single" collapsible value={openIndex.toString()}>
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={idx.toString()} className="border-b border-sky-200 mb-4">
              <AccordionTrigger onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} className="text-left py-4 px-0 hover:text-sky-600 transition-colors font-semibold text-gray-900 text-lg">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4 pt-2">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 bg-sky-50 border border-sky-300 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4"><strong>{t('faq.moreQuestions')}</strong></p>
          <p className="text-gray-700 mb-6">{t('faq.contactText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+491764443667" className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors">{t('faq.callButton')}</a>
            <a href="mailto:info@pontarea.de" className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors">{t('faq.emailButton')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BOOKING FORM
// ============================================
const BookingFormSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ firstName: "", countryCode: "+49", phone: "", email: "", preferredDate: "", package: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Form submitted:", formData); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); };

  return (
    <section id="kontakt" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600">{t('contact.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border-2 border-sky-200 rounded-2xl p-8 shadow-lg">
              {submitted && <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">{t('contact.success')}</div>}
              <div className="space-y-6">
                <div><Label htmlFor="firstName" className="text-gray-800 font-semibold mb-2 block">{t('contact.name')} *</Label><Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder={t('contact.namePlaceholder')} className="border-sky-300 focus:border-sky-500 focus:ring-sky-500" /></div>
                <div>
                  <Label htmlFor="phone" className="text-gray-800 font-semibold mb-2 block">{t('contact.phone')} *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.countryCode} onValueChange={(value) => setFormData({ ...formData, countryCode: value })}>
                      <SelectTrigger className="w-28 border-sky-300"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem><SelectItem value="+7">🇷🇺 +7</SelectItem><SelectItem value="+43">🇦🇹 +43</SelectItem><SelectItem value="+41">🇨🇭 +41</SelectItem><SelectItem value="+1">🇺🇸 +1</SelectItem><SelectItem value="+44">🇬🇧 +44</SelectItem><SelectItem value="+385">🇭🇷 +385</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder={t('contact.phonePlaceholder')} className="flex-1 border-sky-300" />
                  </div>
                </div>
                <div><Label htmlFor="email" className="text-gray-800 font-semibold mb-2 block">{t('contact.email')}</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('contact.emailPlaceholder')} className="border-sky-300" /></div>
                <div>
                  <Label htmlFor="preferredDate" className="text-gray-800 font-semibold mb-2 block">{t('contact.date')}</Label>
                  <Select value={formData.preferredDate} onValueChange={(val) => setFormData(prev => ({ ...prev, preferredDate: val }))}>
                    <SelectTrigger className="border-sky-300"><SelectValue placeholder={t('contact.datePlaceholder')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hafenmanoever-april">{t('contact.dateHafenApril')}</SelectItem>
                      <SelectItem value="kapitaenkurs-mai">{t('contact.dateKapitanMai')}</SelectItem>
                      <SelectItem value="hafenmanoever-mai">{t('contact.dateHafenMai')}</SelectItem>
                      <SelectItem value="kapitaenkurs-sept">{t('contact.dateKapitanSept')}</SelectItem>
                      <SelectItem value="flexibel">{t('contact.dateFlexibel')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="package" className="text-gray-800 font-semibold mb-2 block">{t('contact.course')}</Label>
                  <Select value={formData.package} onValueChange={(val) => setFormData(prev => ({ ...prev, package: val }))}>
                    <SelectTrigger className="border-sky-300"><SelectValue placeholder={t('contact.coursePlaceholder')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kapitaenkurs">{t('contact.courseKapitan')}</SelectItem>
                      <SelectItem value="hafenmanoever">{t('contact.courseHafen')}</SelectItem>
                      <SelectItem value="unsure">{t('contact.courseUnsure')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label htmlFor="message" className="text-gray-800 font-semibold mb-2 block">{t('contact.message')}</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.messagePlaceholder')} rows={4} className="border-sky-300" /></div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:shadow-lg transition-all">{t('contact.submit')}</Button>
                <p className="text-center text-gray-600 text-sm">{t('hero.answerTime')}</p>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.open("https://wa.me/491764443667", "_blank")}>
              <div className="text-5xl mb-3">💬</div>
              <h4 className="font-bold text-green-900 mb-2">{t('contact.whatsappTitle')}</h4>
              <p className="text-sm text-green-800 mb-4">{t('contact.whatsappDesc')}</p>
              <Button variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50">{t('contact.whatsappButton')}</Button>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.location.href = "tel:+491764443667"}>
              <div className="text-5xl mb-3">☎️</div>
              <h4 className="font-bold text-sky-900 mb-2">{t('contact.phoneTitle')}</h4>
              <p className="text-sm text-sky-800 mb-4">{t('contact.phoneDesc')}</p>
              <Button variant="outline" className="w-full border-sky-400 text-sky-600 hover:bg-sky-50">+49 176 44437667</Button>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.location.href = "mailto:info@pontarea.de"}>
              <div className="text-5xl mb-3">✉️</div>
              <h4 className="font-bold text-purple-900 mb-2">{t('contact.emailTitle')}</h4>
              <p className="text-sm text-purple-800 mb-4">{t('contact.emailDesc')}</p>
              <Button variant="outline" className="w-full border-purple-400 text-purple-600 hover:bg-purple-50">{t('contact.emailButton')}</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4"><strong>{t('contact.trustTitle')}</strong></p>
          <p className="text-gray-700 mb-8">{t('contact.trustDesc')}</p>
        </div>
        <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-300 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.bogdanTitle')}</h3>
              <p className="text-gray-700 mb-6">{t('contact.bogdanDesc')}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><span className="text-2xl">👤</span><span className="text-gray-900 font-semibold">Bogdan Zambrovskij</span></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📧</span><a href="mailto:info@pontarea.de" className="text-sky-600 font-semibold hover:text-sky-700">info@pontarea.de</a></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📱</span><a href="tel:+491764443667" className="text-sky-600 font-semibold hover:text-sky-700">+49 176 44437667</a></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📍</span><div className="text-gray-700"><p className="font-semibold">Bogdan Zambrovskij</p><p>Konstanzer Str. 46</p><p>80809 München</p></div></div>
              </div>
            </div>
            <div className="bg-white border-2 border-sky-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-4"><strong>{t('contact.coursesOnSite')}</strong></p>
              <div className="space-y-2 mb-4"><p className="font-semibold text-gray-900">🇭🇷 Marina Dalmacija</p><p className="text-sm text-gray-700">Sukošan, Kroatien</p></div>
              <p className="text-xs text-gray-500">{t('contact.bogdanOnSite')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 opacity-50" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><img src="/pontarea-logo.svg" alt="Pontarea Logo" className="h-6" /></div>
            <p className="text-gray-400 text-sm">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.navTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#kurse" className="hover:text-sky-400 transition-colors">{t('nav.courses')}</a></li>
              <li><a href="#warum-pontarea" className="hover:text-sky-400 transition-colors">{t('nav.why')}</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#kontakt" className="hover:text-sky-400 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><span className="font-semibold text-white">Bogdan Zambrovskij</span></li>
              <li><a href="mailto:info@pontarea.de" className="hover:text-sky-400 transition-colors">info@pontarea.de</a></li>
              <li><a href="tel:+491764443667" className="hover:text-sky-400 transition-colors">+49 176 44437667</a></li>
              <li className="pt-1">Konstanzer Str. 46</li>
              <li>80809 München</li>
              <li className="text-xs text-gray-500">{t('footer.marinaName')}<br/>{t('footer.marinaCity')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.legalTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/impressum" className="hover:text-sky-400 transition-colors">{t('footer.impressum')}</Link></li>
              <li><Link href="/datenschutz" className="hover:text-sky-400 transition-colors">{t('footer.datenschutz')}</Link></li>
              <li><Link href="/agb" className="hover:text-sky-400 transition-colors">{t('footer.agb')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-sm text-center">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function HomePage() {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <ReviewsSection />
      <CoursesSection />
      <InclusiveSection />
      <ProcessSection />
      <ScheduleDetailSection />
      <YachtRentalSection />
      <FAQSection />
      <BookingFormSection />
      <Footer />
    </div>
  );
}
