
// src/lib/products.ts
export type Product = { id: number; title: string; price: number; image: string };

export const mockProducts: Product[] = [
  { id: 1, title: 'Remera Elsa T4', price: 8500, image: '/elsa.jpg' },
  { id: 2, title: 'Calza Skye T6', price: 12000, image: '/skye.jpg' },
  { id: 3, title: 'Buzo Mickey T8', price: 15500, image: '/mickey.jpg' },
];
