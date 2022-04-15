import SingleProduct from '../../components/SingleProduct';

export default function IDProduct({ query }) {
  return <SingleProduct id={query?.id} />;
}
