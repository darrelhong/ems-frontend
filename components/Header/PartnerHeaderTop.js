import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from 'react-icons/ai';
import { IoIosHeartEmpty } from 'react-icons/io';

import { logout } from '../../lib/auth';
import  useUser  from '../../lib/query/useUser';
import { useState, useEffect, React } from 'react';
const PartnerHeaderTop = () => {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   const getUserData = async () => {
  //     await getUser(localStorage.getItem('userId')).then((data) => {

  //       console.log(data);

  //       setUser(data.id);
  //     });
  //   };
  //   getUserData();
  // }, []);
  const { data: user, isLoading, isSuccess } = useUser(
    localStorage.getItem('userId')
  );
  return (
    <>
     <Head>
    <script src="https://embed.ravenhub.io/js/app.js"></script>
    </Head>
    <div className="top-header d-lg-block">
       
      <Container>
        <Row>
          <Col>
            <div className="text-right">
              <ul className="header-list" >
              <li>
                  <p style={{fontWeight: "700", marginRight: "20px"}}>HI {user?.name.toUpperCase()}</p>
                </li>
                <li>
                
                    <a >
                    <notification-center  appId="WLU2yLZw9d" subscriberId= {"partner" + user?.id} />
                    </a>
                  
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
                 
                  {/* <Link href={{ pathname: "/partner/profile-public", query: { localuser: JSON.stringify(localuser) } }}> */}
                  <Link
                    href={{
                      pathname: '/partner/partner-profile',
                      query: { localuser: JSON.stringify(user?.id) },
                    }}
                  >
                    <a>
                      <AiOutlineUser />
                      <span>Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/partner/profile-account">
                    <a>
                      <AiOutlineSetting />
                      <span>Settings</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a onClick={() => logout({ redirectTo: '/partner/login' })}>
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
    </>
  );
};

export default PartnerHeaderTop;
