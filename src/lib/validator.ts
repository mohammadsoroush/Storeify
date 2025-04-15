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

export const signInFormSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(2, "password must be at least 6 characters"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "name must be at least 3 character"),
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(4, "password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password and confirmpassword dont match",
    path: ["confirmPassword"],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, "product is required !"),
  name: z.string().min(1, "name is required !"),
  slug: z.string().min(1, "slug is required !"),
  qty: z.number().int().nonnegative("Must be a positive number"),
  image: z.string().min(1, "slug is required !"),
  price: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "Price must have exactly two decimal places"
    ),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemprice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "itemprice must have exactly two decimal places"
    ),
  totalPrice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "totalPrice must have exactly two decimal places"
    ),
  shippingPrice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "shippingPrice must have exactly two decimal places"
    ),
  taxPrice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(fomatNumberWithDecima(Number(value))),
      "taxPrice must have exactly two decimal places"
    ),
  sessionCartId: z.string().min(1, "sessionCartId is required"),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
