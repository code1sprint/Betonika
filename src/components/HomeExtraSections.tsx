/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, RotateCcw, CheckCircle, ChevronDown, Award, HardHat, Compass, Activity
} from "lucide-react";

// ==========================================
// 1. STEP-BY-STEP AUTOMATED WORKFLOW (Minimalist-Industrial Redesign)
// ==========================================
export function BatchingWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "ثبت دیجیتال و آنالیز عیار",
      description: "سفارش شما در پایانه مرکزی ثبت و فیلر ماسه، نسبت آب به سیمان (W/C) و عیار سیمان براساس دمای هوا و نوع المان به صورت تماماً خودکار سنجش و فرموله‌سازی می‌شود.",
      icon: "01",
      metrics: { title: "خطای حد تلرانس اختلاط", value: "±۰.۱۵٪", sub: "سیستم اتوماسیون زیمنس S7" }
    },
    {
      title: "میکس و دوزینگ نانو افزودنی‌ها",
      description: "دیگ‌های بچینگ با بازوهای حلزونی و ملات‌ساز مجهز، میکروسیلیس و روان‌کننده بتن را در دمای کالیبره اختلاط می‌نمایند تا انسجام کامل به دست آید.",
      icon: "02",
      metrics: { title: "دمای پایدار بچ", value: "۱۹.۵°C", sub: "مجهز به چیلر خلاء آب سرد" }
    },
    {
      title: "سنجش رطوبت و بارگیری تراک",
      description: "رطوبت فوند با سنسور مایکروویو سنجیده شده و ملات زنده مستقیماً وارد تراک میکسرهای آماده مجهز به ردیاب لحظه‌ای و دیسپچ آنلاین می‌گردد.",
      icon: "03",
      metrics: { title: "زمان سیکل بارگیری", value: "۳۹۰ ثانیه", sub: "ناوگان ملکی با دیسپچ لحظه‌ای" }
    },
    {
      title: "حمل استراتژیک و تخلیه ضربتی",
      description: "تراک‌ها در سریع‌ترین زمان و با هم زدن متوالی دور کالیبره به محل ساختگاه می‌رسند. پمپ دکل‌های هوایی Betonika بدون کوچک‌ترین توقف بتن‌ریزی یکپارچه را انجام می‌دهند.",
      icon: "04",
      metrics: { title: "ارتفاع تخلیه هیدرولیک", value: "۵۲ متر متوالی", sub: "پمپ هوایی شwing مستقل" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-none p-6 md:p-10 text-right font-sans relative overflow-hidden">
      {/* Structural layout lines reminiscent of blueprint/engineering drawings */}
      <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-[#e4e4e7] pointer-events-none hidden lg:block" />
      <div className="absolute top-24 left-0 right-0 h-[1px] bg-[#e4e4e7] pointer-events-none hidden lg:block" />

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-none shrink-0" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">PRODUCTION PIPELINE / زنجیره تامین</span>
          </div>
          <h3 className="text-xl md:text-3xl font-black text-[#18181b] tracking-tight">زنجیره خودکار بچینگ و کستینگ بتونیکا</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
            مراحل پایش مکانیزه ملات بتن آماده از دوزینگ متریال پایه در سیلوها تا تخلیه نهایی در محل قالب‌بندی پروژه شما.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2 bg-white border border-[#e4e4e7] p-1 rounded-none shadow-xs w-full lg:w-auto overflow-x-auto">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex-1 lg:flex-none px-4 py-2 text-xs font-mono font-bold rounded-none transition cursor-pointer whitespace-nowrap ${
                activeStep === idx 
                  ? "bg-[#18181b] text-white" 
                  : "text-slate-500 hover:text-[#18181b] hover:bg-slate-100"
              }`}
            >
              STAGE_0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Step Selector List Sidebar (Industrial spec-sheet style) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="space-y-2">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 border transition duration-150 cursor-pointer text-right flex items-center justify-between gap-4 rounded-none ${
                    isActive
                      ? "bg-[#18181b] border-[#18181b] text-white shadow-xs"
                      : "bg-white border-[#e4e4e7] text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-black px-2 py-0.5 border ${
                      isActive ? "border-white/30 text-blue-400" : "border-slate-200 text-slate-400 bg-slate-50"
                    }`}>
                      {s.icon}
                    </span>
                    <h4 className="font-extrabold text-xs tracking-tight">{s.title}</h4>
                  </div>
                  <span className={`font-mono text-[9px] ${isActive ? "text-slate-400" : "text-slate-400"}`}>
                    [ACTIVE_{isActive ? "YES" : "NO"}]
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-[#18181b] text-white p-4 flex items-center gap-3.5 rounded-none border border-black">
            <Compass className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-right">
              <span className="text-[9px] font-mono block text-slate-400 leading-none">AUTO_LOGS / گواهی کیفیت</span>
              <span className="text-xs font-bold block mt-1">تایید فنی اتوماسیون زیمنس آلمان</span>
            </div>
          </div>
        </div>

        {/* Selected Step Content (Blueprint detail design) */}
        <div className="lg:col-span-8 bg-white border border-[#e4e4e7] p-6 md:p-8 flex flex-col justify-between rounded-none shadow-xs relative">
          
          {/* Subtle Blueprint grid or line inside card */}
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-[#f4f4f5] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-none animate-pulse" />
                <span className="text-[10px] font-mono text-[#18181b] font-black">SPECIFICATIONS SHEET / مستندات مرحله</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">[REF_STD_ASTM_ISIRI]</span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase tracking-wider">
                گام شماره {activeStep + 1} از ۴ فرآیند
              </span>
              <h3 className="text-lg md:text-xl font-black text-[#18181b]">{steps[activeStep].title}</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
                {steps[activeStep].description}
              </p>
            </div>
          </div>

          <div className="relative z-10 border-t border-[#f4f4f5] pt-6 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#fafafa] border border-[#e4e4e7] p-4 rounded-none">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">{steps[activeStep].metrics.title}:</span>
              <span className="text-sm font-mono font-black text-[#18181b] tracking-tight block mt-1">
                {steps[activeStep].metrics.value}
              </span>
            </div>
            <div className="bg-[#fafafa] border border-[#e4e4e7] p-4 rounded-none">
              <span className="text-[9px] font-mono text-slate-500 block uppercase">تضمین ساختاری دپو:</span>
              <span className="text-xs font-bold text-slate-700 block mt-1.5">
                {steps[activeStep].metrics.sub}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}


// ==========================================
// 2. INTERACTIVE COMPRESSIVE STRENGTH SIMULATOR (Industrial Lab Redesign)
// ==========================================
export function ConcreteLabSimulator() {
  const [grade, setGrade] = useState("C30");
  const [days, setDays] = useState(28);
  const [simState, setSimState] = useState<"idle" | "running" | "crushed">("idle");
  const [gaugeForce, setGaugeForce] = useState(0);

  const cubeArea = 22500; // in mm2

  const getTargetStrength = (gName: string) => {
    switch (gName) {
      case "C25": return 25;
      case "C30": return 30;
      case "C35": return 35;
      case "C40": return 40;
      default: return 30;
    }
  };

  const getCureFactor = (d: number) => {
    if (d <= 1) return 0.15;
    if (d <= 3) return 0.40;
    if (d <= 7) return 0.65;
    if (d <= 14) return 0.85;
    return 0.15 + (0.85 * (Math.log(d) / Math.log(28)));
  };

  const currentStrengthTarget = parseFloat((getTargetStrength(grade) * getCureFactor(days)).toFixed(1));
  const maxForceKn = parseFloat(((currentStrengthTarget * cubeArea) / 1000).toFixed(1));

  const handleStartSim = () => {
    setSimState("running");
    setGaugeForce(0);

    const duration = 2200; // ms
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progression = Math.min(currentStep / steps, 1);
      const vibration = progression < 0.95 ? (Math.random() - 0.5) * 6 : 0;
      setGaugeForce(parseFloat((progression * maxForceKn + vibration).toFixed(1)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setGaugeForce(maxForceKn);
        setSimState("crushed");
      }
    }, intervalTime);
  };

  const handleReset = () => {
    setSimState("idle");
    setGaugeForce(0);
  };

  return (
    <div className="bg-[#121214] text-white border border-[#27272a] rounded-none p-6 md:p-10 shadow-lg text-right font-sans relative overflow-hidden">
      
      {/* Industrial safety stripes accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#121214_10px,#121214_20px)]" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#27272a] pb-6 mb-8 mt-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-none animate-pulse" />
            <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest">STRENGTH TESTING BAY / ایستگاه آزمون مقاومت فشاری</span>
          </div>
          <h3 className="text-xl md:text-3xl font-black text-white mt-1.5">
            جک آزمایش هیدرواستاتیک مقاومت فشاری نمونه بتن
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            محاسبه رفتار شکست الاستوپلاستیک بتن آماده بر اساس استانداردهای مخرب نمونه‌های مکعبی ۱۵۰ میلی‌متری.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#1c1c1f] border border-[#27272a] px-3.5 py-2 font-mono text-[10px] text-slate-300">
          <Activity className="w-4 h-4 text-amber-500 shrink-0" />
          <span>ASTM C39 / ISIRI 3206</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Grid Inputs (Stark Wireframe) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#18181b] p-6 border border-[#27272a] rounded-none">
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-r-2 border-amber-500 pr-2">LAB_PARAMETERS / پارامترها</h4>
            
            {/* Grade Selection */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-bold block">انتخاب رده مقاومت نمونه اسمی بتن:</label>
              <div className="grid grid-cols-4 gap-2">
                {["C25", "C30", "C35", "C40"].map((g) => (
                  <button
                    key={g}
                    disabled={simState === "running"}
                    onClick={() => setGrade(g)}
                    className={`py-2 px-1 text-xs font-mono font-black border rounded-none cursor-pointer transition ${
                      grade === g 
                        ? "bg-amber-500 border-amber-500 text-[#121214]" 
                        : "bg-[#1f1f23] border-[#3f3f46] text-slate-400 hover:bg-[#27272a] hover:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Cure Days Slider */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-amber-500 font-extrabold">{days} روز</span>
                <span className="text-slate-400 font-bold">دوره نگهداری در حوضچه کیورینگ:</span>
              </div>
              <input 
                type="range"
                min="1"
                max="28"
                value={days}
                disabled={simState === "running"}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-[#27272a] appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>۲۸ روز (ماکزیمم حد رشد)</span>
                <span>۷ روز (فرآیند شتابان)</span>
                <span>۱ روز (شروع دوره)</span>
              </div>
            </div>

            {/* Spec readout table */}
            <div className="bg-[#121214] border border-[#27272a] p-3 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>مساحت مقطع تحت فشار (A):</span>
                <span className="text-white font-bold">225 cm² (150x150 mm)</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>رشد گیرش تخمینی در {days} روز:</span>
                <span className="text-amber-500 font-bold">{(getCureFactor(days) * 100).toFixed(0)}٪ عیار مگاپاسکال</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#27272a]">
            {simState === "crushed" ? (
              <button
                onClick={handleReset}
                className="w-full bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold py-3 text-xs flex items-center justify-center gap-2 cursor-pointer transition rounded-none border border-[#3f3f46]"
              >
                <RotateCcw className="w-4 h-4 text-amber-500" />
                بارگذاری قالب نمونه مجدد
              </button>
            ) : (
              <button
                onClick={handleStartSim}
                disabled={simState === "running"}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 text-xs flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-slate-950 shrink-0" />
                فعال‌سازی جک و هیدرولیک فشار سهمگین
              </button>
            )}
          </div>
        </div>

        {/* Hydraulic Press Cage & Real-time Indicators */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Mechanical compression chamber */}
          <div className="md:col-span-6 bg-black border border-[#27272a] p-5 flex flex-col justify-between items-center relative overflow-hidden h-[300px] rounded-none">
            {/* Mechanical alignment crosshairs */}
            <div className="absolute inset-0 bg-[#121214]/50 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-red-950/20 pointer-events-none" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-red-950/20 pointer-events-none" />

            <div className="w-full text-center pb-2 z-10 border-b border-[#1c1c1f]">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">[ COMPRESSION_CELL_V04 ]</span>
            </div>

            {/* Concrete block mechanical visual representation */}
            <div className="relative z-10 h-36 w-full flex items-center justify-center">
              
              {/* Top heavy steel ram */}
              <motion.div 
                animate={{
                  y: simState === "running" ? 16 : simState === "crushed" ? 21 : 0,
                }}
                transition={{ duration: simState === "running" ? 2.2 : 0.25, ease: "linear" }}
                className="absolute top-4 w-[110px] h-[20px] bg-gradient-to-b from-[#27272a] to-[#3f3f46] border-b-2 border-amber-500 rounded-none shadow-md flex items-center justify-center"
              >
                <div className="w-8 h-1 bg-[#121214]" />
              </motion.div>

              {/* Stark iron structural columns */}
              <div className="absolute left-10 top-0 bottom-0 w-3 bg-[#1c1c1f] border-r border-[#27272a]" />
              <div className="absolute right-10 top-0 bottom-0 w-3 bg-[#1c1c1f] border-l border-[#27272a]" />
              <div className="absolute bottom-2 left-6 right-6 h-3 bg-[#27272a]" />

              {/* Cube specimen under force */}
              <motion.div 
                className={`w-[70px] h-[70px] bg-[#22252a] border border-[#4b5563] relative flex items-center justify-center shadow-lg transition ${
                  simState === "running" ? "animate-pulse" : ""
                }`}
              >
                {/* Visual cracks */}
                {simState === "crushed" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#0f1115]/80 z-10 flex items-center justify-center p-1"
                  >
                    <svg className="absolute inset-0 w-full h-full text-red-600 opacity-80" viewBox="0 0 100 100">
                      <path d="M 50 0 L 52 45 L 35 55 L 60 70 L 45 100 M 52 45 L 85 55 M 35 55 L 10 60 L 25 80" stroke="currentColor" fill="none" strokeWidth="3" />
                    </svg>
                    <span className="text-[9px] font-mono font-black tracking-tighter bg-red-600 px-1 py-0.5 rounded-none text-white z-20">DEFORMED_STRUCT</span>
                  </motion.div>
                )}

                <div className="relative z-10 text-center font-mono">
                  <span className="text-xs font-black block text-slate-300">{grade}</span>
                  <span className="text-[8px] text-slate-500 block leading-none mt-1">{days}D_SAMPLE</span>
                </div>
              </motion.div>
            </div>

            <div className="w-full text-center z-10">
              <span className={`text-[10px] font-mono tracking-wider font-bold px-3 py-1 ${
                simState === "running" ? "text-amber-500 animate-pulse bg-amber-500/10 border border-amber-500/20" : 
                simState === "crushed" ? "text-red-500 bg-red-500/10 border border-red-500/20" : "text-slate-400 bg-[#1c1c1f] border border-[#27272a]"
              }`}>
                {simState === "running" ? "LOADING HYDRAULIC PRESSURE..." : 
                 simState === "crushed" ? "COLLAPSE - ULTIMATE VALUE MET" : "SYSTEM CHILLY AND ARMED"}
              </span>
            </div>
          </div>

          {/* Electronic readouts panel */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-3">
            
            {/* Compressive Force output */}
            <div className="bg-black border border-[#27272a] p-4 space-y-1.5 rounded-none">
              <span className="text-[9px] font-mono text-slate-400 block">نیروی گسیختگی نهایی جک (P):</span>
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-2xl font-black text-white">{gaugeForce.toLocaleString("fa-IR")}</span>
                <span className="text-xs text-slate-500 font-bold">kN (کیلونیوتون)</span>
              </div>
              <div className="h-1 bg-[#1c1c1f] rounded-none overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-100 ${simState === "crushed" ? "bg-red-500" : "bg-amber-500"}`} 
                  style={{ width: `${maxForceKn > 0 ? (gaugeForce / maxForceKn) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* MPa Compressive Stress */}
            <div className="bg-black border border-[#27272a] p-4 space-y-1.5 rounded-none">
              <span className="text-[9px] font-mono text-slate-400 block">تنش فشاری نهایی نمونه (F_c):</span>
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-2xl font-black text-emerald-400">
                  {simState === "idle" ? "۰" : simState === "running" ? parseFloat(((gaugeForce * 1000) / cubeArea).toFixed(1)).toLocaleString("fa-IR") : currentStrengthTarget.toLocaleString("fa-IR")}
                </span>
                <span className="text-xs text-slate-500 font-bold">MPa (مگاپاسکال)</span>
              </div>
            </div>

            {/* Certification / Report */}
            <AnimatePresence>
              {simState === "crushed" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#14291f] border border-[#1e462d] text-emerald-400 space-y-2 rounded-none text-right"
                >
                  <div className="flex items-center gap-1.5 border-b border-[#1e462d] pb-1.5">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-mono font-black tracking-widest">BETONIKA_CERTIFIED_OK</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-300">
                    نمونه با تحمل نیروی نهایی <span className="font-mono text-white font-bold">{maxForceKn} kN</span> و تنش فشاری <span className="font-mono text-emerald-400 font-bold">{currentStrengthTarget} MPa</span> آزمون استاندارد را با تایید مهندسین آزمایشگاهی پاس نمود.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}


// ==========================================
// 3. TECHNICAL EXPANDABLE FAQ HUB (Minimalist Industrial Redesign)
// ==========================================
export function TechnicalFAQHub() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqList = [
    {
      q: "تفاوت اساسی بتن با عیار ۳۵۰ و عیار ۴۰۰ در پروژه‌ها چیست؟",
      a: "عیار بتن به معنای مقدار کیلوگرم سیمان مصرف شده در هر متر مکعب مخلوط بتنی است. بتن عیار ۳۵۰ عمدتاً برای سقف تیرچه بلوک و دال‌های معمولی به کار می‌رود و حداقل مقاومت فشاری معادل ۲۵ الی ۳۰ مگاپاسکال به دست می‌دهد. برای دیوار برشی، فونداسیون‌های تحت بار بالا یا ستون‌ها جهت پایداری در برابر بارهای پیچشی، از بتن عیار ۴۰۰ به جهت دستیابی به چگالی و استحکام بالاتر استفاده می‌شود.",
      icon: "🏗️"
    },
    {
      q: "چرا اسلامپ بتن ریزی سقف باید از اسلامپ ستون متمایز باشد؟",
      a: "اسلامپ شاخص کارایی و جریان بتن آماده است. برای مقاطع با تراکم بالای آرماتور نظیر ستون و دیوارهای برشی، جهت پیشگیری از لانه زنبوری شدن (کرمو شدن) نیاز به بتنی با روان‌کنندگی بالا (کلاس اسلامپ S4 یا اسلامپ ۱۲) است، در حالی که در دال‌ها و ریختن فونداسیون‌های تخت، اسلامپ ۸ الی ۱۰ جهت حفظ شیب و جلوگیری از اب‌انداختگی ملات کاملا کفایت می‌کند.",
      icon: "⚖️"
    },
    {
      q: "مزیت کلیدی تیرچه‌های پیش‌کشیده (Prestressed) بتونیکا نسبت به معمولی چیست؟",
      a: "تیرچه پیش‌تنیده در خط تولید کارخانه‌ای بتونیکا تحت کشش وایرهای فولادی مخصوص با مقاومت بسیار بالا (F_pu= 1800 MPa) تولید می‌شود. این فناوری باعث اعمال پیش‌فشار منفی به بتن گردیده و ظرفیت خمش وسط دهانه را به شدت ارتقا می‌دهد، منجر به حذف میلگردهای ممان منفی خسته شونده، سبک سازی عالی سازه و کاهش ۵۰ درصدی مصرف آهن‌آلات کل سقف می‌گردد.",
      icon: "📐"
    },
    {
      q: "بتن آماده ارسالی تا چند ساعت بعد بارگیری فرصت تخلیه دارد؟",
      a: "زمان استاندارد تخلیه بتن از لحظه بارگیری در بچینگ تا کستینگ نهایی در دمای حداکثر ۲۵ درجه معادل ۹۰ دقیقه (یک ساعت و نیم) است. گذشت بیش از این زمان به ویژه بدون مواد دیرگیرکننده (Retarder)، موجب اتمام زمان واکنش هیدراتاسیون اولیه و افت جدی مقاومت فشاری نهایی می‌گردد. تخلیه‌های بتونیکا تماماً مجهز به سیستم کارت ترابری کالیبره به ساختگاه هستند.",
      icon: "📅"
    }
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-white border border-[#e4e4e7] rounded-none p-6 md:p-10 text-right space-y-8 font-sans relative overflow-hidden">
      
      <div className="space-y-2 border-r-2 border-[#18181b] pr-4">
        <div className="flex items-center gap-1.5">
          <HardHat className="w-4 h-4 text-[#18181b] shrink-0" />
          <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">CIVIL FAQ PANEL / پرسش‌وپاسخ نظارتی</span>
        </div>
        <h3 className="text-xl md:text-3xl font-black text-slate-950">دانشنامه فنی و سوالات متداول صنایع بتن</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
          راهنمای نظارتی مهندسین پایه‌یک سازمان نظام مهندسی کشور در خصوص نمونه‌برداری، فرآیند تخلیه و کیورینگ مخلوط تر.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 relative z-10">
        {faqList.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className={`border transition duration-150 rounded-none overflow-hidden ${
                isOpen 
                  ? "border-[#18181b] bg-[#fafafa]" 
                  : "border-[#e4e4e7] bg-white hover:border-slate-350"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-right p-4 md:p-5 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex gap-3.5 items-center">
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700">
                    Q_0{idx + 1}
                  </span>
                  <span className="text-xs md:text-sm font-extrabold text-[#18181b] tracking-tight leading-snug">{item.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-slate-800" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1.5 text-xs md:text-sm text-slate-600 leading-relaxed font-semibold border-t border-[#e4e4e7] bg-white">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
