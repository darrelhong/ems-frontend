import { Modal, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { getProductsByBpId, addProduct, getProductsByBoothId } from 'lib/query/productApi';

const AddProductModal = ({
    sellerProfile,
    setSellerProfile,
    createToast,
    closeAddProductModal,
    showAddProductModal,
    booth,
    setBooth,
    boothProducts,
    setBoothProducts
}) => {
    const [bpProducts, setBpProducts] = useState([]);
    // const [boothProducts, setBoothProducts] = useState([]);

    useEffect(() => {
        if (booth) {
            loadBpProducts();
            // loadBoothProducts();
        }
    }, [booth]);

    const loadBpProducts = async () => {
        const products = await getProductsByBpId(sellerProfile.businessPartner.id);
        setBpProducts(products);
    };

    // const loadBoothProducts = async () => {
    //     const products = await getProductsByBoothId(booth?.id);
    //     setBoothProducts(products);
    // }

    const handleAddProduct = async (pid) => {
        try {
            const updatedBooth = await addProduct(pid, booth.id);
            setBooth(updatedBooth);
            createToast('Product Added!', 'success');
        } catch (e) {
            createToast('Error adding product', 'error');
        }
    }

    const checkAlreadyAdded = (product) => {
        const boothProductIds = boothProducts.map((product) => product.pid);
        return boothProductIds.indexOf(product.pid) < 0;
    }

    const bodyComponent = () => (
        <Modal.Body>
            {/* {booth?.products && booth?.products.map((product) => ( */}
            {bpProducts && bpProducts.map((product) => (
                <Col
                    key={product.pid}
                    className="space-mb--50"
                >
                    <div className="product-list">
                        <div className="product-list__image">
                            <img src={product?.image ?? 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'} alt="event_image" />
                        </div>

                        <div className="product-list__info">
                            <h6 className="product-title">
                                {/* <Link href={`/partner/seller-profile/${sellerProfile.id}`}> */}
                                {/* <a>{product?.name}</a> */}
                                {product?.name}
                                {/* </Link> */}
                            </h6>

                            <div className="product-description">{product.description}</div>
                        </div>
                        {checkAlreadyAdded(product) ? (
                            <Button
                                variant="danger"
                                onClick={() => handleAddProduct(product.pid)}
                                style={{
                                    height: '10%',
                                }}
                            >
                                Add
                            </Button>
                        ) : (
                            <Button
                                variant="danger"
                                onClick={() => handleAddProduct(product.pid)}
                                style={{
                                    height: '10%',
                                }}
                                disabled
                            >
                                Added
                            </Button>
                        )}
                    </div>
                </Col>
            ))}

        </Modal.Body>
    );

    return (
        <Modal
            show={showAddProductModal}
            onHide={closeAddProductModal}
            centered
            scrollable
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>Adding Products to booth {booth?.boothNumber} </Modal.Title>
            </Modal.Header>
            {bodyComponent()}
        </Modal>
    );
};

export default AddProductModal;