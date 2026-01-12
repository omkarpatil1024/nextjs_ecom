import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">eStore</h3>
            <p className="text-sm text-background/70">
              Your destination for quality products at unbeatable prices. Shop with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-background/70">
              <Link href="/category/electronics" className="hover:text-background">
                Electronics
              </Link>
              <Link href="/category/men%27s%20clothing" className="hover:text-background">
                Men&apos;s Fashion
              </Link>
              <Link href="/category/women%27s%20clothing" className="hover:text-background">
                Women&apos;s Fashion
              </Link>
              <Link href="/category/jewelery" className="hover:text-background">
                Jewelry
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <nav className="flex flex-col gap-2 text-sm text-background/70">
              <Link href="/support" className="hover:text-background">
                Contact Us
              </Link>
              <Link href="/orders" className="hover:text-background">
                Track Order
              </Link>
              <Link href="/returns" className="hover:text-background">
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="hover:text-background">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-background/70">Subscribe for exclusive offers and updates.</p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <p>&copy; 2025 eStore. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-background">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
