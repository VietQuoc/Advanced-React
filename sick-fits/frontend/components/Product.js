import { get } from 'lodash';
import Link from 'next/link';
import Proptype from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTab from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

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
        <AddToCart id={product?.id} />
        <DeleteProduct id={id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: Proptype.shape({
    price: Proptype.number,
    description: Proptype.string,
    id: Proptype.string,
  }),
};
