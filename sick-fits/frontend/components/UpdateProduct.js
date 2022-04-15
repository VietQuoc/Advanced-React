import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
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

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String!
    $description: String
    $price: Int! # $image: Upload
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        # photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs?.name,
            description: inputs?.description,
            price: inputs?.price,
          },
        }).catch(console.error);
        // const res = await createProduct();
        // clearForm();
        // // Go to that product's page
        // Router.push({ pathname: `product/${res?.data?.createProduct?.id}` });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        {/* <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="name"
            onChange={handleChange}
          />
        </label> */}

        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            placeholder="Name"
            value={inputs?.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            placeholder="Price"
            value={inputs?.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            value={inputs?.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
