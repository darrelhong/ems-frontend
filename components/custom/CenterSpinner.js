import { Spinner } from 'react-bootstrap';

export default function CenterSpinner() {
  return (
    <div className="d-flex justify-content-center py-5 my-5">
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
