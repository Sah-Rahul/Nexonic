export const AllowedCategories = [
  "AIR CONDITIONER",
  "AUDIO & VIDEO",
  "GADGETS",
  "HOME APPLIANCES",
  "KITCHEN APPLIANCES",
  "PCS & LAPTOP",
  "REFRIGERATOR",
  "SMART HOME",
  "BEST DEALS",
  "NEW ARRIVALS"
] as const;

export type CategoryType = (typeof AllowedCategories)[number];
