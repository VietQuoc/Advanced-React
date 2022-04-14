import { get } from 'lodash';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTab from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  const image =
    get(product, ['photo', 'image', 'publicUrlTransformed'], '') || '';
  const name = get(product, 'name', '') || '';
  const id = get(product, 'id', '') || '';
  return (
    <ItemStyles>
      <img src={image} alt={name} />
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTab>{formatMoney(product?.price)}</PriceTab>
    </ItemStyles>
  );
}
