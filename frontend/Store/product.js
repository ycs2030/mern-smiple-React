import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct : async (newProduct) => {
        try {
          const response = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          });
          const data = await response.json();
          console.log(data);
          set((state) => ({products: [...state.products, data.data]}));
          return {success: true, message: "Product created successfully"}
        } catch (error) {
          console.log(`Failed to create product: ${error.message}`);
          return {success: false, message: "Failed to create product"}
        }
      },
    fetchProducts: async () => {
        try {
          const response = await fetch("/api/products");
          const data = await response.json();
          console.log("length : " + data.Count);
          console.log("data : " + data.data);
          set({ products: data.data });
        } catch (error) {
          console.log(`Failed to fetch products: ${error.message}`);
        }
      },
    deleteProduct: async (id) => {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          console.log(data);
          // update the ui immediately, without waiting for the response
          set((state) => ({
            products: state.products.filter((product) => product._id !== id),
          }));
          return {success: true, message: "Product deleted successfully"}
        } catch (error) {
          console.log(`Failed to delete product: ${error.message}`);
          return {success: false, message: "Failed to delete product"}
        }
    },
    updateProduct: async (id, updatedProduct) => {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          });
          const data = await response.json();
          console.log(data);
          // update the ui immediately, without waiting for the response
          set((state) => ({
            products: state.products.map((product) =>
              product._id === id ? data.data : product
            ),
          }));
          return {success: true, message: "Product updated successfully"}
        } catch (error) {
          console.log(`Failed to update product: ${error.message}`);
          return {success: false, message: "Failed to update product"}
        }
    } 
}));

export const useCartStore = create((set) => ({
    cartItems: [],
    setCartItems: (cartItems) => set({ cartItems }),
}));