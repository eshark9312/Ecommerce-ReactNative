import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories.json',
    }),
    getProducts: builder.query({
      query: () => 'products.json',
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
    }),
    putProfilePicture: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profilePictures/${localId}.json`,
        method: 'PUT',
        body: {
          image: image,
        }
      })
    }),
    getProfilePicture: builder.query({
      query: (localId) => `profilePictures/${localId}.json`
    }),
    getUserLocation: builder.query({
      query: (localId) => `locations/${localId}.json`
    }),
    putUserLocation: builder.mutation({
      query: ({ localId, location }) => ({
        url: `locations/${localId}.json`,
        method: 'PUT',
        body: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        },
      })
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  usePutProfilePictureMutation,
  useGetProfilePictureQuery,
  useGetUserLocationQuery,
  usePutUserLocationMutation
} = shopApi