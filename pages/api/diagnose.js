import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, carModel } = req.body;

  if (!text || text.trim().length < 3) {
    return res.status(400).json({ error: "يرجى وصف المشكلة بشكل أوضح" });
  }

  const carInfo = carModel ? `السيارة: ${carModel}\n` : "";

  const prompt = `
أنت خبير ميكانيكا سيارات عالمي متخصص في السوق السعودي.

${carInfo}المشكلة: "${text}"

قدّم تحليلًا احترافيًا بالتنسيق التالي:

🔍 التشخيصات المحتملة:
1- [الاسم] — [النسبة]%
   السبب الفني: [شرح مختصر]
2- [الاسم] — [النسبة]%
   السبب الفني: [شرح مختصر]
3- [الاسم] — [النسبة]%
   السبب الفني: [شرح مختصر]

💰 تكلفة الإصلاح المتوقعة (السعودية):
• قطع الغيار: [المبلغ] ريال
• أجرة العمالة: [المبلغ] ريال
• المجموع: [المبلغ] ريال

🚦 هل القيادة آمنة الآن؟
[آمنة / احذر / توقف فورًا] — [سبب قصير]

🔧 التوصية:
[ماذا يجب أن يفعل صاحب السيارة الآن]
`;

  try {
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "أنت نظام تشخيص سيارات احترافي. ردودك دقيقة، عملية، ومناسبة للسوق السعودي." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    res.status(200).json({
      result: result.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({
      error: "حدث خطأ في الاتصال بالذكاء الاصطناعي. تأكد من صحة OPENAI_API_KEY",
    });
  }
}
