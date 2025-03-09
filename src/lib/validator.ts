import { z } from "zod";

// تعریف Schema برای افزودن محصولات
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"), // حداقل ۳ کاراکتر
  slug: z.string().min(3, "Slug must be at least 3 characters"), // حداقل ۳ کاراکتر
  category: z.string().min(3, "Category must be at least 3 characters"), // حداقل ۳ کاراکتر
  brand: z.string().min(3, "Brand must be at least 3 characters"), // حداقل ۳ کاراکتر
  description: z.string().min(3, "Description must be at least 3 characters"), // حداقل ۳ کاراکتر
  stock: z.coerce.number(), // مقدار باید عدد باشد (حتی اگر رشته باشد، تبدیل می‌شود)
  images: z.array(z.string()).min(1, "Product must have at least one image"), // حداقل یک تصویر الزامی است
  isFeatured: z.boolean(), // مقدار بولین (true یا false)
  banner: z.string().nullable(), // مقدار می‌تواند رشته یا null باشد
  price: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "Price must have exactly two decimal places"
    ),
});

const fomatNumberWithDecima = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};
