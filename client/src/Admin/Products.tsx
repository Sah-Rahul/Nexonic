import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreVertical, Edit, Trash2, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import AddProductModal from "./AddProductModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import moment from "moment";

import {
  createProductApi,
  getProductsApi,
  deleteProductApi,
  updateProductApi,
} from "@/api/productApi";

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

const Products = () => {
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const createMutation = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success("Product created!");
      setOpenForm(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updatedProduct }: any) =>
      updateProductApi(id, updatedProduct),
    onSuccess: () => {
      toast.success("Product updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  const handleAddProduct = (newProduct: any) => {
    const fd = new FormData();

    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === "KeyFeatures" && Array.isArray(value)) {
        value.forEach((feat) => fd.append("KeyFeatures[]", feat));
      } else if (key === "productImage" && value instanceof File) {
        fd.append("productImage", value);
      } else {
        fd.append(key, value as string);
      }
    });

    createMutation.mutate(fd);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditProduct = (product: any) => {
    const updatedProduct = { ...product, Rating: [4] };
    editMutation.mutate({ id: product._id, updatedProduct });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts =
    productsData?.data.filter((product: any) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={() => setOpenForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 shadow">
          <CardTitle className="text-sm text-muted-foreground">
            Total Products
          </CardTitle>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold">
              {productsData?.data?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 shadow">
          <CardTitle className="text-sm text-muted-foreground">
            Total Categories
          </CardTitle>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold">{CATEGORIES.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: any) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.productImage}
                              className="h-10 w-10 object-cover"
                            />
                            <span>{product.title.slice(0, 20)}...</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {product.description.slice(0, 20)}...
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>Rs{product.price}</TableCell>
                        <TableCell>
                          {product.createdAt
                            ? moment(product.createdAt).format(
                                "DD MMM YYYY, hh:mm A"
                              )
                            : "N/A"}
                        </TableCell>

                        <TableCell>
                          <div className="flex">
                            {(() => {
                              const ratingValue =
                                product.Rating && product.Rating.length > 0
                                  ? product.Rating.map((r: any) =>
                                      Number(r)
                                    ).reduce(
                                      (sum: number, r: number) => sum + r,
                                      0
                                    ) / product.Rating.length
                                  : 0;

                              return Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.round(ratingValue)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  fill={
                                    i < Math.round(ratingValue)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ));
                            })()}
                          </div>
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <MoreVertical className="w-5 h-5 cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(product._id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddProductModal
        open={openForm}
        setOpen={setOpenForm}
        onAddProduct={handleAddProduct}
        isLoading={createMutation.isPending}
      />
    </div>
  );
};

export default Products;
