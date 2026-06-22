export type Product = {
  id: string
  name: string
  roastLevel: "light" | "medium" | "dark"
  origin: string
  region: string
  price: number
  availableWeights: { label: string; grams: number; priceAdjust: number }[]
  description: string
  shortDescription: string
  tastingNotes: string[]
  specs: {
    altitude: string
    process: string
    producer: string
  }
  images: string[]
  rating: number
  reviewCount: number
  featured: boolean
  slug: string
}

export const products: Product[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    roastLevel: "light",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    price: 22,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 14 },
    ],
    description:
      "Bright and complex, this washed Yirgacheffe delivers a clean cup with floral aromatics and a silky body. Grown in the birthplace of coffee, these beans are carefully hand-picked and processed at high-altitude washing stations.",
    shortDescription: "Bright, floral, and complex with a silky body.",
    tastingNotes: ["Bergamot", "Honey", "Chocolate"],
    specs: {
      altitude: "1,800 – 2,200m",
      process: "Washed",
      producer: "Guji Zone Smallholders",
    },
    images: ["/website-new/product-1.jpg", "/website-new/product-2.jpg", "/website-new/product-3.jpg"],
    rating: 4.8,
    reviewCount: 42,
    featured: true,
    slug: "ethiopia-yirgacheffe",
  },
  {
    id: "kenya-aa",
    name: "Kenya AA",
    roastLevel: "light",
    origin: "Kenya",
    region: "Nyeri",
    price: 24,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 16 },
    ],
    description:
      "A classic Kenya AA from the Nyeri region. Intense blackcurrant and tomato-bright acidity with a winey finish. Grown at high altitude on smallholder farms around Mount Kenya.",
    shortDescription: "Bold, winey, with blackcurrant and bright acidity.",
    tastingNotes: ["Blackcurrant", "Tomato", "Wine"],
    specs: {
      altitude: "1,600 – 1,900m",
      process: "Washed",
      producer: "Kieni Cooperative",
    },
    images: ["/website-new/product-2.jpg", "/website-new/product-3.jpg", "/website-new/product-4.jpg"],
    rating: 4.7,
    reviewCount: 36,
    featured: true,
    slug: "kenya-aa",
  },
  {
    id: "costa-rica-la-minita",
    name: "Costa Rica La Minita",
    roastLevel: "light",
    origin: "Costa Rica",
    region: "Tarrazú",
    price: 20,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 12 },
    ],
    description:
      "Exceptionally clean and sweet. La Minita is one of Costa Rica's most renowned estates, producing a balanced cup with honey sweetness, citrus brightness, and a creamy body.",
    shortDescription: "Sweet, clean, with honey and citrus notes.",
    tastingNotes: ["Honey", "Lemon", "Caramel"],
    specs: {
      altitude: "1,200 – 1,600m",
      process: "Washed",
      producer: "La Minita Estate",
    },
    images: ["/website-new/product-3.jpg", "/website-new/product-4.jpg", "/website-new/product-5.jpg"],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    slug: "costa-rica-la-minita",
  },
  {
    id: "rwanda-nyamasheke",
    name: "Rwanda Nyamasheke",
    roastLevel: "light",
    origin: "Rwanda",
    region: "Nyamasheke",
    price: 21,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 13 },
    ],
    description:
      "From the lush hills of western Rwanda, this fully washed coffee offers a delicate floral aroma with notes of jasmine and stone fruit. A truly elegant cup.",
    shortDescription: "Floral, delicate, with jasmine and stone fruit.",
    tastingNotes: ["Jasmine", "Peach", "Green Tea"],
    specs: {
      altitude: "1,700 – 2,000m",
      process: "Fully Washed",
      producer: "Dukunde Kawa Cooperative",
    },
    images: ["/website-new/product-4.jpg", "/website-new/product-5.jpg", "/website-new/product-6.jpg"],
    rating: 4.6,
    reviewCount: 19,
    featured: false,
    slug: "rwanda-nyamasheke",
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    roastLevel: "medium",
    origin: "Colombia",
    region: "Huila",
    price: 19,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 11 },
    ],
    description:
      "A crowd favorite. Rich caramel sweetness with a bright apple-like acidity and a creamy, satisfying finish. Sourced from family farms in the Huila department.",
    shortDescription: "Rich, smooth, with caramel and apple brightness.",
    tastingNotes: ["Caramel", "Apple", "Almond"],
    specs: {
      altitude: "1,500 – 1,900m",
      process: "Washed",
      producer: "Huila Smallholders",
    },
    images: ["/website-new/product-5.jpg", "/website-new/product-6.jpg", "/website-new/product-1.jpg"],
    rating: 4.7,
    reviewCount: 55,
    featured: true,
    slug: "colombia-huila",
  },
  {
    id: "guatemala-antigua",
    name: "Guatemala Antigua",
    roastLevel: "medium",
    origin: "Guatemala",
    region: "Antigua",
    price: 20,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 12 },
    ],
    description:
      "Grown in the volcanic highlands of Antigua, this coffee boasts a full body with cocoa nib sweetness, subtle spice, and a lingering smoky finish from the mineral-rich soil.",
    shortDescription: "Full-bodied with cocoa, spice, and smoky depth.",
    tastingNotes: ["Cocoa", "Cinnamon", "Smoke"],
    specs: {
      altitude: "1,500 – 1,700m",
      process: "Washed",
      producer: "Valle de Antigua Association",
    },
    images: ["/website-new/product-6.jpg", "/website-new/product-1.jpg", "/website-new/product-2.jpg"],
    rating: 4.5,
    reviewCount: 31,
    featured: false,
    slug: "guatemala-antigua",
  },
  {
    id: "honduras-marcala",
    name: "Honduras Marcala",
    roastLevel: "medium",
    origin: "Honduras",
    region: "Marcala",
    price: 18,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 10 },
    ],
    description:
      "Sweet and approachable. Notes of milk chocolate and orange zest with a silky body and clean finish. Grown in the highlands of western Honduras.",
    shortDescription: "Sweet, balanced, with chocolate and orange zest.",
    tastingNotes: ["Milk Chocolate", "Orange", "Brown Sugar"],
    specs: {
      altitude: "1,400 – 1,700m",
      process: "Washed",
      producer: "Marcala Cooperative",
    },
    images: ["/website-new/product-1.jpg", "/website-new/product-2.jpg", "/website-new/product-3.jpg"],
    rating: 4.4,
    reviewCount: 23,
    featured: false,
    slug: "honduras-marcala",
  },
  {
    id: "peru-chanchamayo",
    name: "Peru Chanchamayo",
    roastLevel: "medium",
    origin: "Peru",
    region: "Chanchamayo",
    price: 19,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 11 },
    ],
    description:
      "A smooth, medium-bodied coffee with nutty sweetness and a touch of tropical fruit. Grown organically by smallholder farmers in Peru's central jungle region.",
    shortDescription: "Nutty, smooth, with tropical fruit undertones.",
    tastingNotes: ["Walnut", "Mango", "Toffee"],
    specs: {
      altitude: "1,200 – 1,600m",
      process: "Washed",
      producer: "Chanchamayo Growers",
    },
    images: ["/website-new/product-2.jpg", "/website-new/product-3.jpg", "/website-new/product-4.jpg"],
    rating: 4.6,
    reviewCount: 17,
    featured: false,
    slug: "peru-chanchamayo",
  },
  {
    id: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    roastLevel: "dark",
    origin: "Indonesia",
    region: "Aceh",
    price: 21,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 13 },
    ],
    description:
      "The quintessential dark roast. Syrupy body with notes of dark chocolate, cedar, and a signature earthy spice. Grown in the highlands of northern Sumatra and processed using the traditional Giling Basah method.",
    shortDescription: "Syrupy, earthy, with dark chocolate and cedar.",
    tastingNotes: ["Dark Chocolate", "Cedar", "Tobacco"],
    specs: {
      altitude: "1,100 – 1,500m",
      process: "Giling Basah",
      producer: "Aceh Smallholders",
    },
    images: ["/website-new/product-3.jpg", "/website-new/product-4.jpg", "/website-new/product-5.jpg"],
    rating: 4.8,
    reviewCount: 47,
    featured: true,
    slug: "sumatra-mandheling",
  },
  {
    id: "brazil-santos",
    name: "Brazil Santos",
    roastLevel: "dark",
    origin: "Brazil",
    region: "Santos",
    price: 17,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 9 },
    ],
    description:
      "A classic Brazilian coffee with low acidity and heavy body. Notes of roasted peanut, dark chocolate, and a hint of brown sugar. Perfect for espresso blends.",
    shortDescription: "Low-acid, heavy body with peanut and chocolate.",
    tastingNotes: ["Peanut", "Dark Chocolate", "Brown Sugar"],
    specs: {
      altitude: "800 – 1,200m",
      process: "Pulped Natural",
      producer: "Santos Region Farms",
    },
    images: ["/website-new/product-4.jpg", "/website-new/product-5.jpg", "/website-new/product-6.jpg"],
    rating: 4.3,
    reviewCount: 39,
    featured: false,
    slug: "brazil-santos",
  },
  {
    id: "mexico-chiapas",
    name: "Mexico Chiapas",
    roastLevel: "dark",
    origin: "Mexico",
    region: "Chiapas",
    price: 18,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 10 },
    ],
    description:
      "From the misty mountains of Chiapas, this organic coffee offers a smooth dark roast experience with notes of roasted almond, vanilla, and a hint of red apple. Exceptionally balanced.",
    shortDescription: "Smooth, organic, with almond and vanilla.",
    tastingNotes: ["Almond", "Vanilla", "Red Apple"],
    specs: {
      altitude: "1,300 – 1,700m",
      process: "Washed",
      producer: "Chiapas Organic Cooperative",
    },
    images: ["/website-new/product-5.jpg", "/website-new/product-6.jpg", "/website-new/product-1.jpg"],
    rating: 4.5,
    reviewCount: 21,
    featured: false,
    slug: "mexico-chiapas",
  },
  {
    id: "house-blend",
    name: "House Blend",
    roastLevel: "dark",
    origin: "Blend",
    region: "Multi-Origin",
    price: 16,
    availableWeights: [
      { label: "12 oz", grams: 340, priceAdjust: 0 },
      { label: "2 lb", grams: 907, priceAdjust: 8 },
      { label: "5 lb", grams: 2268, priceAdjust: 26 },
    ],
    description:
      "Our signature blend combines beans from Brazil, Colombia, and Sumatra to create a well-rounded, chocolaty cup with a velvety body and a touch of spice. Our most popular roast, perfected over a decade.",
    shortDescription: "Our signature blend — chocolaty, bold, and balanced.",
    tastingNotes: ["Chocolate", "Marshmallow", "Clove"],
    specs: {
      altitude: "Various",
      process: "Blended",
      producer: "Birch & Bean Roastery",
    },
    images: ["/website-new/product-6.jpg", "/website-new/product-1.jpg", "/website-new/product-2.jpg"],
    rating: 4.9,
    reviewCount: 103,
    featured: true,
    slug: "house-blend",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export type RoastLevel = "light" | "medium" | "dark"
export const origins = [...new Set(products.map((p) => p.origin))].sort()
