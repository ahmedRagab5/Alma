# إعداد Google Maps

## الحصول على مفتاح API

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو اختر مشروع موجود
3. فعّل Google Maps JavaScript API
4. اذهب إلى "Credentials" وأنشئ مفتاح API جديد
5. قيد المفتاح بـ HTTP referrers إذا لزم الأمر

## إضافة المفتاح إلى المشروع

1. افتح ملف `src/app/components/map/map.component.ts`
2. استبدل `YOUR_API_KEY` بمفتاح API الخاص بك
3. احفظ الملف

## مثال

```typescript
const loader = new Loader({
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // مفتاحك هنا
  version: "weekly",
  libraries: ["places"],
});
```

## ملاحظات

- تأكد من تفعيل Google Maps JavaScript API في Google Cloud Console
- يمكنك تقييد المفتاح بـ HTTP referrers للأمان
- المفتاح مجاني مع حد شهري معقول
