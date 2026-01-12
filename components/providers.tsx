"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { hydrateAuth } from "@/store/auth-slice"
import { hydrateCart } from "@/store/cart-slice"
import type { CartItem, User } from "@/lib/types"

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Hydrate auth from cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return null
    }

    const authToken = getCookie("auth-token")
    const userData = getCookie("user-data")

    if (authToken && userData) {
      try {
        const user: User = JSON.parse(decodeURIComponent(userData))
        dispatch(hydrateAuth({ user, token: authToken }))
      } catch {
        dispatch(hydrateAuth(null))
      }
    } else {
      dispatch(hydrateAuth(null))
    }

    // Hydrate cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(savedCart)
        dispatch(hydrateCart(cartItems))
      } catch {
        // Invalid cart data
      }
    }
  }, [dispatch])

  // Save cart to localStorage on changes
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      localStorage.setItem("cart", JSON.stringify(state.cart.items))
    })
    return unsubscribe
  }, [])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  )
}
