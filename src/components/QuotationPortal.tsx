/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { FileText, MapPin, Phone, User, Calendar, CheckCircle2, Loader2, ListTodo, ClipboardCheck } from "lucide-react";

interface QuotationPortalProps {
  prepopulatedData: {
    productType: string;
    calculatedVolume: number;
    quantity: number;
    notes: string;
  } | null;
  onClearPrepopulate: () => void;
}

export default function QuotationPortal({ prepopulatedData, onClearPrepopulate }: QuotationPortalProps) {
  // Form States
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [productType, setProductType] = useState("بتن آماده عیار ۳۵۰");
  const [calculatedVolume, setCalculatedVolume] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRequests, setSubmittedRequests] = useState<any[]>([]);

  // Apply prepopulated calculation data if available
  useEffect(() => {
    if (prepopulatedData) {
      setProductType(prepopulatedData.productType);
      setCalculatedVolume(prepopulatedData.calculatedVolume);
      setNotes(prepopulatedData.notes);
      
      // Auto scroll to quotation form
      const el = document.getElementById("quotation-tracker-segment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [prepopulatedData]);

  // Load existing requests from localStorage for client state persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem("betonika_quotes");
      if (stored) {
        setSubmittedRequests(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !projectLocation) {
      setErrorMessage("درج فیلدهای ضروری ستاره‌دار (*) برای صدور مشخصات الزامی است.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          projectLocation,
          productType,
          calculatedVolume,
          notes,
          companyName
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "خطایی در فرستادن اطلاعات پدید آمد.");
      }

      const data = await response.json();

      if (data.success) {
        setSuccessResponse(data.request);
        
        const updated = [data.request, ...submittedRequests];
        setSubmittedRequests(updated);
        localStorage.setItem("betonika_quotes", JSON.stringify(updated));

        // Reset inputs
        setCalculatedVolume(0);
        setNotes("");
        onClearPrepopulate();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "خطا در اتصال به واحد فناوری کارخانه.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="font-mono text-[9px] font-black px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500">
            PENDING_LAB_REVIEW / بررسی آزمایشگاهی
          </span>
        );
      case "approved":
        return (
          <span className="font-mono text-[9px] font-black px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            DISPATCH_READY / تایید و آماده ارسال
          </span>
        );
      default:
        return (
          <span className="font-mono text-[9px] font-black px-2 py-0.5 bg-slate-55 bg-slate-800 border border-slate-700 text-slate-400">
            COMPLETED_DELIVERY / تخلیه شده
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right" id="quotation-tracker-segment">
      
      {/* Form Area - Blueprint-Datasheet Look */}
      <div className="lg:col-span-7 bg-white border border-[#e4e4e7] p-6 md:p-8 rounded-none shadow-xs">
        
        <div className="border-b border-[#f4f4f5] pb-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-[#18181b]" />
            <span className="text-[10px] font-mono text-[#18181b] font-black uppercase">[ REQUISITION_FORM_V3.1 ]</span>
          </div>
          <h3 className="font-black text-lg md:text-xl text-[#18181b] tracking-tight">پیش‌فاکتور رسمی و ثبت درخواست دیسپچ بار</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
            اطلاعات کارفرمایی و ساختمانی پروژه را وارد کرده تا سهمیه تخلیه و پیش‌نویس قیمت کالا صادر گردد.
          </p>
        </div>

        {successResponse ? (
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-6 rounded-none space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-[#14532d]">سفارش شما در پایانه مرکزی ثبت گردید!</h4>
                <p className="text-xs text-[#166534] font-mono mt-1 font-bold">DISPATCH_REF_ID: {successResponse.id}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              کارشناسان دپارتمان بازرگانی بتونیکا تا حداکثر ۱۵ دقیقه آینده جهت تایید لوکیشن کارگاه و زمان دقیق اعزام میکسر ترافیکی با تلفن همراه شما هماهنگ خواهند شد.
            </p>
            <div className="border-t border-emerald-200/60 pt-4 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono">TIMESTAMP: {new Date(successResponse.createdAt).toLocaleTimeString("fa-IR")}</span>
              <button
                onClick={() => setSuccessResponse(null)}
                className="text-blue-600 font-extrabold cursor-pointer border border-blue-600 px-3 py-1 bg-white hover:bg-slate-50 transition"
              >
                کلس درخواست جدید
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-[11px] font-bold">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">نام و نام خانوادگی متقاضی *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: مهندس امینی"
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#18181b] focus:bg-white text-right"
                  />
                  <User className="w-3.5 h-3.5 text-slate-350 absolute left-3 top-3.5" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">تلفن همراه ارتباطی مستقل *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="مثال: 09123456789"
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-mono font-bold focus:outline-none focus:border-[#18181b] focus:bg-white text-right"
                    dir="ltr"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-350 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5">نام شرکت / پیمانکار (اختیاری)</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="مثال: ستاد پایداری سازه"
                  className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#18181b] focus:bg-white text-right"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5">بازه زمانی ترجیحی تحویل مصالح</label>
                <div className="relative">
                  <input
                    type="text"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    placeholder="مثال: شنبه هفته آینده صبح"
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#18181b] focus:bg-white text-right"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-350 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5">لاین دپارتمانی تولید مورد نیاز</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#18181b] focus:bg-white text-right cursor-pointer"
                >
                  <option value="بتن آماده عیار ۳۰۰">بتن آماده استاندارد رده C20 (عیار ۳۰۰)</option>
                  <option value="بتن آماده عیار ۳۵۰">بتن آماده ممتاز رده C25 (عیار ۳۵۰)</option>
                  <option value="بتن آماده عیار ۴۰۰">بتن آماده فوق مقاوم رده C30 (عیار ۴۰۰)</option>
                  <option value="تیرچه پیش‌تنیده و یونولیت">تیرچه پیش‌تنیده بتنی (متراژ سفارشی)</option>
                  <option value="بلوک فوم بتن درجه یک">بلوک سبک فوم بتن (دیوارچینی)</option>
                  <option value="جدول بتنی ویبره‌پرسی">جدول بتنی فانتزی و شهری</option>
                  <option value="دال پیش‌ساخته هالوکور">پانل‌های سقف صنعتی هالوکور</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1.5">ساختگاه و آدرس کارگاه بتن‌ریزی *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="مثال: اتوبان همت غرب، خروجی المپیک"
                    className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#18181b] focus:bg-white pr-9 text-right"
                  />
                  <MapPin className="w-4 h-4 text-slate-350 absolute right-3 top-3.5" />
                </div>
              </div>
            </div>

            {calculatedVolume > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-none p-3 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-mono text-[9px] uppercase">[ VOL_SYS_INPUT ] بار متراژ انتقال یافته:</span>
                <span className="font-extrabold text-blue-750 text-blue-700 font-mono">{calculatedVolume} m³</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5">نیازمندی ارسالی، پمپ بازو ملکی یا افزودنی‌ها</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="توضیحاتی از قبیل پمپ هوایی ۵۲متری، استفاده از ضدیخ به علت دمای هوا، روان‌سازهای پلی‌کربوکسیلات یا نمونه‌برداری آزمایشگاهی در محل"
                className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-none px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#18181b] focus:bg-white text-right leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#18181b] hover:bg-black text-white font-black text-xs py-4 rounded-none transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  در حال استعلام ارتباطی با پایانه مرکزی کارخانه...
                </>
              ) : (
                <>
                  <ClipboardCheck className="w-4 h-4 shrink-0 text-blue-400" />
                  بررسی فنی و صدور الکترونیکی برگ پیش‌فاکتور
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Live tracking Dashboard - Extreme Industrial look */}
      <div className="lg:col-span-12 xl:col-span-5 bg-[#121214] text-white border border-[#27272a] p-6 md:p-8 rounded-none flex flex-col justify-between">
        
        <div className="space-y-6">
          <div className="border-b border-[#27272a] pb-3 text-right">
            <span className="text-[10px] font-mono text-amber-500 font-extrabold block uppercase tracking-widest">[ COCKPIT_DISPATCH_MONITOR ]</span>
            <h3 className="font-extrabold text-white text-base md:text-lg mt-1 tracking-tight">کنترل پایانی و رهگیری بار ترافیکی</h3>
            <p className="text-xs text-slate-400 mt-1">سفارشاتی که صادر کرده‌اید در دیسپچ دپارتمان ترافیک و نمونه‌برداری نمایشگر می‌گردند.</p>
          </div>

          <div className="space-y-3">
            {submittedRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500 border border-dashed border-[#27272a] bg-[#18181b] rounded-none">
                <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">NO_PENDING_BILLS_IN_STG</p>
                <p className="text-[10px] text-slate-500 mt-1">پیش‌فاکتوری در مرورگر شما یافت نشد. با ارسال فرم طرف راست، مانیتور فعال می‌گردد.</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[380px] pointer-events-auto pr-1">
                {submittedRequests.map((req, idx) => (
                  <div key={req.id || idx} className="bg-[#18181b] border border-[#27272a] p-4 space-y-3 rounded-none text-right">
                    <div className="flex items-center justify-between border-b border-[#27272a] pb-2 text-[10px] font-mono">
                      <span className="text-blue-400 font-black">ID: {req.id}</span>
                      <span className="text-slate-400 font-bold">DATE: {new Date(req.createdAt).toLocaleDateString("fa-IR")}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-white">{req.productType}</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed flex items-center justify-start gap-1">
                        <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                        ساختگاه: {req.projectLocation}
                      </p>
                    </div>

                    <div className="border-t border-[#27272a] pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 text-[10px]">کارفرما: {req.fullName}</span>
                      {getStatusBadge(req.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/90 p-4 border border-[#27272a] text-slate-400 text-[10px] leading-relaxed mt-6">
          <p>
            * کلیه میکسرهای اعزام شده تحت استانداردهای صوتی، دپارتمان حمل ناجا و گواهی سنجش وزن تماما بارکد دار و ممهور به مهر آزمایشگاهی در محل صادر می‌شوند.
          </p>
        </div>

      </div>

    </div>
  );
}
