/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, User, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "سلام! من **دستیار فنی و مشاور مهندسی عمران بتونیکا** هستم. 🏗️\n\nامروز در چه موردی چالش کارگاهی یا خط محاسباتی دارید؟ چالش‌های نظارتی خود را بپرسید:\n- محاسبه دال بتن‌ریزی فونداسیون به تفکیک ضایعات\n- مقایسه عیار ۳۵۰ و ۴۰۰ برای دهنه‌های ترافیکی سنگین\n- مشخصات فنی تیرچه‌های پیش‌ تنیده تحت وایر کششی\n- خواص فیزیکی دپوی بلوک فوم بتن عایق صوتی و حرارتی\n\nسؤال خود را با من مطرح کنید تا منطبق بر آیین‌نامه ۲۸۰۰ کشور ایران پاسخ شما را تدوین کنم.",
      timestamp: new Date().toLocaleTimeString("fa-IR"),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const presetQuestions = [
    "محاسبه بتن مورد نیاز فونداسیون",
    "تفاوت پر مقاومت ترین بتون فونداسیون",
    "مزایای تیرچه پیش‌تنیده در دهانه‌ها",
    "کاهش بار مرده سقف با فوم بتن"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("fa-IR"),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("خطایی در دریافت داه‌ها از پایگاه هوش مصنوعی پدید آمد.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const modelMsg: ChatMessage = {
        id: "model-" + Date.now(),
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString("fa-IR"),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "پایانه ارتباط هوشمند کالیبره قطع گردیده؛ لطفاً فرآیند ارسال مجدد را ارزیابی فرمایید.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "پایانه مشاوره فنی ریست شد. من آماده بررسی محاسبات، عیار ساختاری آیین‌نامه و دتایل‌های اجرایی پروژه‌های بتنی کشور هستم.",
        timestamp: new Date().toLocaleTimeString("fa-IR"),
      },
    ]);
    setErrorStatus(null);
  };

  const formatMarkdown = (text: string) => {
    return text.split("\n").map((line, lIdx) => {
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      let parts = cleanLine.split(/\*\*(.*?)\*\*/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-extrabold text-[#f59e0b]">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lIdx} className="mr-5 list-disc text-xs leading-relaxed py-1 text-slate-200">
            {renderedLine}
          </li>
        );
      }

      return (
        <p key={lIdx} className="text-xs md:text-sm leading-relaxed min-h-[1.1rem] mb-1.5 text-slate-200">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="w-full flex flex-col bg-[#fafafa] border border-[#e4e4e7] rounded-none h-[650px] text-right font-sans overflow-hidden" id="ai-consultant-section">
      
      {/* Heavy Industrial Terminal Header */}
      <div className="bg-[#18181b] border-b border-black px-5 py-4 flex items-center justify-between text-white select-none">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 p-2 border border-amber-500/20 rounded-none flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-right">
            <h3 className="font-black text-xs md:text-sm text-white tracking-tight">مشاور هوش مصنوعی دپارتمان فنی بتونیکا</h3>
            <span className="text-[9px] font-mono text-slate-450 block text-slate-400 mt-0.5">
              [ ENGINE_INTELLIGENCE // GEMINI_AI_STANDARDS_ACTIVE ]
            </span>
          </div>
        </div>
        
        <button 
          onClick={clearChat}
          className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-xs font-bold font-mono transition duration-150 rounded-none border border-[#3f3f46] text-blue-400 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 shrink-0" />
          <span>RESET / گفتگوی جدید</span>
        </button>
      </div>

      {/* Suggestion tags as micro-chips */}
      <div className="bg-white border-b border-[#e4e4e7] p-3 flex flex-col items-start gap-1.5">
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          پرسش ممیزی پیشنهادی برای شروع مشاوره:
        </span>
        <div className="flex flex-wrap gap-1.5 w-full">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-[10px] md:text-xs bg-[#fafafa] border border-[#e4e4e7] hover:border-[#18181b] text-slate-700 hover:text-black px-3 py-1.5 rounded-none transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-right block font-semibold"
            >
              / {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat logs list view */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white">
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex w-full ${isUser ? "justify-start" : "justify-end"}`}
              >
                {/* Structural Memo blocks instead of bubble balloons */}
                <div 
                  className={`max-w-[85%] md:max-w-[75%] rounded-none p-4 shadow-3xs flex gap-3.5 border text-right items-start ${
                    isUser 
                      ? "bg-[#fafafa] border-[#18181b] text-black" 
                      : "bg-[#18181b] text-white border-slate-800"
                  }`}
                >
                  {/* Persona Avatar icons */}
                  <div className={`w-7 h-7 rounded-none flex items-center justify-center shrink-0 mt-0.5 border ${
                    isUser ? "bg-[#18181b] border-black text-white" : "bg-white border-[#e4e4e7] text-black"
                  }`}>
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                  </div>

                  {/* Text panel details */}
                  <div className="flex-1 text-right overflow-hidden">
                    <span className={`text-[8.5px] font-mono block mb-2 uppercase ${isUser ? "text-slate-500" : "text-[#a1a1aa]"}`}>
                      {isUser ? `REQUISITION_AGENT // TIME_${m.timestamp}` : `CONSULTANT_REPORT // REG_CODE_${m.timestamp}`}
                    </span>
                    <div className={isUser ? "text-xs md:text-sm font-bold text-slate-800 leading-relaxed" : "space-y-1.5 text-white"}>
                      {isUser ? (
                        <p>{m.text}</p>
                      ) : (
                        <div className="text-xs md:text-sm leading-relaxed text-[#f4f4f5] font-medium prose-invert">
                          {formatMarkdown(m.text)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <div className="flex w-full justify-end">
            <div className="bg-[#18181b] border border-slate-850 p-4 rounded-none flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#a1a1aa] uppercase animate-pulse">
                GEN_REPORT // هوش مصنوعی در حال کالیبره و نوشتن ارزیابی فنی...
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-none animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-none animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-none animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="bg-red-50/80 border border-red-200 p-4 flex items-center gap-3 text-red-800 text-xs text-right rounded-none">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="flex-1 font-bold">{errorStatus}</p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-4 bg-white border-t border-[#e4e4e7] flex gap-2"
      >
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-[#18181b] disabled:bg-slate-100 text-white disabled:text-slate-400 border border-black px-4 py-3 rounded-none flex items-center justify-center gap-1.5 hover:bg-black transition duration-150 cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5 rotate-180 text-blue-400" />
          <span className="font-extrabold text-xs">ارسال فنی</span>
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          placeholder="سؤال محاسباتی خود را وارد فرمایید (مثال: عیار بتن دیوار برشی اسکلت بنویسید)"
          className="flex-1 bg-[#fafafa] border border-[#e4e4e7] focus:border-[#18181b] focus:bg-white rounded-none px-4 py-3 text-slate-800 text-xs md:text-sm focus:outline-none transition duration-150 text-right"
          dir="rtl"
        />
      </form>
    </div>
  );
}
