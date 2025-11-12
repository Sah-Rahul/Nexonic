import { z } from "zod";
import { AllowedCategories } from "../constants/category.constant";

export const ProductZodSchema = z.object({
  title: z.string().min(2, "Product title is required"),
  description: z.string().max(500, "Description too long"),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Price must be a positive number"),
  discount: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined))
    .refine((val) => val === undefined || val >= 0, "Discount must be >= 0"),
  KeyFeatures: z.array(z.string()).nonempty("At least one feature required"),
  category: z.enum(AllowedCategories, {
    message: "Invalid category selected",
  }),
  Rating: z.array(z.string()).optional(),
  Review: z.string().optional(),
  relatedProducts: z.array(z.string()).optional(),
});

export type ProductType = z.infer<typeof ProductZodSchema>;
