```ts
export type Origin = "local" | "import";
export type Vendor = { id: string; name: string; story?: string; photo_url?: string };
export type Supplier = { id: string; name: string; source_url?: string };
export type Product = { id: string; name: string; description: string; price: number; origin: Origin; vendor?: Vendor; supplier?: Supplier };
export type CartItem = { product: Product; qty: number };