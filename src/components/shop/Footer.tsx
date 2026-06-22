import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1A0F0A] text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#C4956A] mb-4">
              Birch<span className="text-white/60">&amp;</span>Bean
            </h3>
            <p className="text-sm leading-relaxed">
              Small-batch, single-origin coffee roasted in Portland, OR. Crafted from seed to cup
              with care and intention.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/products" className="hover:text-[#C4956A] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/products?roast=light"
                  className="hover:text-[#C4956A] transition-colors"
                >
                  Light Roast
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/products?roast=medium"
                  className="hover:text-[#C4956A] transition-colors"
                >
                  Medium Roast
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/products?roast=dark"
                  className="hover:text-[#C4956A] transition-colors"
                >
                  Dark Roast
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
              Learn
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/about" className="hover:text-[#C4956A] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/shop/about#values" className="hover:text-[#C4956A] transition-colors">
                  Sourcing &amp; Values
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#C4956A] transition-colors">
                  Brew Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C4956A] transition-colors">
                  Wholesale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>hello@birchandbean.com</li>
              <li>Portland, OR</li>
              <li className="flex gap-4 pt-2">
                <a href="#" aria-label="Instagram" className="hover:text-[#C4956A] transition-colors">
                  IG
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-[#C4956A] transition-colors">
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-center">
          &copy; {new Date().getFullYear()} Birch &amp; Bean Coffee Co. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
