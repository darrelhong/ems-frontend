import App from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchProducts } from '../redux/actions/productActions';
import products from '../data/products.json';
import Preloader from '../components/Preloader';
import '../assets/scss/style.scss';

import { Fonts } from '../styles/Fonts';

import '../styles/globals.css';

const queryClient = new QueryClient();

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
    props.reduxStore.dispatch(fetchProducts(products));
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        <Fonts />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <ToastProvider>
              <Provider store={reduxStore}>
                <PersistGate loading={<Preloader />} persistor={this.persistor}>
                  <Component {...pageProps} />
                </PersistGate>
              </Provider>
            </ToastProvider>
          </Hydrate>
        </QueryClientProvider>
      </>
    );
  }
}

export default withReduxStore(MyApp);
