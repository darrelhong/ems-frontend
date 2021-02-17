import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { logout } from '../../lib/auth';

const AdminHeaderTop = () => {
  return (
    <div className="top-header d-lg-block">
      <Container>
        <Row className="align-items-end">
          <Col>
            <div className="text-right">
              <ul className="header-list">
                <li>
                  <a onClick={() => logout({ redirectTo: '/admin/login' })}>
                    <AiOutlineUser />
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

export default AdminHeaderTop;
