import { isNil } from 'lodash';

export default function formatMoney(amount = 0) {
  const numberAmount = isNil(amount) ? 0 : amount;
  const options = {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  };

  const formater = Intl.NumberFormat('de', options);
  return formater.format(numberAmount);
}
