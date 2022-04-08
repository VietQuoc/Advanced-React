/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import Nprogress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
