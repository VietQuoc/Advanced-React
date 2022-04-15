import { get } from 'lodash';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTab from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

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
      <p>{product?.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct id={id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
