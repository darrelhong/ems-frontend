import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import {
  IoIosList,
  IoIosClipboard,
  IoIosDownload,
  IoIosCash,
  IoIosCreate,
  IoIosPerson,
} from 'react-icons/io';

const FormStepper = () => {
  return (
    <Col lg={3} md={4}>
      <Nav
        variant="pills"
        className="flex-column my-account-content__navigation space-mb--r60"
      >
        <Nav.Item>
          <Nav.Link eventKey="accountDetails">
            <IoIosPerson /> Account Details
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
  );
};
export default FormStepper;
