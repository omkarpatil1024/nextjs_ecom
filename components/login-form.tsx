"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppDispatch } from "@/store/hooks"
import { setCredentials, setLoading, setError } from "@/store/auth-slice"
import { useLoginMutation } from "@/store/api-slice"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setLocalError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const redirectUrl = searchParams.get("redirect") || "/"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLocalError(null)
    dispatch(setLoading(true))

    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
      }).unwrap()

      const demoUser = {
        id: 1,
        email: `${formData.username}@example.com`,
        username: formData.username,
        name: {
          firstname: formData.username.charAt(0).toUpperCase() + formData.username.slice(1),
          lastname: "User",
        },
      }

      document.cookie = `auth-token=${result.token}; path=/; max-age=${60 * 60 * 24 * 7}`
      document.cookie = `user-data=${encodeURIComponent(JSON.stringify(demoUser))}; path=/; max-age=${60 * 60 * 24 * 7}`

      dispatch(setCredentials({ user: demoUser, token: result.token }))

      router.push(redirectUrl)
    } catch {
      setLocalError("Invalid username or password. Try: mor_2314 / 83r5^_")
      dispatch(setError("Login failed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>Demo credentials:</p>
            <p className="font-mono">Username: mor_2314 | Password: 83r5^_</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
