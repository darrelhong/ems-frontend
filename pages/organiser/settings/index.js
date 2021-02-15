import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import { FaCloudDownloadAlt, FaRegEdit } from 'react-icons/fa';
import {
  IoIosList,
  IoIosClipboard,
  IoIosDownload,
  IoIosCash,
  IoIosCreate,
  IoIosPerson,
} from 'react-icons/io';

import { BreadcrumbOne } from '../../../components/Breadcrumb';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import UpdateProfileForm from '../../../components/settings/UpdateProfileFormNew';

export default function OrganiserSettings() {
  return (
    <OrganiserWrapper title="Organiser Settings">
      <BreadcrumbOne pageTitle="My Account">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/organiser/home">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Settings</li>
        </ol>
      </BreadcrumbOne>

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <Container>
          <Tab.Container defaultActiveKey="updateProfile">
            <Row>
              <Col lg={3} md={4}>
                <Nav
                  variant="pills"
                  className="flex-column my-account-content__navigation space-mb--r60"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="updateProfile">
                      <IoIosPerson /> Update Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="dashboard">
                      <IoIosList /> Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders">
                      <IoIosClipboard /> Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="download">
                      <IoIosDownload /> Download
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment">
                      <IoIosCash /> Payment
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="address">
                      <IoIosCreate /> Address
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9} md={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="updateProfile">
                    <UpdateProfileForm />
                  </Tab.Pane>
                  <Tab.Pane eventKey="dashboard">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Dashboard</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="welcome">
                          <p>
                            Hello, <strong>John Doe</strong> (If Not{' '}
                            <strong>John !</strong>{' '}
                            <Link href="/other/login" as="/other/login">
                              <a className="logout">Logout</a>
                            </Link>
                            )
                          </p>
                        </div>
                        <p>
                          From your account dashboard. you can easily check
                          &amp; view your recent orders, manage your shipping
                          and billing addresses and edit your password and
                          account details.
                        </p>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="orders">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Orders</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="myaccount-table table-responsive text-center">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Aug 22, 2020</td>
                                <td>Pending</td>
                                <td>$3000</td>
                                <td>
                                  <a href="#" className="check-btn sqr-btn ">
                                    View
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>July 22, 2020</td>
                                <td>Approved</td>
                                <td>$200</td>
                                <td>
                                  <a href="#" className="check-btn sqr-btn ">
                                    View
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>June 12, 2020</td>
                                <td>On Hold</td>
                                <td>$990</td>
                                <td>
                                  <a href="#" className="check-btn sqr-btn ">
                                    View
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="download">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Downloads</h3>
                      </Card.Header>
                      <Card.Body>
                        <div className="myaccount-table table-responsive text-center">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Date</th>
                                <th>Expire</th>
                                <th>Download</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Haven - Free Real Estate PSD Template</td>
                                <td>Aug 22, 2020</td>
                                <td>Yes</td>
                                <td>
                                  <a href="#" className="check-btn sqr-btn ">
                                    <FaCloudDownloadAlt /> Download File
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>HasTech - Portfolio Business Template</td>
                                <td>Sep 12, 2020</td>
                                <td>Never</td>
                                <td>
                                  <a href="#" className="check-btn sqr-btn ">
                                    <FaCloudDownloadAlt /> Download File
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="payment">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Payment Method</h3>
                      </Card.Header>
                      <Card.Body>
                        <p className="saved-message">
                          {"You Can't Saved Your Payment Method yet."}
                        </p>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="address">
                    <Card className="my-account-content__content">
                      <Card.Header>
                        <h3>Billing Address</h3>
                      </Card.Header>
                      <Card.Body>
                        <address>
                          <p>
                            <strong>John Doe</strong>
                          </p>
                          <p>
                            1355 Market St, Suite 900 <br />
                            San Francisco, CA 94103
                          </p>
                          <p>Mobile: (123) 456-7890</p>
                        </address>
                        <a href="#" className="check-btn sqr-btn ">
                          <FaRegEdit /> Edit Address
                        </a>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </OrganiserWrapper>
    // <ChakraWrapper>
    //   <SettingsWrapper>
    //     <UpdateProfileForm />
    //   </SettingsWrapper>
    // </ChakraWrapper>
  );
}
