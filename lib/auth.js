import Router from 'next/router';
import Cookies from 'js-cookie';
import api from './ApiClient';

export const logout = ({ redirectTo }) => {
  Cookies.remove('token');
  localStorage.removeItem('userId');
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
    .catch(() => setLoginError('An error occured'));
};


