/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Phone, HelpCircle, ArrowLeft, Shield, Award, MapPin, 
  Layers, MessageSquare, Calculator, FileText, ChevronRight, Menu, 
  X, Compass, Sparkles, Check, Send, CheckCircle, Truck
} from "lucide-react";

import { productsList, projectsList, teamStats, IMAGES } from "./data";
import AiConsultant from "./components/AiConsultant";
import MaterialCalculator from "./components/MaterialCalculator";
import QuotationPortal from "./components/QuotationPortal";
import HeroInteractiveCockpit from "./components/HeroInteractiveCockpit";
import { BatchingWorkflow, ConcreteLabSimulator, TechnicalFAQHub } from "./components/HomeExtraSections";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedProduct, setSelectedProduct] = useState<string>("ready-mix");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [helpTrayOpen, setHelpTrayOpen] = useState(false);

  // Parallax configuration tracking window scrolling
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(window.scrollY / totalHeight);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Reset or call once at setup
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prepopulate state for order quotes from calculator
  const [prepopulatedOrder, setPrepopulatedOrder] = useState<{
    productType: string;
    calculatedVolume: number;
    quantity: number;
    notes: string;
  } | null>(null);

  // Quick contact form state
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Navigation Links
  const navLinks = [
    { id: "home", label: "صفحه اصلی" },
    { id: "products", label: "محصولات" },
    { id: "services", label: "خدمات و برآورد فنی" },
    { id: "projects", label: "پروژه‌ها" },
    { id: "about", label: "درباره ما" },
    { id: "contact", label: "تماس با ما" },
  ];

  const handlePrepopulateQuote = (productType: string, calculatedVolume: number, quantity: number, notes: string) => {
    setPrepopulatedOrder({
      productType,
      calculatedVolume,
      quantity,
      notes,
    });
    // Direct view to Quotation panel
    setActiveTab("services");
    
    // Smooth scroll down to order form
    setTimeout(() => {
      const el = document.getElementById("quotation-tracker-segment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMsg) return;
    
    setContactLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          message: contactMsg
        })
      });
      if (response.ok) {
        setContactSuccess(true);
        setContactName("");
        setContactPhone("");
        setContactMsg("");
        setTimeout(() => setContactSuccess(false), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* Scroll Progress Bar at very top of screen */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-l from-blue-850 to-blue-400 z-55 pointer-events-none origin-right will-change-transform"
        style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "right" }}
      />
      
      {/* HEADER BAR - Exact representation from reference image */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-150/80 shadow-sm px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Right Action buttons and user triggers */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setActiveTab("services");
                setTimeout(() => {
                  document.getElementById("quotation-tracker-segment")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="bg-blue-850 hover:bg-blue-700 text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition duration-150 cursor-pointer"
            >
              درخواست قیمت
            </button>
            
            {/* Quick-Info Grid grid action icon */}
            <button 
              onClick={() => setHelpTrayOpen(!helpTrayOpen)}
              className="p-2.5 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100 transition duration-150 cursor-pointer"
              title="دستیار سریع اطلاعات"
            >
              <Compass className="w-5 h-5" />
            </button>

            {/* Mobile hamburger menu */}
            <button 
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
              className="p-2.5 md:hidden bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
            >
              {hamburgerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Center Navigation Menus */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setHamburgerOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition duration-200 cursor-pointer relative ${
                  activeTab === link.id 
                    ? "text-blue-850" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute bottom-[-14px] left-0 right-0 h-0.5 bg-blue-850 rounded-full" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Left Brand Area (Logo) - Matches Reference perfectly */}
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <h1 className="font-extrabold text-base md:text-lg tracking-tight text-slate-800 font-sans leading-none">BETONIKA</h1>
              <span className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest block mt-0.5 font-mono">Concrete Factory</span>
            </div>
            {/* Elegant SVG Logo representation matching the floral cement icon */}
            <div className="bg-gradient-to-tr from-blue-700 to-blue-850 p-2.5 rounded-2xl shadow-lg shadow-blue-500/10">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.4L12 11.3 6.5 7.9 12 4.5zm-6.5 5.2l5.5 3.4v6.1l-5.5-3.4v-6.1zm13 6.1l-5.5 3.4v-6.1l5.5-3.4v6.1z"/>
              </svg>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Menu expanded container */}
      <AnimatePresence>
        {hamburgerOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-150 px-6 py-4 space-y-2 z-40 relative text-right"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setHamburgerOpen(false);
                }}
                className={`w-full text-right py-2.5 px-4 rounded-xl text-sm font-bold transition block ${
                  activeTab === link.id 
                    ? "bg-blue-50 text-blue-850" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK HELP PANEL TRAY */}
      <AnimatePresence>
        {helpTrayOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Ovelay */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setHelpTrayOpen(false)} />
            
            {/* Drawer content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-sm bg-slate-900 text-white h-full shadow-2xl p-6 flex flex-col justify-between text-right"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <button onClick={() => setHelpTrayOpen(false)} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-slate-300">
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="font-extrabold text-sm md:text-base flex items-center gap-1.5 text-blue-400">
                    راهنمای سریع صنایع بتونیکا
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/60 border border-slate-800 rounded-2xl">
                    <h4 className="font-bold text-xs text-slate-200">📞 پشتیبانی مستقیم فروشگاه</h4>
                    <p className="text-sm mt-1 text-slate-300 leading-relaxed font-mono">021-88880000</p>
                    <p className="text-[10px] text-slate-500 mt-1">مشاوره دپو و بارگذاری حمل آماده ۲۴ ساعته متوالی</p>
                  </div>

                  <div className="p-4 bg-slate-800/60 border border-slate-800 rounded-2xl">
                    <h4 className="font-bold text-xs text-slate-200">📍 کارخانه مرکزی و بتن‌ریزی</h4>
                    <p className="text-xs mt-1 text-slate-400 leading-relaxed">کیلومتر ۱۲ بزرگراه مخصوص تهران کرج، دپارتمان بارگیری محصولات بتن</p>
                  </div>

                  <div className="p-4 bg-slate-800/60 border border-slate-800 rounded-2xl">
                    <h4 className="font-bold text-xs text-slate-200">🏗️ رده‌های استاندارد معتبر</h4>
                    <ul className="text-[11px] text-slate-400 mt-1.5 space-y-1">
                      <li>• بتن آماده ممتاز استاندارد با عیار ۳۵۰ و ۴۰۰</li>
                      <li>• تیرچه‌های پیش‌کشیده وایر کششی فولادی</li>
                      <li>• بلوک‌های فوق سبک فوم بتن</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab("services");
                    setHelpTrayOpen(false);
                    setTimeout(() => {
                      document.getElementById("ai-consultant-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  گفتگو با مشاور هوش هوشمند عمران
                </button>
                <p className="text-[10px] text-slate-500 text-center">سامانه جامع بتونیکا منطبق بر استانداردهای نظام مهندسی</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT GATEWAY */}
      <main className="flex-1 w-full flex flex-col">

        {/* VIEW 1: HOME (Landing exactly matching the Provided image) */}
        {activeTab === "home" && (
          <div className="flex flex-col w-full">

            {/* HERO SECTION - Precise 16:9 look with background factory */}
            <div className="relative w-full bg-slate-950 border-b border-slate-150 py-10 md:py-20 lg:pt-16 lg:pb-32">
              
              {/* Background Wrapper to handle grid/orbs clipping without clipping absolute cards */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Decorative Tech Grid in the Background */}
                <div 
                  className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0 will-change-transform" 
                  style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                />
                
                {/* Ambient Glowing Orbs */}
                <div 
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none will-change-transform" 
                  style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none will-change-transform" 
                  style={{ transform: `translateY(${scrollY * 0.28}px)` }}
                />

                {/* Backing generated background */}
                <div 
                  className="absolute inset-0 z-0 will-change-transform"
                  style={{ transform: `translateY(${scrollY * 0.32}px)` }}
                >
                  <img 
                    src={IMAGES.heroBanner} 
                    alt="Betonika Factory Background" 
                    className="w-full h-full object-cover opacity-35 filter blur-[1px] mix-blend-luminosity transition-transform duration-700 ease-out"
                    style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-900/40" />
                </div>
              </div>

              {/* Dynamic Hero Grid */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Right Column: Premium Text, Brand-praise, & Interactive Switches */}
                <div className="lg:col-span-7 text-right flex flex-col justify-center space-y-6">
                  
                  {/* Digital Badge Notification */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="self-start flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 px-3 py-1.5 rounded-full text-blue-300 text-xs font-bold shadow-inner"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    <span>نسل جدید بتن‌ریزی با هوش مصنوعی و آزمایشگاه کالیبره</span>
                  </motion.div>

                  {/* Creative Interactive Word Rotating Heading */}
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight">
                      تولید و عرضه مستقیم 
                      <span className="relative inline-block text-blue-400 mr-2 md:mr-3">
                        بتن آماده استاندارد
                        <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-blue-500/30 rounded-full -rotate-1" />
                      </span>
                    </h2>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-300 leading-normal">
                      سیستم متمرکز محاسبات و تأییدیه عیار مهندسی
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal max-w-xl">
                    اولین کارخانه تمام اتوماتیک بتن ممتاز کشور مجهز به فیلر شویی اختصاصی، تراک میکسرهای بارکد دار و ردیابی ناوگان با دیسپچ زنده در سراسر کشور.
                  </p>

                  {/* Fast metrics tag pills in Hero */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg pt-2">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-inner">
                      <span className="text-[10px] text-slate-400 block mb-1">تراکم نمونه روزانه</span>
                      <span className="text-xs md:text-sm font-black text-white font-mono">100% آزمایشگاه</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-inner">
                      <span className="text-[10px] text-slate-400 block mb-1">ظرفیت خط بچینگ</span>
                      <span className="text-xs md:text-sm font-black text-white font-mono">۲۴۰ m³/Hour</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center backdrop-blur-inner">
                      <span className="text-[10px] text-slate-400 block mb-1">تسلیم در پروژه</span>
                      <span className="text-xs md:text-sm font-black text-emerald-400 font-mono">تک‌مرحله مداوم</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2 justify-start">
                    <button
                      onClick={() => {
                        setActiveTab("services");
                        setTimeout(() => {
                          document.getElementById("quotation-tracker-segment")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-3.5 rounded-2xl transition cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-[1.02] transform duration-150"
                    >
                      استعلام پیش‌فاکتور
                    </button>
                  </div>
                </div>
              </div>

              {/* FIVE CARDS OVERLAP LAYOUT - Minimalist, Modern, Industrial Redesign */}
              <div className="absolute bottom-[-94px] left-0 right-0 z-20 px-4 md:px-8 hidden xl:block">
                <div className="max-w-7xl mx-auto grid grid-cols-5 gap-3.5">
                  {[
                    { id: "ready-mix", title: "بتن آماده", sub: "دوزینگ دیجیتال", img: IMAGES.readyMix, specs: "C20 الی C50" },
                    { id: "prestressed-joist", title: "تیرچه پیش‌تنیده", sub: "سازگار تا ۱۲م دهنه", img: IMAGES.prestressedJoist, specs: "وایرهای کششی فولادی" },
                    { id: "foam-block", title: "بلوک فوم بتن", sub: "عایق مضاعف حائل", img: IMAGES.foamBlock, specs: "دانسیته فوق سبک گونیا" },
                    { id: "concrete-curb", title: "جدول بتنی", sub: "تراکم ویبره‌پرسی کالیبره", img: IMAGES.concreteCurb, specs: "جذب آب فوق‌العاده پایین" },
                    { id: "hollow-core", title: "سایر محصولات و دال", sub: "پانل‌های بارکد دار", img: IMAGES.hollowCore, specs: "مشاهده همه کاتالوگ" }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item.id);
                        setActiveTab("products");
                        setTimeout(() => {
                          document.getElementById("products-grid-view")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      whileHover={{ y: -6 }}
                      className="bg-[#fafafa]/95 backdrop-blur-md rounded-none p-4 shadow-sm border border-[#e4e4e7] flex flex-col items-center justify-between cursor-pointer text-center h-[175px] hover:bg-white hover:border-black transition duration-150 relative group overflow-hidden"
                    >
                      {/* Active industrial line indicator */}
                      <span className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500 opacity-0 group-hover:opacity-100 transition duration-150" />
                      
                      <div className="w-[70px] h-[75px] flex items-center justify-center overflow-hidden mb-1">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition duration-200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-xs text-[#18181b] text-center leading-none tracking-tight group-hover:text-blue-900 transition">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 block text-center leading-none mt-1">{item.sub}</p>
                        <span className="text-[9px] text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-none font-bold inline-block mt-1 font-mono">
                          {item.specs}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Product Cards Layout list - Minimalist Industrial */}
            <div className="bg-[#fafafa] p-4 border-b border-[#e4e4e7] xl:hidden">
              <span className="text-[10px] font-mono font-extrabold text-[#1c1c1f] block mb-3 text-right uppercase tracking-widest">[ READY_PRODUCTS / ردیف محصولات ]</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "ready-mix", title: "بتن آماده", img: IMAGES.readyMix },
                  { id: "prestressed-joist", title: "تیرچه پیش‌تنیده", img: IMAGES.prestressedJoist },
                  { id: "foam-block", title: "بلوک فوم بتن", img: IMAGES.foamBlock },
                  { id: "concrete-curb", title: "جدول بتنی", img: IMAGES.concreteCurb },
                  { id: "hollow-core", title: "سایر محصولات دال", img: IMAGES.hollowCore }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedProduct(item.id);
                      setActiveTab("products");
                    }}
                    className="bg-white p-3 border border-[#e4e4e7] rounded-none flex items-center gap-3 cursor-pointer text-right transition"
                  >
                    <img src={item.img} alt={item.title} className="w-8 h-8 object-contain grayscale" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile-only spacer to buffer layout flow */}
            <div className="xl:hidden h-6"></div>

            {/* STATS BAR (Footer of Hero section) - High Contrast Minimalist-Industrial Dark Terminal style */}
            <div className="bg-[#121214] pt-5 xl:pt-28 pb-5 px-4 md:px-8 text-white w-full relative z-10 border-t border-slate-800">
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-right items-center">
                {teamStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-4 ${idx < 4 ? "border-l border-slate-800 pl-4" : ""} last:border-0`}
                  >
                    {idx === 4 ? (
                      <div className="flex items-center gap-3 bg-[#18181b] border border-[#27272a] p-3 rounded-none w-full">
                        <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        <div className="text-right">
                          <h4 className="font-extrabold text-xs text-amber-500 leading-none">استاندارد ملی ایران</h4>
                          <span className="text-[10px] text-slate-400 block mt-1 leading-none font-mono">APPROVED_STANDARDS_M60</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="text-xl md:text-2xl font-black text-white leading-none block font-mono">{stat.value}</span>
                        <h4 className="font-bold text-xs text-[#a1a1aa] mt-1.5 leading-none">{stat.label}</h4>
                        <span className="text-[9px] font-mono text-slate-500 block mt-1 leading-none uppercase">{stat.labelSubtitle}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: AI ENGINEER WORKSPACE CONSULTANT */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4 space-y-4 text-right lg:sticky lg:top-24">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#18181b]" />
                  <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-widest">[ ENGINE_CONSULTATION // مشاور هوشمند ]</span>
                </div>
                <h3 className="text-xl md:text-3xl font-black text-[#18181b] leading-tight">
                  محاسبات دقیق آیین‌نامه ۲۸۰۰ را به هوش عمران بسپارید
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-semibold">
                  سیستم کالیبره و تطبیقی بتونیکا با تسلط جامع به رده‌های مقاومت و زمان کیورینگ، آماده تخمین دقیق احجام دال، فونداسیون و دیوارهای بتنی در لحظه است.
                </p>
                
                <div className="pt-2 space-y-2 border-t border-[#f4f4f5] mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Check className="text-amber-500 w-4 h-4 shrink-0" />
                    برآورد مواد پایه دال سقف و تیرچه پیش‌کشیده
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Check className="text-amber-500 w-4 h-4 shrink-0" />
                    ارزیابی کلاس‌های مقاومتی تحت مقررات ملی ساختمان
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <AiConsultant />
              </div>
            </motion.section>

            {/* SECTION: BATCHING WORKFLOW STEPS */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12"
            >
              <BatchingWorkflow />
            </motion.section>

            {/* SEPARATIVE DIVIDER */}
            <div className="bg-[#fafafa] py-12 md:py-16 border-y border-[#e4e4e7]">
              <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4">
                <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase tracking-wider">PROJECT_SUPPORT_STANDARDS / تضمین کیفیت مهندسی</span>
                <h3 className="text-xl md:text-3xl font-black text-[#18181b]">چرا صنایع بتنی بتونیکا اولویت مهندسین مشاور است؟</h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  برخورداری از ناوگان ترابری بومی گسترده، خطوط تولید کالیبره شده با دوزینگ تمام‌هیدرولیک و کادر آزمایشگاهی پای‌کار مجهز به مهرهای تایید رسمی.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-right">
                  <div className="p-5 bg-white border border-[#e4e4e7] rounded-none flex gap-3.5 items-start">
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-none text-[#1c1c1f] shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#18181b] uppercase font-mono tracking-tight">سند ممهور آزمایشگاهی</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">تراک میکسرهای ارسالی مجهز به دیسپچ زنده و اسناد کنترل کیفی برای هر قالب نمونه بتن‌ریزی است.</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-[#e4e4e7] rounded-none flex gap-3.5 items-start">
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-none text-[#1c1c1f] shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#18181b] uppercase font-mono tracking-tight">ترابری ۲۴ساعته کالیبره</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">برنامه‌ریزی ترابری بتن حجیم فونداسیون به صورت مداوم و پیوسته و بدون کوچک‌ترین وقفه ترافیکی.</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white border border-[#e4e4e7] rounded-none flex gap-3.5 items-start">
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-none text-[#1c1c1f] shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#18181b] uppercase font-mono tracking-tight">شفافیت قیمت کارخانه‌ای</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">محاسبه مستقیم و بی‌واسطه خط تولید تا ساختگاه بدون کمیسیون دلالان و مصالح‌فروشان میانی کارگاه.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: COMPRESSIVE STRENGTH LAB SIMULATOR */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12"
            >
              <ConcreteLabSimulator />
            </motion.section>

            {/* SECTION: ESTIMATION CALCULATOR */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16"
            >
              <div className="text-center space-y-2 mb-10 text-right md:text-center border-r-2 md:border-r-0 md:border-b border-[#18181b] md:pb-6 pr-4 md:pr-0">
                <span className="text-[10px] font-mono text-slate-500 font-extrabold block uppercase tracking-widest">[ AUTOMATED_CALCULATION_HUB ]</span>
                <h3 className="text-xl md:text-3xl font-black text-[#18181b]">محاسبه هوشمند مصالح سقف، فونداسیون و بلوک</h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">ابعاد پروژه را با لغزنده‌ها هماهنگ کنید تا مقادیر سیمان به صورت دقیق استخراج و فاکتور شود.</p>
              </div>
              
              <MaterialCalculator onPrepopulateQuote={handlePrepopulateQuote} />
            </motion.section>

            {/* SECTION: TECHNICAL FAQ HUB */}
            <motion.section 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12"
            >
              <TechnicalFAQHub />
            </motion.section>

          </div>
        )}

        {/* VIEW 2: PRODUCTS ("محصولات") */}
        {activeTab === "products" && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10" id="products-grid-view">
            <div className="text-center space-y-3 mb-10 text-right">
              <span className="bg-blue-100 text-blue-850 px-3.5 py-1 text-[11px] font-extrabold rounded-full inline-block">خط تولید اختصاصی بتونیکا</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">محصولات دارای نشان استاندارد مهندسی و کیفی</h2>
              <p className="text-xs md:text-sm text-slate-500">برای آشنایی با جزییات، فرمول اجرایی و ویژگی‌های هر کالا، کارت محصولات را انتخاب کنید.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product selector sidebar */}
              <div className="lg:col-span-4 space-y-2">
                {productsList.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`w-full text-right p-4 rounded-2xl border transition duration-200 flex items-center justify-between cursor-pointer ${
                      selectedProduct === prod.id
                        ? "bg-blue-850 border-blue-800 text-white shadow-lg shadow-blue-900/10"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.title} className="w-10 h-10 object-contain rounded-lg p-0.5" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-extrabold text-sm text-right leading-none">{prod.title}</h4>
                        <span className={`text-[10px] mt-1 block font-mono ${selectedProduct === prod.id ? "text-blue-200" : "text-slate-400"}`}>
                          {prod.engName}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition ${selectedProduct === prod.id ? "rotate-90" : ""}`} />
                  </button>
                ))}
              </div>

              {/* Product detail showcase panel */}
              {(() => {
                const prod = productsList.find(p => p.id === selectedProduct) || productsList[0];
                return (
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden text-right">
                    
                    {/* Header Image block */}
                    <div className="relative h-[240px] md:h-[280px] bg-slate-900 flex items-center justify-center p-8">
                      <div className="absolute inset-0">
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          className="w-full h-full object-cover opacity-15 filter blur-[2px]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40" />
                      </div>
                      
                      <div className="relative z-10 text-center flex flex-col items-center">
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          className="max-h-[140px] md:max-h-[170px] filter drop-shadow-2xl object-contain mb-3"
                          referrerPolicy="no-referrer"
                        />
                        <h3 className="text-xl md:text-2xl font-black text-white">{prod.title}</h3>
                        <p className="text-[11px] text-blue-250 font-mono tracking-wider mt-1">{prod.engName}</p>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      
                      {/* Description and rate */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-150 pb-6">
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-bold text-slate-800 text-sm">آشنایی اجمالی با محصول بتونیکا:</h4>
                          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">{prod.description}</p>
                        </div>

                        <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl md:min-w-[170px] text-center">
                          <span className="text-[10px] text-slate-400 block mb-1">قیمت پایه کارخانه هر {prod.unit}</span>
                          <span className="text-base font-extrabold text-slate-800">{prod.pricePerUnit.toLocaleString("fa-IR")} </span>
                          <span className="text-xs text-slate-500 font-bold">تومان</span>
                          <span className="text-[10px] text-slate-400 block mt-1">تضمین بالاترین کیفیت صنعتی</span>
                        </div>
                      </div>

                      {/* features list */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-slate-800 text-xs text-right border-r-3 border-blue-500 pr-2">مزایای فنی و ویژگی‌های تولیدی</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {prod.features.map((feature, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start bg-slate-50/50 p-3 rounded-xl border border-slate-150/40">
                              <CheckCircle className="text-emerald-500 w-4 h-4 shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-600 leading-relaxed font-bold">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* technical specifications table */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-slate-800 text-xs text-right border-r-3 border-blue-500 pr-2">شناسنامه فنی و آنالیز فیلر مواد</h4>
                        <div className="border border-slate-150 rounded-2xl overflow-hidden">
                          <table className="w-full text-xs">
                            <tbody>
                              {Object.entries(prod.specifications).map(([key, val], idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                                  <td className="px-4 py-3 font-bold text-slate-500 border-l border-slate-150/80 w-[40%]">{key}</td>
                                  <td className="px-4 py-3 font-semibold text-slate-700">{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 flex flex-col md:flex-row gap-3">
                        <button
                          onClick={() => {
                            setActiveTab("services");
                            setTimeout(() => {
                              document.getElementById("material-calculator-section")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 text-xs md:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calculator className="w-4 h-4" />
                          شروع برآورد متراژ مورد نیاز این محصول
                        </button>
                        <button
                          onClick={() => handlePrepopulateQuote(prod.title, 0, 1, `سفارش فاکتور مستقیم از صفحه اختصاصی محصول ${prod.title}`)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-xs md:text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          دریافت فاکتور و مشاوره فروش
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })()}

            </div>
          </section>
        )}

        {/* VIEW 3: SERVICES AND CALCULATION MODULE ("خدمات") */}
        {activeTab === "services" && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-right space-y-12">
            
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-blue-600/30 text-blue-300 border border-blue-600 px-3 py-1 rounded-full text-xs font-bold inline-block">بخش مهندسی محاسبات</span>
                <h2 className="text-xl md:text-2xl font-black">ابزارهای پیشرفته تخمین بتن آماده، تیرچه دال و بلوک</h2>
                <p className="text-xs text-slate-400 font-medium">به راحتی با جابجایی دستگیره فرمول‌های زیر، تعداد متراژ و هزینه نهایی خود را دریافت ومحاسبه فرمایید.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                <span className="text-[11px] text-emerald-400 font-bold font-mono">CALCULATOR SYSTEM INLINE</span>
              </div>
            </div>

            <MaterialCalculator onPrepopulateQuote={handlePrepopulateQuote} />

            <QuotationPortal prepopulatedData={prepopulatedOrder} onClearPrepopulate={() => setPrepopulatedOrder(null)} />

          </section>
        )}

        {/* VIEW 4: PROJECTS SHOWCASE ("پروژه‌ها") */}
        {activeTab === "projects" && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-right space-y-8">
            <div className="text-center space-y-2 mb-8">
              <span className="bg-blue-105 text-blue-800 bg-blue-100 px-3.5 py-1 text-xs font-extrabold rounded-full inline-block">گالری سازه‌های برتر کشور</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">پروژه‌های معتمدی که با مصالح ما استوار شده‌اند</h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">تضمین پایداری و ثبات فونداسیون در بزرگ‌ترین سازه‌های بیمارستانی، راه‌ها و برج‌های مرتفع مسکونی سراسر ایران</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsList.map((project) => (
                <div key={project.id} className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col md:flex-row text-right">
                  
                  {/* Photo spacer */}
                  <div className="md:w-[40%] bg-slate-100 min-h-[180px] relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-[11px] font-bold rounded-lg border shadow-sm ${
                        project.status === "completed" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}>
                        {project.status === "completed" ? "به اتمام رسیده" : "در حال بتن‌ریزی"}
                      </span>
                    </div>
                  </div>

                  {/* Texts details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block">{project.category}</span>
                      <h3 className="font-extrabold text-sm md:text-base text-slate-800">{project.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{project.description}</p>
                    </div>

                    <div className="border-t border-slate-100/80 pt-3 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-slate-500">
                        <span>📍 موقعیت جغرافیایی:</span>
                        <span className="font-bold text-slate-700">{project.location}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-500">
                        <span>📦 تناژ و تحویل نهایی:</span>
                        <span className="font-bold text-blue-700">{project.volumeDelivered}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW 5: ABOUT US ("درباره ما") */}
        {activeTab === "about" && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-right space-y-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4">
              <div className="space-y-5">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold inline-block">صنایع بزرگ بتونیکا</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">تاریخچه مستمر و درخشان صنایع بتنی پایدار کشور</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  مجموعه کارخانجات بتونیکا با داشتن بیش از ۱۵ سال سابقه مداوم در کانون صنعت بتن، گام اول خود را با تامین بتن پروژه‌های مسکن مهر و تجاری کلان آغاز کرد. همگام با فناوری پیشرفته جهانی، توانستیم خط تولید تمام اتوماتیک راه‌اندازی کنیم که تیرچه‌های پیش‌تنیده و بلوک‌های عایق فوم بتنی گونیا را با حداکثر سرعت عرضه می‌کند.
                </p>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  ما همواره به عنوان عضوی کوچک به پیوند سازه‌های ماندگار و بادوام می‌اندیشیم. از پیاده‌روسازی با دال‌های فانتزی تا بلندترین برج‌های مسکونی پایتخت، نشان استاندارد بتونیکا تضمینی بر آرامش و پایداری سازه‌هاست.
                </p>
              </div>

              {/* Decorative showcase stack */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white text-right space-y-4">
                <h3 className="font-extrabold text-sm md:text-base text-blue-400">ماموریت‌ها و سرفصل ارزیابی‌های فنی بتونیکا</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800 border-l-4 border-emerald-500 rounded-r-xl">
                    <h4 className="font-bold text-xs text-slate-100">آزمایشگاه سنجش کیفی پیشرفته</h4>
                    <p className="text-[11px] text-slate-400 mt-1">کلیه متریال ماسه‌شویی، سیمان، فیلر فوم و میلگرد کششی به طور روزانه در آزمایشگاه کنترل کیفی بررسی فنی می‌شوند.</p>
                  </div>
                  <div className="p-3 bg-slate-800 border-l-4 border-blue-500 rounded-r-xl">
                    <h4 className="font-bold text-xs text-slate-100">بهینه‌سازی حداکثری آهن‌آلات</h4>
                    <p className="text-[11px] text-slate-400 mt-1">طراحی محاسباتی تیرچه‌های پیش‌تنیده بتونیکا به گونه‌ای است که وزن کل آرماتور مصرفی سقف را تا حدود ۵۰ درصد کاهش می‌دهد.</p>
                  </div>
                  <div className="p-3 bg-slate-800 border-l-4 border-amber-500 rounded-r-xl">
                    <h4 className="font-bold text-xs text-slate-100">سازگاری تام با قوانین محیط زیستی</h4>
                    <p className="text-[11px] text-slate-400 mt-1">استفاده از پساب فیلتر شده دیگ‌های تراکم ماسه و سوخت پاک گازسوز جهت حفظ منابع باارزش کشور عزیزمان.</p>
                  </div>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* VIEW 6: CONTACT US ("تماس با ما") */}
        {activeTab === "contact" && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-right space-y-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form details block */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800 border-r-3 border-blue-600 pr-2 block">ارسال مستقیم انتقادات و پیشنهادات به دفتر مدیریت</h3>
                  <p className="text-xs text-slate-500 mt-1">برای ثبت هرگونه پیگیری، انتقاد یا ارتباط با مدیریت کل، فرم زیر را فرستاده و کد تأیید برایتان پیامک خواهد شد.</p>
                </div>

                {contactSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold">پیام شما با موفقیت ثبت شد</h4>
                      <p className="text-slate-600 mt-1">همکاران بازرگانی در سریع‌ترین زمان ممکن پاسخگوی شما خواهند بود.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContact} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">نام متقاضی تماس *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="مثال: مهندس راد"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5">شماره تماس مستقیم شما *</label>
                        <input
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="مثال: 0912..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 text-right"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">متن پیام یا نظر شما *</label>
                      <textarea
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        rows={4}
                        placeholder="متن پیام خود را به دقت بنویسید..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 text-right"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-md transition"
                    >
                      {contactLoading ? "در حال ثبت..." : "ارسال پیام به دبیرخانه"}
                    </button>
                  </form>
                )}
              </div>

              {/* Informative details card */}
              <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 md:p-8 text-white space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="font-extrabold text-sm md:text-base text-blue-400">آدرس و راه‌های ارتباطی کارخانجات</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start text-right">
                      <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-200">دفتر مرکزی تهران:</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">تهران، میدان جهاد (فاطمی)، ساختمان اداری پارس، طبقه ۳ واحد ۶</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start text-right">
                      <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-200">تلفن‌های واحد فنی و ترافیک فروش:</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">021-88880000 (۱۰ خط مستقیم شبانه‌روزی)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-4 border border-slate-800 rounded-2xl text-slate-400 text-[10px] leading-relaxed">
                  * به منظور تسریع در تامین مصالح، توصیه می‌شود در صورت اضطرار، فرم سفارش را مستقیماً از بخش «خدمات و برآورد فنی» پر کنید تا در دیسپچ فوراً قرار گیرد.
                </div>
              </div>

            </div>

          </section>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-slate-950 text-white py-12 px-4 md:px-8 text-right border-t border-slate-850">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h4 className="font-black text-sm md:text-base text-blue-400">BETONIKA</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-semibold">
              صنایع بزرگ بتن آماده ممتاز، تیرچه‌های صنعتی پیش‌کشیده و بلوک سبک فوم بتن با عیار بالا و منطبق بر آیین‌نامه نظام مهندسی کشور.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-xs md:text-sm text-slate-200">بخش‌های سایت</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-semibold">
              <li><button onClick={() => setActiveTab("home")} className="hover:text-white cursor-pointer transition">صفحه اصلی</button></li>
              <li><button onClick={() => setActiveTab("products")} className="hover:text-white cursor-pointer transition">لاین محصولات</button></li>
              <li><button onClick={() => setActiveTab("services")} className="hover:text-white cursor-pointer transition">سامانه محاسباتی</button></li>
              <li><button onClick={() => setActiveTab("projects")} className="hover:text-white cursor-pointer transition">پروژه‌های شاخص</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-xs md:text-sm text-slate-200">تواصل و مقررات</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-semibold">
              <li><button onClick={() => setActiveTab("about")} className="hover:text-white cursor-pointer transition">درباره ما</button></li>
              <li><button onClick={() => setActiveTab("contact")} className="hover:text-white cursor-pointer transition">ارسال دیدگاه</button></li>
              <li>تعهد استانداردها</li>
              <li>حریم خصوصی مهندسین</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-xs md:text-sm text-slate-200">تماس ممتد</h4>
            <p className="text-xs text-slate-400 leading-relaxed">با دریافت دایمی و شبانه‌روزی نمونه، بتونیکا همواره تضمینی در سازه‌های شما ایجاد می‌کند.</p>
            <div className="pt-2">
              <span className="text-xs text-blue-300 font-mono font-bold block">021-88880000</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} صنایع بتن سازی بتونیکا. تمامی حقوق برای دپارتمان بازرگانی محفوظ است.</p>
          <p className="font-mono text-[10px]">Made with precision for Iranian Civil Engineers</p>
        </div>
      </footer>

    </div>
  );
}
