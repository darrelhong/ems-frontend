import useCheckToken from '../lib/useCheckToken';
import LoadingScreen from './LoadingScreen';

// HOC to check for token
const withProtectRoute = (Component, { redirectTo }) => (props) => {
  const [isLoggedIn] = useCheckToken({
    redirectTo,
  });

  if (!isLoggedIn) {
    return <LoadingScreen />;
  }
  return <Component {...props} />;
};
export default withProtectRoute;
