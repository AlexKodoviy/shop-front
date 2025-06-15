export function getPriceByRole(product: any, role: string): number {
  if (role === 'pro') return product.price_pro;
  if (role === 'max') return product.price_max;
  return product.price_guest;
}
