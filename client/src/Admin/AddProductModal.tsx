import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createProductZodSchema } from "@/zodValidation/ProductZodSchema";

interface AddModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddProduct: (data: any) => void;
  isLoading?: boolean;
}

const AddProductModal: React.FC<AddModalProps> = ({
  open,
  setOpen,
  onAddProduct,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    rating: "",
    productImage: null as File | null,
  });

  const [features, setFeatures] = useState([""]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const cleanFeatures = features.filter((f) => f.trim() !== "");

    if (!formData.productImage) {
      setErrors({ productImage: "Product image is required" });
      return;
    }

    const finalData = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount),
      rating: Number(formData.rating),
      KeyFeatures: cleanFeatures,
      productImage: formData.productImage,
    };

    const result = createProductZodSchema.safeParse(finalData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = String(err.path[0]);
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onAddProduct(result.data);
    setOpen(false);

    setFormData({
      title: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      rating: "",
      productImage: null,
    });
    setFeatures([""]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Fill in all details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Discount (%)</Label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">{errors.discount}</p>
              )}
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded p-2"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {[
                  "AIR CONDITIONER",
                  "AUDIO & VIDEO",
                  "GADGETS",
                  "HOME APPLIANCES",
                  "KITCHEN APPLIANCES",
                  "PCS & LAPTOP",
                  "REFRIGERATOR",
                  "SMART HOME",
                  "BEST DEALS",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div>
              <Label>Rating</Label>
              <select
                className="w-full border rounded p-2"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Upload Image</Label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productImage: e.target.files?.[0] ?? null,
                })
              }
            />
            {errors.productImage && (
              <p className="text-red-500 text-sm">{errors.productImage}</p>
            )}
          </div>

          <div>
            <Label>Key Features</Label>
            {features.map((feat, index) => (
              <Input
                key={index}
                value={feat}
                onChange={(e) => {
                  const updated = [...features];
                  updated[index] = e.target.value;
                  setFeatures(updated);
                }}
                className="mt-2"
                placeholder={`Feature ${index + 1}`}
              />
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setFeatures([...features, ""])}
            >
              + Add Feature
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
