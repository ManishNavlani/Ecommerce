import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//get all data
const typeAllQuery = (result, tagType) => {
  return result
    ? [
        ...result.map(({ _id }) => ({ type: tagType, id: _id })),
        { type: tagType, id: "LIST" },
      ]
    : [{ type: tagType, id: "LIST" }];
};

// do {updateOne,deleteOne,getOne} to one thing
const typeOneQuery = (tagType, id) => {
  return [{ type: tagType, id }];
};

// create one thing
const typeOneCreate = (tagType) => {
  return [{ type: tagType, id: "LIST" }];
};

//

export const productApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://ecomani.herokuapp.com/api/v4/`,
    baseUrl: `/`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Users", "Orders", "Carts", "Reviews"],
  endpoints: (builder) => ({
    //Users
    //User login                            {U-L}

    login: builder.mutation({
      query: (body) => ({
        url: "api/v4/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: typeOneCreate("Users"),
    }),

    // User Register
    register: builder.mutation({
      query: (body) => ({
        url: "api/v4/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: typeOneCreate("Users"),
    }),

    // User Logout
    logout: builder.mutation({
      query: () => ({
        url: "api/v4/users/logout",
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) =>
        typeOneQuery("Users", result._id),
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: "api/v4/users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        typeOneQuery("Users", result._id),
    }),

    userProfile: builder.query({
      query: () => `api/v4/users/me`,
      providesTags: (result, error, arg) => typeOneQuery("Users", result._id),
    }),
    //Products
    //get all products                       {P-R}
    getAllProducts: builder.query({
      query: ({ category, currentPage }) =>
        category
          ? `api/v4/products?category=${category}&page=${currentPage}`
          : `api/v4/products?page=${currentPage}`,
      providesTags: (result, error, arg) =>
        typeAllQuery(result.products, "Products"),
    }),

    //get all products by category           {P-R}

    //get product by id                      {P-R}
    getProductById: builder.query({
      query: (id) => `api/v4/products/${id}`,
      providesTags: (result, error, id) => typeOneQuery("Products", id),
    }),

    searchProduct: builder.query({
      query({ queryStr, page }) {
        return {
          url: `api/v4/product/search?search=${queryStr}&page=${page}`,
        };
      },
      providesTags: (result, error, arg) =>
        typeAllQuery(result.products, "Products"),
    }),

    //create Order
    createOrder: builder.mutation({
      query(body) {
        return {
          url: `api/v4/orders/new-order`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: typeOneCreate("Orders"),
    }),

    getUserOrders: builder.query({
      query: () => `api/v4/orders/order`,
      providesTags: (result, error, arg) => typeAllQuery(result, "Orders"),
    }),

    checkOut: builder.mutation({
      query(body) {
        return {
          url: `api/v4/payment`,
          method: "POST",
          body,
        };
      },
    }),

    //Cart
    getUserCart: builder.query({
      query: () => `api/v4/user/cart`,
      providesTags: (result, error, arg) => typeOneQuery("Carts", result._id),
    }),

    createUserCart: builder.mutation({
      query() {
        return {
          url: `api/v4/user/cart`,
          method: "POST",
        };
      },
      invalidatesTags: typeOneCreate("Carts"),
    }),

    updateUserCart: builder.mutation({
      query(cart) {
        return {
          url: `api/v4/user/cart`,
          method: "PATCH",
          body: cart,
        };
      },
      invalidatesTags: (result, error, arg) =>
        typeOneQuery("Carts", result._id),
    }),

    //queries about product review

    // post review about product
    postReview: builder.mutation({
      query(body) {
        return {
          url: `api/v4/product/new-review`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: typeOneCreate("Reviews"),
    }),

    // get  all reviews of product  by product's id
    getProductReviews: builder.query({
      query: (id) => `api/v4/product/reviews/${id}`,
      providesTags: (result, error, arg) =>
        typeAllQuery(result.reviews, "Reviews"),
    }),

    //get current user's review about product  by user's id
    getUserReview: builder.query({
      query: (id) => `api/v4/product/user/review/${id}`,
      providesTags: (result, error, id) => typeOneQuery("Reviews", id),
    }),

    // update current user's exist review about product by user's id
    updateUserReview: builder.mutation({
      query({ updateReviewBody, productId }) {
        return {
          url: `api/v4/product/user/review/${productId}`,
          method: "PATCH",
          body: updateReviewBody,
        };
      },
      invalidatesTags: (result, error, arg) =>
        typeOneQuery("Reviews", result._id),
    }),
  }),
});

export const {
  //Users requests
  useLoginMutation, //components = {login}
  useRegisterMutation, //components = {register}
  useLogoutMutation, //components = {Appbar}
  useUpdateUserMutation, //components = {login}
  useUserProfileQuery,

  //Products requests
  useGetAllProductsQuery, //R
  useGetProductByIdQuery, //R
  useGetProductsByCategoryQuery, //R
  useSearchProductQuery,

  //Orders requests
  useCreateOrderMutation,
  useGetUserOrdersQuery,

  //Payment/Checkout
  useCheckOutMutation,

  //Cart requests
  useGetUserCartQuery,
  useCreateUserCartMutation,
  useUpdateUserCartMutation,

  // Reviews requests
  useGetProductReviewsQuery, // components = {ReviewsDialog}
  useGetUserReviewQuery, // components = {Dialog}
  usePostReviewMutation, // components = {Dialog}
  useUpdateUserReviewMutation, // components = {Dialog}
  reducer: apiReducer,
} = productApi;
