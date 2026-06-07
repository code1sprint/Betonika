/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calculator, Truck, Layers, HelpCircle, ArrowLeft, Shield, Sparkles, Sliders } from "lucide-react";

interface HeroInteractiveCockpitProps {
  onApplyQuote: (productType: string, calculatedVolume: number, quantity: number, notes: string) => void;
}

export default function HeroInteractiveCockpit({ onApplyQuote }: HeroInteractiveCockpitProps) {
  // Setup options for structures
  const structureTypes = [
    { id: "slab", name: "سقف و دال بتنی", defaultThick: 25, title: "بتن آماده عیار ۳۵۰" },
    { id: "foundation", name: "فونداسیون سازه", defaultThick: 60, title: "بتن آماده عیار ۴۰۰" },
    { id: "column", name: "ستون و دیوار برشی", defaultThick: 40, title: "بتن سفت ممتاز فونداسیون" },
  ];

  const [activeForm, setActiveForm] = useState("slab");
  const [area, setArea] = useState(180); // in sqm
  const [thickness, setThickness] = useState(25); // in cm
  const [grade, setGrade] = useState("C30"); // concrete class

  // Automatically adjust default thickness when active structure change
  useEffect(() => {
    const selected = structureTypes.find(s => s.id === activeForm);
    if (selected) {
      setThickness(selected.defaultThick);
    }
  }, [activeForm]);

  // Compute metrics
  const volume = parseFloat(((area * (thickness / 100)) * 1.05).toFixed(1)); // with 5% waste safety factor
  const cementGrade = grade === "C25" ? "۳۰۰" : grade === "C30" ? "۳۵۰" : grade === "C35" ? "۴۰۰" : "۴۵۰";
  const trucksCount = Math.ceil(volume / 12);
  const costEstimateMin = Math.round(volume * 1380000);
  const slumpValue = activeForm === "column" ? "8" : activeForm === "slab" ? "12" : "10";

  const handleApply = () => {
    const struct = structureTypes.find(s => s.id === activeForm);
    const structName = struct ? struct.name : "دال بتن";
    const noteText = `شبیه‌سازی فوری از هیرو: سازه ${structName} با متراژ ${area} متر مربع و ضخامت ${thickness} سانتیمتر (رده مقاومت بتن ${grade})`;
    onApplyQuote(struct?.title || "بتن آماده عیار ۳۵۰", volume, 1, noteText);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-6 text-white shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Cockpit Lights */}
      <span className="absolute top-3 left-3 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
            <Calculator className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-right">کنترل‌پنل هوشمند بتن‌ریزی</h4>
            <p className="text-[10px] text-slate-400 text-right">شبیه‌سازی بی‌درنگ قبل از سفارش نهایی</p>
          </div>
        </div>
        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md font-mono text-slate-300">v1.1 Live</span>
      </div>

      {/* Structure Selector Buttons */}
      <div className="space-y-2.5">
        <label className="block text-[11px] font-bold text-slate-350 text-right">نوع المان یا مقطع سازه:</label>
        <div className="grid grid-cols-3 gap-2">
          {structureTypes.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveForm(item.id)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition cursor-pointer leading-tight ${
                activeForm === item.id 
                  ? "bg-blue-600 border border-blue-500 text-white shadow-md shadow-blue-500/10" 
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Range Sliders */}
      <div className="space-y-4 pt-4">
        
        {/* Plan Area Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-blue-300 font-extrabold">{area} <span className="text-[10px] text-slate-400">متر مربع</span></span>
            <span className="font-bold text-slate-300">مساحت (زیربنا) سطح:</span>
          </div>
          <input 
            type="range"
            min="20"
            max="1500"
            step="10"
            value={area}
            onChange={(e) => setArea(parseInt(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>۱۵۰۰ متر²</span>
            <span>۲ گرم زمین</span>
            <span>۲۰ متر²</span>
          </div>
        </div>

        {/* Plan Thickness Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-blue-300 font-extrabold">{thickness} <span className="text-[10px] text-slate-400">سانتیمتر</span></span>
            <span className="font-bold text-slate-300">ضخامت اسمی ریختن بتن:</span>
          </div>
          <input 
            type="range"
            min="10"
            max="120"
            step="5"
            value={thickness}
            onChange={(e) => setThickness(parseInt(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>۱۲۰ سانتیمتر</span>
            <span>دیوار ضخیم پی</span>
            <span>۱۰ سانتیمتر</span>
          </div>
        </div>

        {/* Concrete strength selectors */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <span className="block text-[11px] text-slate-400 text-right">رده مقاومت فشاری:</span>
            <div className="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {["C25", "C30", "C35", "C40"].map((item) => (
                <button
                  key={item}
                  onClick={() => setGrade(item)}
                  className={`text-[9px] py-1.5 font-bold rounded-lg cursor-pointer transition ${
                    grade === item ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <span className="block text-[11px] text-slate-400">اسلامپ و کارایی پیشنهادی:</span>
            <div className="bg-slate-800 border border-white/5 p-1.5 rounded-xl text-center">
              <span className="text-xs font-mono font-bold text-slate-200">کلاس اسلامپ S{slumpValue}</span>
            </div>
          </div>
        </div>

      </div>

      {/* COMPUTED METRICS SCREEN */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/5 grid grid-cols-3 gap-3 divide-x divide-x-reverse divide-white/5 mt-5">
        
        <div className="text-center">
          <span className="text-[10px] text-slate-400 block mb-1">حجم کل بتن (+ضایعات)</span>
          <span className="text-base sm:text-lg font-black text-blue-400 font-mono leading-none block">{volume}</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">متر مکعب (m³)</span>
        </div>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 block mb-1">تراک میکسر مورد نیاز</span>
          <div className="flex items-center justify-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-base sm:text-lg font-black text-white font-mono leading-none">{trucksCount}</span>
          </div>
          <span className="text-[9px] text-slate-500 block mt-0.5">دستگاه همزمان</span>
        </div>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 block mb-1">عیار سیمان خرد شده</span>
          <span className="text-base sm:text-lg font-black text-sky-400 font-mono leading-none block">{cementGrade}</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">کیلوگرم سیمان در متر³</span>
        </div>

      </div>

      {/* Action buttons */}
      <div className="pt-4 flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/50 hover:scale-[1.01] transform transition duration-150"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          ثبت محاسبات در استعلام پیش‌فاکتور
        </button>

        <button 
          onClick={() => {
            const el = document.getElementById("ai-consultant-section");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="bg-white/10 hover:bg-white/15 text-white p-3 rounded-xl transition cursor-pointer"
          title="تحلیل جامع سازه در چت مهندسی"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Information Banner Footer */}
      <p className="text-[9px] text-slate-500 text-center mt-3 leading-relaxed">
        *محاسبات فوق منطبق بر آیین‌نامه بتن ایران (آبا) بوده و شامل ۵٪ پرت بهینه حمل می‌باشد.
      </p>

    </motion.div>
  );
}
