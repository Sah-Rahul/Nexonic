import { useState, useEffect } from "react";
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
import { Star, X } from "lucide-react";

interface EditProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: any;
  onEditProduct: (data: any) => void;
  isLoading?: boolean;
}

const CATEGORIES = [
  "AIR CONDITIONER",
  "AUDIO & VIDEO",
  "GADGETS",
  "HOME APPLIANCES",
  "KITCHEN APPLIANCES",
  "PCS & LAPTOP",
  "REFRIGERATOR",
  "SMART HOME",
];

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  setOpen,
  product,
  onEditProduct,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    rating: 0,
    productImage: null as File | null,
  });

  const [features, setFeatures] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateAverageRating = (ratings: number[]) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + Number(r), 0);
    return Math.round(sum / ratings.length);
  };

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        discount: product.discount?.toString() || "",
        category: product.category || "",
        rating: calculateAverageRating(product.Rating || []),
        productImage: null,
      });
      setFeatures(product.KeyFeatures?.length > 0 ? product.KeyFeatures : [""]);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, productImage: file });
    }
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = () => {
    const cleanFeatures = features.filter((f) => f.trim() !== "");

    if (cleanFeatures.length === 0) {
      setErrors({ KeyFeatures: "At least one feature is required" });
      return;
    }

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("discount", formData.discount);
    fd.append("category", formData.category);

    fd.append("Rating[]", formData.rating.toString());

    cleanFeatures.forEach((feat) => {
      fd.append("KeyFeatures[]", feat);
    });

    if (formData.productImage) {
      fd.append("productImage", formData.productImage);
    }

    setErrors({});
    onEditProduct({ id: product._id, formData: fd });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product details</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Product Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0"
              />
            </div>
            <div>
              <Label>Discount (%)</Label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Rating</Label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= formData.rating
                      ? "text-red-500 fill-red-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating} / 5
              </span>
            </div>
          </div>

          <div>
            <Label>Product Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to keep current image
            </p>
          </div>

          <div>
            <Label>Key Features</Label>
            <div className="space-y-2 mt-2">
              {features.map((feat, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feat}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {features.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {errors.KeyFeatures && (
                <p className="text-red-500 text-sm">{errors.KeyFeatures}</p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddFeature}
                className="w-full"
              >
                + Add Feature
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
