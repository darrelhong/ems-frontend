import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UserEOCard({ partner, user, handleMarkVip, CheckVip }) {
  const [isVip, setIsVip] = useState(null);

  useEffect(() => {
    const getVip = async () => {
      await CheckVip.then((vip) => {
        setIsVip(vip);
      });
    };
    getVip();
  }, [CheckVip]);

  const addVip = async (vip) => {
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
        <Card.Title>
          <Link
            href={{
              pathname: '/partner/partner-profile',
              query: { localuser: JSON.stringify(partner.id) },
            }}
          >
            {partner.name}
          </Link>
        </Card.Title>
        {partner.description == null && (
          <Card.Text className="line-clamp">There is no description.</Card.Text>
        )}
        {partner.description != null && (
          <Card.Text className="line-clamp">{partner.description}</Card.Text>
        )}
        {partner?.businessCategory != null && (<Card.Text >
         Category: &nbsp;
          <Badge variant="primary">{partner?.businessCategory}</Badge>
        </Card.Text>) }
        {partner?.businessCategory == null && (<Card.Text >
          Category: &nbsp;
        </Card.Text>) }
        
        {isVip && (
          <Card.Text className="line-clamp">
            {' '}
            <Badge variant="info">VIP Member</Badge>
          </Card.Text>
        )}
        {!isVip && (
          <Card.Text>
            {' '}
            <button
              className="btn btn-border-fill btn-sm"
              type="button"
              onClick={() => addVip(partner)}
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
