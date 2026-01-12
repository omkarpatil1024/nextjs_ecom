// Product types
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
}

// User types
export interface User {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  address?: {
    city: string
    street: string
    number: number
    zipcode: string
  }
  phone?: string
}

// Order types
export interface Order {
  id: string
  userId: number
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: {
    fullName: string
    address: string
    city: string
    zipcode: string
    country: string
  }
  createdAt: string
}

// Auth types
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// API Response types
export interface LoginResponse {
  token: string
}

export interface LoginCredentials {
  username: string
  password: string
}
