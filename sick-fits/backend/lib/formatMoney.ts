const formatter = new Intl.NumberFormat('de', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
});

export default function formatMoney(cents: number): string {
  const dollars = cents;
  return formatter.format(dollars);
}
