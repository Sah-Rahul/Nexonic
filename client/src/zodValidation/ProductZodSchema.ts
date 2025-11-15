import { z } from "zod";

export const createProductZodSchema = z.object({
  
    title: z.string().nonempty({ message: "Title is required" }),
  
  description: z.string().nonempty({ message: "Description is required" }),
  
  discount: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(0, { message: "Discount must be at least 0" }).max(100, { message: "Discount cannot exceed 100" }).optional()),
 
  price: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(1, { message: "Price must be greater than 0" })),
 
  category: z.string().nonempty({ message: "Category is required" }),
  
  rating: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(1, { message: "Rating is required" }).max(5, { message: "Rating cannot be more than 5" })),
  
  KeyFeatures: z
    .array(z.string().nonempty({ message: "Feature cannot be empty" }))
    .min(1, { message: "At least one feature is required" }),
  
    productImage: z.instanceof(File, { message: "Product image is required" }),
});

export type CreateProductType = z.infer<typeof createProductZodSchema>;
