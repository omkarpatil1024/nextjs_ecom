import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Product, LoginCredentials, LoginResponse, User } from "@/lib/types"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Products", "Product", "Categories", "User"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { limit?: number; sort?: "asc" | "desc" }>({
      query: ({ limit, sort } = {}) => {
        const params = new URLSearchParams()
        if (limit) params.append("limit", limit.toString())
        if (sort) params.append("sort", sort)
        return `/products${params.toString() ? `?${params}` : ""}`
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
      providesTags: ["Products"],
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      providesTags: ["Categories"],
    }),
    // Auth
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useLoginMutation,
  useGetUserQuery,
} = apiSlice
