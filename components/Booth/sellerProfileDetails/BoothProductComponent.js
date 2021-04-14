import { useState, useEffect } from 'react';
import ProductScrollView from './ProductScrollView';
import { Container, Row, Button } from 'react-bootstrap';
import { IoIosAddCircleOutline } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import AddProductModal from './AddProductModal';
import AddIcon from '@material-ui/icons/Add';
import ProductSlider from './newBoothSlider/ProductSlider';
import { getProductsByBoothId } from 'lib/query/productApi';
import ProductModal from 'components/Booth/sellerProfileDetails/ProductModal';


const BoothProductComponent = ({
  booth,
  createToast,
  sellerProfile,
  setSellerProfile,
  isPartner,
}) => {
  const [products, setProducts] = useState([]);
  const [boothData, setBooth] = useState();
  // const [slicedProducts,setSlicedProducts] = useState([[]]);
  // const [productsWithKeys,setProductsWithKeys] = useState([]);
//   const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productToShow, setProductToShow] = useState();

  useEffect(() => {
    setBooth(booth);
    setProducts(booth?.products);
    console.log(booth);
  }, []);

  useEffect(() => {
    //if (boothData) setProductFunction(boothData); //this is for the paginated shit
    if (boothData) setSliderProducts(boothData);
  }, [boothData]);

  const setSliderProducts = async (booth) => {
    let fetchedProducts = await getProductsByBoothId(booth?.id);
    setProducts(fetchedProducts);
  };

  const showProductModal = (status) => {
    console.log('modal status');
    console.log(status);
    setShowAddProductModal(true);
  };

  //THIS IS FOR THE OLD PAGINATED STYLE
//   const setProductFunction = (booth) => {
//     const boothProducts = booth?.products;
//     setProducts(boothProducts);
//     setBooth(booth);
//     let slicedProducts = [[]];
//     let productsWithKeys = [];
//     // let productsWithKeys = [1,2,3,4,5,6,7,8,9];
//     while (boothProducts?.length) {
//       slicedProducts.push(boothProducts.splice(0, 5));
//     }
//     let counter = 0;
//     for (const productSet of slicedProducts) {
//       const input = {
//         key: booth.boothNumber + '' + counter,
//         products: productSet,
//       };
//       //idk why first array is always empty
//       if (counter != 0) productsWithKeys.push(input);
//       counter += 1;
//     }
//     setPaginatedProducts(productsWithKeys);
//   };

  return (
    <Container>
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
          boothProducts={products}
          setBoothProducts={setProducts}
        />
      )}
      {booth && (
        <ProductModal
          product={productToShow}
          productModalShow={productToShow != null}
          closeProductModal={() => {
            // setProductModalShow(false);
            setProductToShow(null);
          }}
          boothId={booth?.id}
          setBooth={setBooth}
          createToast={createToast}
          isPartner={isPartner}
        />
      )}
      <Row
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* <h4>Booth {booth?.boothNumber}</h4> */}
        <br></br>
        {/* {isPartner && (
          <IconButton
            color="secondary"
            onClick={() => setShowAddProductModal(true)}
          >
            <IoIosAddCircleOutline style={{ marginBottom: 10 }} />
          </IconButton>
        )} */}
        {/* {isPartner && (
                    <Button
                    variant="danger"
                    type="button"
                        onClick={() => setShowAddProductModal(true)}
                >
                    <AddIcon />{' '}Add another Product
                    </Button>
                )} */}
        {/* {
                    paginatedProducts[0] && (
                        <ProductScrollView
                            boothId={booth.id}
                            setBooth={setBooth}
                            paginatedProducts={paginatedProducts}
                            createToast={createToast}
                            isPartner={isPartner}
                        />
                    )
                } */}
      </Row>

      <ProductSlider
        products={products}
        setProductToShow={setProductToShow}
        boothNumber={booth?.boothNumber}
        boothDesc={booth?.description}
        showProductModal={showProductModal}
      />

      {/* {!paginatedProducts[0] && (
                <div
                className="product-description-tab__details"
                style={{ textAlign: 'center' }}
                >
                    No products added yet!
                </div>
            )} */}
    </Container>
  );
};

export default BoothProductComponent;
