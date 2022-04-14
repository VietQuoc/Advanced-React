export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  };

  const formater = Intl.NumberFormat('fr-us', options);
  return formater.format(amount);
}
