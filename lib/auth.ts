import Router from 'next/router';
import Cookies from 'js-cookie';
import api from './ApiClient';

export const logout = (): void => {
  Cookies.remove('token');
  localStorage.removeItem('userId');
  Router.push('/admin/login');
};

type Credentials = {
  email: string;
  password: string;
};

export const login = (
  credentials: Credentials,
  loginApiUrl: string,
  loginSuccessUrl: string,
  setLoginError
): void => {
  api
    .post(loginApiUrl, credentials)
    .then((res) => {
      localStorage.setItem('userId', res.data.user.id);
      Router.push(loginSuccessUrl);
    })
    .catch(() => setLoginError('An error occured'));
};
