// Mock policy content + pure query helpers. Stand-in for the future .NET
// content API.

import type { Policy, PolicyKey } from "@/lib/types/policy";

export const POLICIES: Record<PolicyKey, Policy> = {
  shipping: {
    title: { en: "Shipping Policy", ar: "سياسة الشحن" },
    intro: { en: "We deliver across Egypt with care and speed.", ar: "نوصّل في جميع أنحاء مصر بعناية وسرعة." },
    sections: [
      { h: { en: "Delivery Time", ar: "وقت التوصيل" }, b: { en: "Orders are processed within 1-2 business days. Delivery takes 2-4 business days within Cairo & Giza, and 3-6 business days for other governorates.", ar: "تُجهّز الطلبات خلال 1-2 يوم عمل. يستغرق التوصيل 2-4 أيام عمل داخل القاهرة والجيزة، و3-6 أيام عمل لباقي المحافظات." } },
      { h: { en: "Shipping Fees", ar: "رسوم الشحن" }, b: { en: "A flat EGP 40 shipping fee applies. Enjoy FREE shipping on all orders over EGP 500.", ar: "تُطبّق رسوم شحن ثابتة قدرها 40 ج.م. استمتعي بشحن مجاني لجميع الطلبات التي تزيد عن 500 ج.م." } },
      { h: { en: "Order Tracking", ar: "تتبّع الطلب" }, b: { en: "Once shipped, you will receive an SMS with your tracking details to follow your order to your door.", ar: "بمجرد الشحن، ستصلك رسالة نصية بتفاصيل التتبّع لمتابعة طلبك حتى باب منزلك." } },
    ],
  },
  returns: {
    title: { en: "Returns & Refunds", ar: "الإرجاع والاسترداد" },
    intro: { en: "Your satisfaction is our priority.", ar: "رضاكِ هو أولويتنا." },
    sections: [
      { h: { en: "Return Window", ar: "فترة الإرجاع" }, b: { en: "Unopened products may be returned within 14 days of delivery for a full refund or exchange.", ar: "يمكن إرجاع المنتجات غير المفتوحة خلال 14 يومًا من التوصيل لاسترداد كامل أو استبدال." } },
      { h: { en: "How to Return", ar: "كيفية الإرجاع" }, b: { en: "Contact us via WhatsApp or email with your order number and reason. We will arrange a pickup.", ar: "تواصلي معنا عبر واتساب أو البريد الإلكتروني مع رقم طلبك والسبب. سنرتّب عملية الاستلام." } },
      { h: { en: "Refunds", ar: "الاسترداد" }, b: { en: "Approved refunds are processed within 5-7 business days to your original payment method.", ar: "تُعالَج المبالغ المستردّة المعتمدة خلال 5-7 أيام عمل إلى وسيلة الدفع الأصلية." } },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    intro: { en: "We respect and protect your personal data.", ar: "نحترم بياناتك الشخصية ونحميها." },
    sections: [
      { h: { en: "Information We Collect", ar: "المعلومات التي نجمعها" }, b: { en: "We collect your name, contact details and order information solely to fulfil your orders and improve your experience.", ar: "نجمع اسمك وبيانات التواصل ومعلومات الطلب فقط لتنفيذ طلباتك وتحسين تجربتك." } },
      { h: { en: "How We Use It", ar: "كيف نستخدمها" }, b: { en: "Your data is used for order processing, delivery and, with your consent, marketing communications. We never sell your data.", ar: "تُستخدم بياناتك لمعالجة الطلبات والتوصيل، وبموافقتك، للرسائل التسويقية. لا نبيع بياناتك أبدًا." } },
      { h: { en: "Your Rights", ar: "حقوقك" }, b: { en: "You may request access to, correction of, or deletion of your personal data at any time by contacting us.", ar: "يمكنك طلب الاطّلاع على بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت بالتواصل معنا." } },
    ],
  },
  terms: {
    title: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
    intro: { en: "The terms governing your use of Dermiva.", ar: "الشروط التي تحكم استخدامك لـ Dermiva." },
    sections: [
      { h: { en: "Use of Site", ar: "استخدام الموقع" }, b: { en: "By using this website you agree to provide accurate information and to use the site for lawful purposes only.", ar: "باستخدامك لهذا الموقع فإنك توافقين على تقديم معلومات دقيقة واستخدام الموقع لأغراض مشروعة فقط." } },
      { h: { en: "Pricing", ar: "الأسعار" }, b: { en: "All prices are in Egyptian Pounds (EGP) and include applicable taxes. Prices may change without prior notice.", ar: "جميع الأسعار بالجنيه المصري (EGP) وتشمل الضرائب المطبّقة. قد تتغيّر الأسعار دون إشعار مسبق." } },
      { h: { en: "Products", ar: "المنتجات" }, b: { en: "Dermiva products are cosmetic. Always patch-test and discontinue use if irritation occurs.", ar: "منتجات Dermiva تجميلية. أجري دائمًا اختبار البقعة وأوقفي الاستخدام عند حدوث تهيّج." } },
    ],
  },
};

export function getAllPolicies(): { slug: PolicyKey; policy: Policy }[] {
  return (Object.keys(POLICIES) as PolicyKey[]).map((slug) => ({ slug, policy: POLICIES[slug] }));
}

export function findPolicyBySlug(slug: PolicyKey): Policy | undefined {
  return POLICIES[slug];
}
