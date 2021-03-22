import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import Cookies from 'js-cookie';

import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineNotification,
} from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';
import { logout } from '../../lib/auth';
import useUser from '../../lib/query/useUser';
import { getUser } from '../../lib/query/getUser';
import { useState, useEffect } from 'react';

const AttendeeHeaderTop = () => {
  // const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log(user?.id);
  //   Cookies.set('_ga', 'GA1.2.1842973542.1615538128', {sameSite: 'None', secure: true});
  //   Cookies.set('_gid', 'GA1.2.1046676275.1615987060', {sameSite: 'None', secure: true});
  //   Cookies.set('amplitude_id_fef1e872c952688acd962d30aa545b9eravenhub', 'eyJkZXZpY2VJZCI6IjA3MTg4ZWUyLTZjMmEtNDAxOS05MjFkLTI5OWUyODRlODRjNVIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTYxNjA1Nzk0MzcyMSwibGFzdEV2ZW50VGltZSI6MTYxNjA1Nzk0NDU2OSwiZXZlbnRJZCI6MSwiaWRlbnRpZnlJZCI6MSwic2VxdWVuY2VOdW1iZXIiOjJ9', {sameSite: 'None', secure: true});
  // //   Cookies.set('_ga', 'GA1.2.1842973542.1615538128', {sameSite: 'Lax'});
  //   Cookies.set('_gid', 'GA1.2.1046676275.1615987060', {sameSite: 'Lax'});
  //   Cookies.set('amplitude_id_fef1e872c952688acd962d30aa545b9eravenhub', 'eyJkZXZpY2VJZCI6IjA3MTg4ZWUyLTZjMmEtNDAxOS05MjFkLTI5OWUyODRlODRjNVIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTYxNjA1Nzk0MzcyMSwibGFzdEV2ZW50VGltZSI6MTYxNjA1Nzk0NDU2OSwiZXZlbnRJZCI6MSwiaWRlbnRpZnlJZCI6MSwic2VxdWVuY2VOdW1iZXIiOjJ9', {sameSite: 'Lax'});
//  const [user, setUser] = useState();
//     const getUserData = async () => {
//       await getUser(localStorage.getItem('userId')).then((data) => {

//         console.log(data);

//         setUser(data?.id);
//       }); 
      
//     };  
    

//     getUserData();
const { data: user, isLoading, isSuccess } = useUser(
  localStorage.getItem('userId')
);
 
  return (
    <div className="top-header d-lg-block">
        <Head>
    <script src="https://embed.ravenhub.io/js/app.js">
    </script>
 
    </Head>
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list" >
              <li>
                
                <a>
                {/* <notification-center  appId="WLU2yLZw9d" subscriberId= "foo1" /> */}
                
                <notification-center appId="WLU2yLZw9d" subscriberId= {"attendee" + user?.id} />
                </a>
            </li>
                <li>
                  <Link href="/other/wishlist">
                    <a>
                      <AiOutlineNotification />
                      <span>Notification</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/other/wishlist">
                    <a>
                      <IoIosHeartEmpty />
                      <span>Wishlist</span>
                    </a>
                  </Link>
                </li>
                {/* <Link href={`/partner/profile-public?id=${JSON.stringify(localuser?.id)}`}> */}

                <li>
                  <Link href="/attendee/profile-account/">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/attendee/login' })}>
                    <AiOutlineLogout />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AttendeeHeaderTop;
