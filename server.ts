/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

// In-memory simple database for quotes and inquiries
const quoteRequests: any[] = [];
const contactInquiries: any[] = [];

// Logger utility
const log = (msg: string) => console.log(`[BETONIKA SERVER] ${msg}`);

// --- API Endpoints ---

// Check server status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Submit quote request
app.post("/api/quote", (req, res) => {
  try {
    const { fullName, phoneNumber, productType, projectLocation, calculatedVolume, quantity, notes } = req.body;
    
    if (!fullName || !phoneNumber || !productType) {
       res.status(400).json({ error: "لطفاً تمامی فیلدهای اجباری را تکمیل فرمایید." });
       return;
    }

    const requestDetails = {
      id: "REQ-" + Math.floor(100000 + Math.random() * 900000),
      fullName,
      phoneNumber,
      productType,
      projectLocation: projectLocation || "نامشخص",
      calculatedVolume: calculatedVolume || 0,
      quantity: quantity || 1,
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    quoteRequests.push(requestDetails);
    log(`Quote request received from ${fullName} for ${productType}`);

    res.json({ 
      success: true, 
      message: "درخواست پیش‌فاکتور شما با موفقیت ثبت شد. کارشناسان بتونیکا به زودی با شما تماس خواهند گرفت.", 
      request: requestDetails 
    });
  } catch (err: any) {
    res.status(500).json({ error: "خطایی در پردازش اطلاعات رخ داد." });
  }
});

// Get quote requests (for client status page tracking)
app.get("/api/quotes", (req, res) => {
  res.json({ requests: quoteRequests });
});

// Submit generic contact Inquiry
app.post("/api/contact", (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message) {
      res.status(400).json({ error: "لطفاً نام، شماره تماس و پیام خود را ارسال فرمایید." });
      return;
    }

    const inquiry = {
      id: "INQ-" + Math.floor(1000 + Math.random() * 9000),
      name,
      phone,
      message,
      createdAt: new Date().toISOString()
    };

    contactInquiries.push(inquiry);
    log(`Inquiry received from ${name}`);

    res.json({ 
      success: true, 
      message: "پیام شما دریافت شد. با تشکر از تماس شما با بتونیکا." 
    });
  } catch (err) {
    res.status(500).json({ error: "خطایی رخ داد." });
  }
});

// Gemini Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      res.status(400).json({ error: "پیامی دریافت نشد." });
      return;
    }

    if (!ai) {
      res.json({ 
        text: "با سلام. سیستم هوش مصنوعی بتونیکا در حال حاضر به کلید وب‌سرویس متصل نیست، اما جهت راهنمایی شما: بتن آماده عیار ۳۵۰ و ۴۰۰ بتونیکا با گواهی استاندارد معتبر عرضه می‌شود. همچنین تیرچه‌های پیش‌تنیده ما با بالاترین کیفیت آماده ارسال به تمام نقاط کشور می‌باشد. خدمات فوم‌بتن نیز با مناسب‌ترین قیمت انجام می‌شود." 
      });
      return;
    }

    log(`AI query received: ${message.substring(0, 50)}...`);

    const systemInstruction = `
شما "دستیار مهندسی و مشاور هوشمند کارخانجات بتونیکا (BETONIKA)" هستید.
کاربران شما سازندگان، مهندسین عمران و ناظرین پروژه‌های ساختمانی در ایران هستند که سوالات فنی و اجرایی در مورد بتن آماده، تیرچه پیش تنیده، بلوک‌های فوم بتن و مسائل مربوط به سقف و فونداسیون دارند.

وظایف شما:
۱. مشاوره فنی دقیق در زمینه انواع رده‌های مقاومتی بتن (مانند C25, C30, C35, C40)، عیار بتن، اسلامپ مناسب و روان‌کننده‌ها متناسب با المان سازه‌ای (سقف، ستون، فونداسیون، پودرها).
۲. معرفی محصولات کارخانه بتونیکا شامل:
   - بتن آماده با استانداردهای روز و ماشین‌آلات پیشرفته (کامیون میکسر و پمپ دکل و پمپ زمینی).
   - تیرچه‌های پیش‌تنیده بتنی (پیشرفته‌تر از تیرچه سنتی، کاهش مصرف میلگرد، صرفه مکانی و اقتصادی، مقاومت بالا).
   - فوم بتن (بلوک عایق سبک، عایق عالی صدا و حرارت، کاهش بار مرده ساختمان) و پرکننده کفسازی.
   - جدول بتنی با کیفیت بالا (پرس خیس و پرس خشک).
۳. راهنمایی ساده و تخصصی در مورد روش‌های محاسباتی حجم بتن مورد نیاز (طول × عرض × ضخامت دال یا فونداسیون)، تعداد تیرچه‌ها (طول دهنه و فواصل)، و تراکم مطلوب.
۴. زبان پاسخگویی شما باید تماماً فارسی، مودبانه، فنی، کاربردی و روان باشد.
۵. از قالب‌بندی زیبا مانند لیست‌های نشانه‌دار و کلمات متناوب بولد در Markdown استفاده کنید تا متن به راحتی خوانده شود.

مثال‌ها و محاسبات فنی مهم برای راهنمایی کاربران:
- فرمول بتن فونداسیون: مساحت پی ضربدر ضخامت بتن‌ریزی به اضافه ۱۰٪ ضایعات و ناهمواری زمین.
- فواصل تیرچه پیش‌تنیده بتونیکا به طور استاندارد ۵۰ یا ۷۰ سانتی‌متر است.
- بتن ریزی سقف وافل یا تیرچه بلوک: حدوداً برای سقف تیرچه بلوک مرسوم، ضخامت دال رویه ۵ تا ۷ سانتی‌متر است که به ازای هر متر مربع سقف حدود ۰.۴ مترمکعب بتن کل لازم است (شامل تیرها و دال).

با لحن حرفه‌ای و کارشناسانه مهندسی عمران پاسخ دهید و در انتهای در صورت نیاز کاربر را به دپارتمان فروش بتونیکا با دکمه‌های سایت ارجاع دهید.
`;

    // Map history to standard contents structure if available
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((chat: any) => {
        contents.push({
          role: chat.role === "user" ? "user" : "model",
          parts: [{ text: chat.text }]
        });
      });
    }
    
    // Add the current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const botReply = response.text || "پاسخی از سمت هوش مصنوعی دریافت نشد.";
    res.json({ text: botReply });

  } catch (err: any) {
    console.error("Gemini API Error in server.ts:", err);
    res.status(500).json({ error: "خطایی در برقراری ارتباط با مدل هوش مصنوعی رخ داد." });
  }
});

// --- Vite Middleware Setup ---

const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    log("Production static files serving layout mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    log(`Running server on http://localhost:${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Failed to start full-stack server:", err);
});
