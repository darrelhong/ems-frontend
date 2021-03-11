import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

export default function UserEOCard({ partner, user, handleMarkVip }) {
  const checkVIP = () => {
    var i;
    var check = false;
    for (i = 0; i < user.vipList.length; i++) {
      if (user.vipList[i].id === partner.id) {
        check = true;
        break;
      }
    }
    return check;
  };

  const addVip = async (vip) => {
    console.log('call mark vip');
    await handleMarkVip(vip);
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={partner.profilePic || '/assets/images/img-placeholder.jpg'}
        style={{ height: 200 }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{partner.name}</Card.Title>
        {partner.description == null && (
          <Card.Text className="line-clamp">There is no description.</Card.Text>
        )}
        {partner.description != null && (
          <Card.Text className="line-clamp">{partner.description}</Card.Text>
        )}

        <Card.Text className="text-default mt-auto">
          Category: &nbsp;
          <Badge variant="primary">{partner?.businessCategory}</Badge>
        </Card.Text>
        {checkVIP() && (
          <Card.Text className="line-clamp">
            {' '}
            <Badge variant="info">VIP Member</Badge>
          </Card.Text>
        )}
        {!checkVIP() && (
          <Card.Text>
            {' '}
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              //   onClick={() => addVip(partner?.id)}
            >
              {' '}
              Add VIP{' '}
            </button>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

UserEOCard.propTypes = {
  user: PropTypes.object,
};
