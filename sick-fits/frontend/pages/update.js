import Proptype from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <PleaseSignIn>
      <UpdateProduct id={query?.id} />
    </PleaseSignIn>
  );
}

UpdatePage.propTypes = {
  query: Proptype.shape({
    id: Proptype.string,
  }),
};
