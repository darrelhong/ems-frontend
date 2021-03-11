import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';


export default function UserCard({ partner }) {
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={partner.profilePic || '/assets/images/img-placeholder.jpg'}
                style={{ height: 200 }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{partner.name}</Card.Title>
                {(partner.description == null) && (<Card.Text className="line-clamp">There is no description.</Card.Text>)}
                {(partner.description != null) && <Card.Text className="line-clamp">{partner.description}</Card.Text>}
                <Card.Text className="text-default mt-auto">
                    Category: 
                    &nbsp;
                    <Badge variant="primary">
                        {partner?.businessCategory}
                    </Badge>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

UserCard.propTypes = {
    user: PropTypes.object,
};