import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { get } from 'lodash';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  # Write your query or mutation here
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      desscription
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log({ data, error, loading });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;
  const productLists = get(data, 'allProducts', []) || [];
  return (
    <div>
      <ProductListStyles>
        {productLists.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyles>
    </div>
  );
}
