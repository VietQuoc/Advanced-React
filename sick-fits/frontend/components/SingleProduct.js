import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { get } from 'lodash';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
      status
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  const altText = get(Product, ['photo', 'altText'], '') || '';
  return (
    <ProductStyles>
      <Head>
        <title>White Bear | {Product?.name}</title>
      </Head>
      <img src={Product?.photo?.image?.publicUrlTransformed} alt={altText} />
      <div className="details">
        <h2>{Product?.name}</h2>
        <p>{Product?.description}</p>
      </div>
    </ProductStyles>
  );
}
