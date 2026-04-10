# 🚗 AutoDiag AI

> تشخيص أعطال السيارات بالذكاء الاصطناعي — مبني بـ Next.js + OpenAI

## ✨ المميزات

- 🤖 تشخيص فعلي بـ GPT-4o mini
- 💰 تكلفة الإصلاح بالريال السعودي
- 🚦 تقييم سلامة القيادة
- 📱 واجهة احترافية تدعم العربية
- ⚡ API جاهز للتوسعة

## 🚀 التشغيل المحلي

```bash
# 1. تثبيت الحزم
npm install

# 2. إنشاء ملف البيئة
cp .env.local.example .env.local
# ثم ضع مفتاح OpenAI في .env.local

# 3. تشغيل المشروع
npm run dev
```

افتح: http://localhost:3000

## 🌐 النشر على Vercel

```bash
npx vercel
```
أو اربط المستودع مباشرة من [vercel.com](https://vercel.com) وأضف `OPENAI_API_KEY` في Environment Variables.

## 🔑 متغيرات البيئة

| المتغير | الوصف |
|---|---|
| `OPENAI_API_KEY` | مفتاح OpenAI من [platform.openai.com](https://platform.openai.com) |

## 📁 هيكل المشروع

```
autodiag-ai/
├── pages/
│   ├── index.js          # الواجهة الرئيسية
│   └── api/
│       └── diagnose.js   # API الذكاء الاصطناعي
├── .env.local.example    # مثال ملف البيئة
├── next.config.js
└── package.json
```

## 🛣️ خارطة الطريق

- [ ] دعم VIN (رقم هيكل السيارة)
- [ ] تسجيل مستخدمين
- [ ] حفظ تاريخ التشخيصات
- [ ] اشتراكات مدفوعة (Stripe)
- [ ] لوحة تحكم الورش
- [ ] قاعدة بيانات قطع OEM

---
صُنع في 🇸🇦 السعودية
