import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={(e) => handleSubmit(e)}>
      <h2>Sign Up For an Account</h2>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser ? (
          <p>
            Signed up with {data?.createUser?.email} - Please Go Head and Sign
            in!
          </p>
        ) : (
          <>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                id="email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                id="name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="Your Password Address"
                id="password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sign Up!</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}
