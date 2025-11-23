import { axiosInstance } from "./axiosInstance";

export const createProductApi = async (product: FormData) => {
  const { data } = await axiosInstance.post(
    "/api/v1/product/create-product",
    product,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const getProductsApi = async () => {
  const { data } = await axiosInstance.get("/api/v1/product/");
  return data.data;
};

export const updateProductApi = async (id: string, product: FormData) => {
  const { data } = await axiosInstance.put(
    `/api/v1/product/update-product/${id}`,
    product,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const deleteProductApi = async (id: string) => {
  const { data } = await axiosInstance.delete(
    `/api/v1/product/delete-product/${id}`
  );
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/v1/product/:/${id}`);
  return data;
};

export const getProductByCategory = async (slug: string) => {
  const encodedSlug = encodeURIComponent(slug);
  const { data } = await axiosInstance.get(
    `/api/v1/product/category/${encodedSlug}`
  );
  return data;
};

export const getRelatedProductApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/v1/product/related-product/${id}`);
  return data;
};

