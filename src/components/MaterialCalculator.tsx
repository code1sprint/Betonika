/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Calculator, ArrowLeft, Truck, Package, Layers, ChevronRight } from "lucide-react";

interface MaterialCalculatorProps {
  onPrepopulateQuote: (productType: string, calculatedVolume: number, quantity: number, notes: string) => void;
}

export default function MaterialCalculator({ onPrepopulateQuote }: MaterialCalculatorProps) {
  const [activeTab, setActiveTab] = useState<"concrete" | "joist" | "block">("concrete");

  // Concrete Inputs
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(12);
  const [depth, setDepth] = useState<number>(0.4); // 40 cm
  const [concreteClass, setConcreteClass] = useState<string>("C25-350");

  // Joist Inputs
  const [slabLength, setSlabLength] = useState<number>(8); // Width of ceiling
  const [slabWidth, setSlabWidth] = useState<number>(10); // Length of ceiling
  const [joistSpacing, setJoistSpacing] = useState<number>(0.5); // 50 cm or 70 cm

  // Wall Block Inputs
  const [wallLength, setWallLength] = useState<number>(45);
  const [wallHeight, setWallHeight] = useState<number>(3);
  const [blockThickness, setBlockThickness] = useState<number>(15); // 10, 15, 20 cm

  // Rates in Tomans
  const concreteRates: Record<string, number> = {
    "C20-300": 1650000,
    "C25-350": 1750000,
    "C30-400": 1850000,
    "C35-450": 1980000,
    "C45-500": 2150000,
  };

  const getConcretePrice = () => concreteRates[concreteClass] || 1750000;
  const joistRate = 240000; // per meter
  const foamBlockCeilingRate = 45000; // per block
  const wallBlockRate = 18000; // per block 

  // Concrete Calculations
  const calculatedConcreteVolume = parseFloat((length * width * depth * 1.05).toFixed(2)); // +5% wastage
  const concretePrice = calculatedConcreteVolume * getConcretePrice();
  const estimatedConcreteWeight = parseFloat((calculatedConcreteVolume * 2.4).toFixed(1)); // 2.4 tons per m3

  // Joist & Joist-Foam Slabs calculations
  const totalSlabArea = slabLength * slabWidth;
  const joistsCount = Math.ceil(slabWidth / joistSpacing) + 1;
  const joistTotalLength = joistsCount * slabLength;
  const totalJoistsPrice = joistTotalLength * joistRate;
  
  const ceilingBlockCount = Math.ceil(totalSlabArea * (joistSpacing === 0.5 ? 1.6 : 1.2));
  const totalCeilingBlockPrice = ceilingBlockCount * foamBlockCeilingRate;
  const totalCeilingPrice = totalJoistsPrice + totalCeilingBlockPrice;

  // Wall block Calculations
  const totalWallArea = wallLength * wallHeight;
  const wallBlocksCount = Math.ceil((totalWallArea * 1.03) / 0.12); // +3% waste
  const blockVolume = (blockThickness / 100) * 0.2 * 0.6; // in m3
  const totalWallBlockVolume = parseFloat((wallBlocksCount * blockVolume).toFixed(2));
  const totalWallPrice = wallBlocksCount * wallBlockRate;

  const handlePrepopulate = () => {
    if (activeTab === "concrete") {
      const notes = `محاسبه قالب دال با طول ${length}م، عرض ${width}م و ضخامت ${Math.round(depth*100)}cm (مشتمل بر ۵٪ موازنه ضایعات)`;
      onPrepopulateQuote("بتن آماده عیار " + concreteClass.split("-")[1], calculatedConcreteVolume, 1, notes);
    } else if (activeTab === "joist") {
      const notes = `کلید محاسباتی دال سقف تیرچه فوم به مساحت ${totalSlabArea} مترمربع. طول تیرچه: ${slabLength}م، تعداد: ${joistsCount} شاخه، تعداد بلوک: ${ceilingBlockCount} قالب`;
      onPrepopulateQuote("تیرچه پیش‌تنیده صنعتی", joistTotalLength, 1, notes);
    } else {
      const notes = `محاسبات جداکننده با بلوک فوم‌بتن به مساحت دیوار ${totalWallArea}مترمربع، ضخامت بلوک ${blockThickness}cm. تعداد قالب بلوک: ${wallBlocksCount} عدد`;
      onPrepopulateQuote("بلوک فوم بتن گونیا", totalWallBlockVolume, wallBlocksCount, notes);
    }
  };

  const tabs = [
    { id: "concrete", label: "بتن فونداسیون / اسکلت", icon: Truck },
    { id: "joist", label: "سقف تیرچه و فوم سقفی", icon: Layers },
    { id: "block", label: "بلوک سبک فوم‌بتن", icon: Package },
  ];

  return (
    <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-none overflow-hidden text-right font-sans" id="material-calculator-section">
      
      {/* Heavy industrial top bar */}
      <div className="bg-[#18181b] border-b border-black p-5 md:p-6 text-white flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="space-y-1.5 text-right">
          <div className="flex items-center justify-start gap-2">
            <Calculator className="w-5 h-5 text-blue-400 shrink-0" />
            <h3 className="font-extrabold text-sm md:text-base tracking-tight text-white">
              سامانه محاسباتی و برآورد متریال ساختمانی بتونیکا
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-450 block text-slate-400">
            [ ESTIMATOR_SYSTEM_V3.8 / محاسبات استراکچر و برآورد مستقیم خط تولید ]
          </span>
        </div>
        
        {/* Unit switch tabs (Industrial segment) */}
        <div className="flex flex-wrap bg-[#27272a] p-1 rounded-none border border-[#3f3f46] self-start xl:self-auto w-full xl:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-none transition duration-150 cursor-pointer ${
                  isSel 
                    ? "bg-[#18181b] border border-[#3f3f46] text-blue-400 shadow-sm" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Configuration inputs (Blueprint look) */}
        <div className="lg:col-span-7 space-y-6">
          
          {activeTab === "concrete" && (
            <div className="space-y-6">
              <div className="border-b border-[#e4e4e7] pb-3">
                <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase">[ DIMENSIONING_CELL_READYMIX ]</span>
                <h4 className="text-sm font-extrabold text-slate-800 mt-1">ابعاد هندسی قالب دال یا فونداسیون</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">طول قالب (L - متر)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none focus:border-[#18181b]"
                  />
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>

                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">عرض قالب (W - متر)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none focus:border-[#18181b]"
                  />
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>

                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">عمق بتن‌ریزی (D - سانتیمتر)</label>
                  <input
                    type="number"
                    value={Math.round(depth * 100)}
                    onChange={(e) => setDepth(Math.max(5, parseFloat(e.target.value) || 0) / 100)}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none focus:border-[#18181b]"
                  />
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={Math.round(depth * 100)}
                    onChange={(e) => setDepth(parseFloat(e.target.value) / 100)}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">انتخاب رده مقاومت و مشخصه مخلوط بتن آماده:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.keys(concreteRates).map((grade) => {
                    const [cName, cement_w] = grade.split("-");
                    const isSelected = concreteClass === grade;
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => setConcreteClass(grade)}
                        className={`p-3 rounded-none border text-right transition duration-150 cursor-pointer ${
                          isSelected
                            ? "border-[#18181b] bg-white text-black font-extrabold ring-1 ring-[#18181b]"
                            : "border-[#e4e4e7] bg-white text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        <p className="text-xs font-mono font-bold text-right">{cName}</p>
                        <p className="text-[10px] mt-1 text-slate-400 text-right leading-none">عیار {cement_w}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "joist" && (
            <div className="space-y-6">
              <div className="border-b border-[#e4e4e7] pb-3">
                <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase">[ CEILING_STRUCTURE_MODULE ]</span>
                <h4 className="text-sm font-extrabold text-slate-800 mt-1">ابعاد و فواصل محاسباتی سقف تیرچه یونولیت</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">دهانه سقف (طول تیرچه‌ها - متر)</label>
                  <input
                    type="number"
                    value={slabLength}
                    onChange={(e) => setSlabLength(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none"
                    max="12"
                  />
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="0.1"
                    value={slabLength}
                    onChange={(e) => setSlabLength(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                  <span className="text-[9px] text-slate-400 font-mono block mt-2">[تیرچه‌های پیش‌کشیده Betonika تا دهنه ۱۲م قابل فرستادن می‌باشند]</span>
                </div>

                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">عرض کلی سقف فضا (متر)</label>
                  <input
                    type="number"
                    value={slabWidth}
                    onChange={(e) => setSlabWidth(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={slabWidth}
                    onChange={(e) => setSlabWidth(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">فاصله محور آکس به آکس تیرچه‌ها:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setJoistSpacing(0.5)}
                    className={`p-4 rounded-none border text-right transition duration-150 cursor-pointer ${
                      joistSpacing === 0.5
                        ? "border-[#1c1c1f] bg-white ring-1 ring-[#1c1c1f]"
                        : "border-[#e4e4e7] bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <p className="font-extrabold text-xs">شفت گذاری ۵۰ سانتیمتر [ دتایل استاندارد ]</p>
                    <p className="text-[10px] text-slate-400 mt-1">مناسب برای سقف‌های مسکونی متعارف (بلوک پهنای ۵۰ یا ۴۰ سانتیمتر)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setJoistSpacing(0.7)}
                    className={`p-4 rounded-none border text-right transition duration-150 cursor-pointer ${
                      joistSpacing === 0.7
                        ? "border-[#1c1c1f] bg-white ring-1 ring-[#1c1c1f]"
                        : "border-[#e4e4e7] bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <p className="font-extrabold text-xs">شفت گذاری ۷۰ سانتیمتر [ فوق سبک‌ دال ]</p>
                    <p className="text-[10px] text-slate-400 mt-1">بهینه‌سازی حداکثر و کاهش بار مرده سقف تا ۳۰ درصد (بلوک پهنای ۷۰ سانتیمتر)</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "block" && (
            <div className="space-y-6">
              <div className="border-b border-[#e4e4e7] pb-3">
                <span className="text-[10px] font-mono text-blue-600 font-bold block uppercase">[ LIGHTWEIGHT_WALLBLOCK_SYSTEM ]</span>
                <h4 className="text-sm font-extrabold text-slate-800 mt-1">دیوارچینی ساختاری با بلوک فوم بتن درجه یک</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">مجموع کل طول دیوارها (متر)</label>
                  <input
                    type="number"
                    value={wallLength}
                    onChange={(e) => setWallLength(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="300"
                    step="5"
                    value={wallLength}
                    onChange={(e) => setWallLength(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>

                <div className="bg-white p-4 border border-[#e4e4e7] rounded-none">
                  <label className="block text-[10px] font-bold text-slate-500 mb-2">ارتفاع کلاف دیوار (متر)</label>
                  <input
                    type="number"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-3 py-2 text-sm font-mono font-bold text-center focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.1"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 accent-[#1c1c1f] appearance-none cursor-pointer mt-3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">انتخاب ضخامت بلوک استاندارد فوم بتن:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {[10, 15, 20].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBlockThickness(t)}
                      className={`p-4 rounded-none border text-right transition duration-150 cursor-pointer ${
                        blockThickness === t
                          ? "border-[#1c1c1f] bg-white ring-1 ring-[#1c1c1f]"
                          : "border-[#e4e4e7] bg-white text-slate-705 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <p className="font-mono font-black text-xs">{t} cm</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                        {t === 10 ? "دیوارهای تیغه‌بندی داخلی" : t === 15 ? "حصارهای پیرامونی نما" : "عایق مضاعف حائل صوتی ملکی"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Estimation Sidebar spec list */}
        <div className="lg:col-span-5 bg-white border border-[#e4e4e7] p-6 flex flex-col justify-between rounded-none shadow-xs">
          <div className="space-y-6">
            <div className="border-b border-[#f4f4f5] pb-3 text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">[ ESTIMATION_SUMMARY_LIVE ]</span>
              <h4 className="text-xs font-black text-slate-800 mt-1">آنالیز فنی و دوزینگ حجمی مصالح</h4>
            </div>
            
            {activeTab === "concrete" && (
              <div className="space-y-4 text-right">
                <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-4 rounded-none">
                  <span className="text-[10px] font-mono text-slate-500 block">REQUIRED_VOLUME / حجم کل بتن آماده:</span>
                  <div className="flex items-baseline justify-end gap-1.5 mt-1.5 font-mono">
                    <span className="text-3xl font-black text-[#18181b]">{calculatedConcreteVolume}</span>
                    <span className="text-xs font-bold text-slate-650 text-slate-500">m³ (مترمکعب)</span>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1">شارژ شده با احتساب ۵٪ اتلاف مجاز ناهمواری فونداسیون.</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-400 block font-mono">DEAD_LOAD_EST / وزن کل:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{estimatedConcreteWeight}</span>
                      <span className="text-[9px] text-slate-405 text-slate-400">تن وزن مرده</span>
                    </div>
                  </div>
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-405 text-slate-400 block font-mono">TRUCKLOADS_EST / پارت حمل:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{Math.ceil(calculatedConcreteVolume / 7)}</span>
                      <span className="text-[9px] text-slate-405 text-slate-400">میکسر (۷m³)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "joist" && (
              <div className="space-y-4 text-right">
                <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-4 rounded-none">
                  <span className="text-[10px] font-mono text-slate-500 block">TOTAL_JOIST_LENGTH / کل طول شاخه تیرچه:</span>
                  <div className="flex items-baseline justify-end gap-1.5 mt-1.5 font-mono">
                    <span className="text-3xl font-black text-[#18181b]">{joistTotalLength}</span>
                    <span className="text-xs font-bold text-slate-500">m (متر طول)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-400 block font-mono">JOIST_COUNT / تعداد کل:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{joistsCount}</span>
                      <span className="text-[9px] text-slate-400">شاخه {slabLength}متری</span>
                    </div>
                  </div>
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-400 block font-mono">FOAM_BLOCKS / یونولیت سقف:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{ceilingBlockCount}</span>
                      <span className="text-[9px] text-slate-400">قالب دوجداره</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "block" && (
              <div className="space-y-4 text-right">
                <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-4 rounded-none">
                  <span className="text-[10px] font-mono text-slate-500 block">BLOCKS_QTY / کل تعداد قطعات فوم‌بتن:</span>
                  <div className="flex items-baseline justify-end gap-1.5 mt-1.5 font-mono">
                    <span className="text-3xl font-black text-[#18181b]">{wallBlocksCount}</span>
                    <span className="text-xs font-bold text-slate-500">قالب گونیا</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-400 block font-mono">VOLUME / حجم بار فرستاده:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{totalWallBlockVolume}</span>
                      <span className="text-[9px] text-slate-400">m³ حجم مفید</span>
                    </div>
                  </div>
                  <div className="bg-[#fcfcfc] border border-[#e4e4e7] p-3 rounded-none">
                    <span className="text-[9px] text-slate-400 block font-mono">WALL_AREA / مساحت ناخالص:</span>
                    <div className="flex items-baseline justify-end gap-1 mt-1 font-mono">
                      <span className="text-xs font-black text-slate-800">{Math.round(totalWallArea)}</span>
                      <span className="text-[9px] text-slate-400">m² مساحت کل</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Price calculation block */}
            <div className="border-t border-[#f4f4f5] pt-5 text-right space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">PREDICTED_RAW_COST / هزینه خام درب کارخانه:</span>
              <div className="flex items-baseline justify-end gap-1 text-slate-900 font-mono">
                <span className="text-3xl font-extrabold text-[#18181b]">
                  {activeTab === "concrete" 
                    ? concretePrice.toLocaleString("fa-IR") 
                    : activeTab === "joist" 
                      ? totalCeilingPrice.toLocaleString("fa-IR") 
                      : totalWallPrice.toLocaleString("fa-IR")}
                </span>
                <span className="text-xs text-slate-600 font-bold">تومان</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-snug">
                * برآورد فوق بر مبنای نرخ مصوب امروز صنف به صورت مستقیم و بدون واسطه محاسبه گردیده است.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={handlePrepopulate}
              className="w-full bg-[#18181b] hover:bg-[#27272a] text-white font-black text-xs py-4 rounded-none transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              انتقال مقادیر به پیش‌فاکتور الکترونیک
              <ArrowLeft className="w-4 h-4" />
            </button>
            <p className="text-[9px] text-slate-400 text-center font-mono">[ FORM_DATA_LINKED_TO_QUOTATION_PORTAL ]</p>
          </div>
        </div>

      </div>
    </div>
  );
}
