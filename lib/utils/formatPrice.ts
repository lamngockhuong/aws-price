export function formatPrice(pricePerUnit: string, unit: string): string {
  const price = parseFloat(pricePerUnit);

  if (isNaN(price)) {
    return 'N/A';
  }

  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

  return `$${formattedPrice} ${unit}`;
}

export function calculateMonthlyPrice(hourlyPrice: string): string {
  const price = parseFloat(hourlyPrice);

  if (isNaN(price)) {
    return 'N/A';
  }

  const monthlyPrice = price * 730; // 730 hours in a month (average)

  return monthlyPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatMonthlyPrice(hourlyPrice: string): string {
  const monthlyPrice = calculateMonthlyPrice(hourlyPrice);
  return monthlyPrice === 'N/A' ? 'N/A' : `$${monthlyPrice}/month`;
}

