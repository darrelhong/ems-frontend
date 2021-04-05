import { Modal, Button, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { updateSellerProfileDescription } from 'lib/query/boothApi';

const EditDesctiptionModal = ({
    sellerProfile,
    closeEditDescriptionModal,
    showEditDescriptionModal,
    createToast,
    setSellerProfile
}) => {
    // const [sellerProfile,setSellerProfile] = useState(Object);
    const {
        register,
        handleSubmit,
        errors,
        getValues,
    } = useForm();


    const onSubmit = async () => {
        const description = getValues('description');
        try {
            const updatedProfile = await updateSellerProfileDescription(sellerProfile.id, description);
            setSellerProfile(updatedProfile);
            createToast('Profile successfully updated!', 'success');
            closeEditDescriptionModal();
        } catch (e) {
            createToast('Error updating, please try again next time', 'error');
            closeEditDescriptionModal();
        }
    };

    const bodyComponent = () => (
        <Modal.Body>
            <Col className="form-group" md={12}>
                <label>
                    Profile Description <span className="required">*</span>
                </label>
                <textarea
                    // required
                    className="form-control"
                    name="description"
                    defaultValue={sellerProfile?.description}
                    ref={register({ required: true })}
                />
                {errors.description && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        style={{
                            marginTop: '3%'
                        }}
                    >
                        Please leave a short description
                    </div>
                )}
            </Col>
        </Modal.Body>
    );

    const secondaryButton = () => (
        <Button variant="secondary"
        onClick={closeEditDescriptionModal}
        >Cancel</Button>
    );

    const saveButton = () => (
        <Button variant="danger"
            onClick={handleSubmit(onSubmit)}
            name="submit"
            value="submit"
        >Save</Button>
    );

    return (
        <Modal
            show={showEditDescriptionModal}
            onHide={() => {
                closeEditDescriptionModal();
            }}
            centered>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Test</Modal.Title>
                </Modal.Header>
                {bodyComponent()}
                <Modal.Footer>
                    {secondaryButton()}
                    {saveButton()}
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EditDesctiptionModal;