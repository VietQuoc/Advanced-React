import styled from 'styled-components';
import Proptype from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading, data, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: {
        id,
      },
      update,
      //   optimisticResponse: {
      //     deleteCartItem: {
      //       __typename: 'CartItem',
      //       id,
      //     },
      //   },
    }
  );
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      title="Remove this Item from Cart"
      type="button"
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: Proptype.string,
};
