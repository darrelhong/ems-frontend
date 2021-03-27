import { useState, useEffect } from 'react';
import ProductScrollView from './ProductScrollView';
import { Container, Row, Button } from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import AddProductModal from './AddProductModal';

const BoothProductComponent = ({ booth, createToast, sellerProfile, setSellerProfile, isPartner }) => {
    const [products, setProducts] = useState([]);
    const [boothData, setBooth] = useState();
    // const [slicedProducts,setSlicedProducts] = useState([[]]);
    // const [productsWithKeys,setProductsWithKeys] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
        setBooth(booth);
    }, []);

    useEffect(() => {
        if (boothData) setProductFunction(boothData);
    }, [boothData])

    const setProductFunction = (booth) => {
        const boothProducts = booth?.products;
        let slicedProducts = [[]];
        let productsWithKeys = [];
        // let productsWithKeys = [1,2,3,4,5,6,7,8,9];
        while (boothProducts?.length) {
            slicedProducts.push(boothProducts.splice(0, 5));
        }
        let counter = 0;
        for (const productSet of slicedProducts) {
            const input = {
                "key": booth.boothNumber + '' + counter,
                "products": productSet
            };
            //idk why first array is always empty 
            if (counter != 0) productsWithKeys.push(input);
            counter += 1;
        }
        setPaginatedProducts(productsWithKeys);
    };

    return (
        <Container
            style={{
                marginTop: '10%'
            }}
        >
            {booth && (
                <AddProductModal
                    sellerProfile={sellerProfile}
                    setSellerProfile={setSellerProfile}
                    createToast={createToast}
                    closeAddProductModal={() => setShowAddProductModal(false)}
                    showAddProductModal={showAddProductModal}
                    booth={boothData}
                    // booth={booth}
                    setBooth={setBooth}
                />
            )}
            <Row
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <h4>Booth {booth?.boothNumber}</h4>
                {/* <IconButton
                    color="secondary"
                    onClick={() => setShowAddProductModal(true)}
                >
                    <IoIosAddCircleOutline
                        style={{ marginBottom: 10 }}
                    />
                </IconButton> */}
                {isPartner && (
                    <Button
                        variant="danger"
                        onClick={() => setShowAddProductModal(true)}
                    >
                        Add another product to booth {booth?.boothNumber}
                    </Button>
                )}
                {
                    paginatedProducts && (
                        <ProductScrollView
                            boothId={booth.id}
                            setBooth={setBooth}
                            paginatedProducts={paginatedProducts}
                            createToast={createToast}
                            isPartner={isPartner}
                        />
                    )
                }
            </Row>
        </Container>
    )
};

export default BoothProductComponent;