export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatFollowers(value: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(value));
}
