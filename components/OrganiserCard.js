import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { Card } from 'react-bootstrap';


export default function OrganiserCard({ organiser }) {
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={organiser.profilePic || '/assets/images/img-placeholder.jpg'}
                style={{ height: 200 }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{organiser.name}</Card.Title>
                <Card.Text className="line-clamp">{organiser.description}</Card.Text>
                {/* <Card.Text className="text-default mt-auto">
                    Category: 
                    &nbsp;
                    <Badge variant="primary">
                        {partner?.businessCategory}
                    </Badge>
                </Card.Text> */}
            </Card.Body>
        </Card>
    );
}

OrganiserCard.propTypes = {
    user: PropTypes.object,
};