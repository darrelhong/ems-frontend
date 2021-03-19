import Router from 'next/router';
import Cookies from 'js-cookie';
import api from './ApiClient';

export const logout = ({ redirectTo }) => {
  Cookies.remove('token');
  Cookies.remove('_ga');
  Cookies.remove('_gid');
  Cookies.remove('amplitude_id_fef1e872c952688acd962d30aa545b9eravenhub.io');
  Cookies.remove('fs_uid');
  localStorage.removeItem('userId');
  localStorage.clear();
  window.localStorage.clear();
   Router.push(redirectTo);
 
};

export const login = (
  credentials,
  loginApiUrl,
  loginSuccessUrl,
  setLoginError
) => {
  api
    .post(loginApiUrl, credentials)
    .then((res) => {
      localStorage.setItem('userId', res.data.user.id);
      Router.push(loginSuccessUrl);
    })
    .catch(() => {
      setLoginError('Username/Password is incorrect.');
    });
};
