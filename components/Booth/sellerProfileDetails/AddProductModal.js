import { Modal, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import {
  getProductsByBpId,
  addProduct,
  getProductsByBoothId,
  removeBoothProduct,
} from 'lib/query/productApi';
import MaterialTable from '../../../lib/MaterialTable';
import {
  CheckCircleOutline,
  RemoveCircleOutline,
  InfoOutlined,
} from '@material-ui/icons';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const AddProductModal = ({
  sellerProfile,
  setSellerProfile,
  createToast,
  closeAddProductModal,
  showAddProductModal,
  booth,
  setBooth,
  boothProducts,
  setBoothProducts,
}) => {
  const [bpProducts, setBpProducts] = useState([]);
  // const [boothProducts, setBoothProducts] = useState([]);

  useEffect(() => {
    if (booth && sellerProfile.businessPartner != undefined) {
  
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
       console.log(pid);
      const updatedBooth = await addProduct(pid, booth.id);
      setBooth(updatedBooth);
      createToast('Product Added!', 'success');
    
    } catch (e) {
      createToast('Error adding product', 'error');
    }
  };
  const handleDeleteProduct = async (pid) => {
    console.log(pid);
    try {
      const updatedBoothData = await removeBoothProduct(pid, booth.id);
      setBooth(updatedBoothData);
      createToast('Product successfully removed!', 'success');
  
    } catch (e) {
      createToast('Could not be removed, please try again later!', 'error');
    }
  };

 


  

  const checkAlreadyAdded = (product) => {
    const boothProductIds = boothProducts.map((product) => product.pid);
    return boothProductIds.indexOf(product.pid) < 0;
  };

  const columns = [
    {
      field: 'image',
      title: 'Product',
      filtering: false,
      search: false,
      render: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
          }}
        >
          {row.image != null && (
            <img
              style={{ maxHeight: '80px', maxWidth: '130px' }}
              alt="my image"
              src={row.image}
            />
          )}
          {row.image == null && (
            <img
              style={{ maxHeight: '80px', maxWidth: '130px' }}
              alt="my image"
              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
            />
          )}
        </div>
      ),
    },
    { field: 'name', title: 'Name' },
    { field: 'description', title: 'Description' },
  ];
  const bodyComponent = () => (
    //   <Modal.Body>
    //     {/* {booth?.products && booth?.products.map((product) => ( */}
    //     {bpProducts &&
    //       bpProducts.map((product) => (
    //         // <Row>
    //         <Row key={product.pid} style={{ marginBottom: '5px' }}>
    //           <div className="product-list">
    //             <div className="product-list__image">
    //               <img
    //                 src={
    //                   product?.image ??
    //                   'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'
    //                 }
    //                 alt="event_image"
    //               />
    //             </div>

    //             <div className="product-list__info">
    //               <h6 className="product-title">
    //                 {/* <Link href={`/partner/seller-profile/${sellerProfile.id}`}> */}
    //                 {/* <a>{product?.name}</a> */}
    //                 {product?.name}
    //                 {/* </Link> */}
    //               </h6>

    //               <div className="product-description">
    //                 {product.description}
    //               </div>
    //             </div>
    //             <div style={{display:'flex',alignItems:'center'}}>
    //               {checkAlreadyAdded(product) ? (
    //                 <button
    //                   className="btn btn-fill-out btn-sm"
    //                   onClick={() => handleAddProduct(product.pid)}
    //                 >
    //                   Add
    //                 </button>
    //               ) : (
    //                  <button
    //                   className="btn btn-fill-out btn-sm"
    //                 onClick={() => handleAddProduct(product.pid)}
    //                 disabled
    //                 >
    //                   Added
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //         </Row>
    //       ))}
    //   </Modal.Body>

    <Modal.Body>
      <Row>
        <Col>
          <MaterialTable
            title="Product Catalogue"
            columns={columns}
            data={bpProducts}
            options={{
              filtering: true,
              actionsColumnIndex: -1,
            }}
            actions={[
              (rowData) => {
                return checkAlreadyAdded(rowData)
                  ? {
                      icon: AddCircleOutlineIcon,
                      disable: false,
                      tooltip: 'Add product to booth',
                      onClick: () => {
                        handleAddProduct(rowData.pid);
                      },
                    }
                  : {
                      icon: RemoveCircleOutline,
                      disable: false,
                      tooltip: 'Remove product from booth',
                      onClick: () => {
                        handleDeleteProduct(rowData.pid);
                      },
                    };
              },
            ]}
          />
        </Col>
      </Row>
    </Modal.Body>
  );

  return (
    <Modal
      show={showAddProductModal}
      onHide={closeAddProductModal}
      centered
      scrollable
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Adding Products to booth {booth?.boothNumber}{' '}
        </Modal.Title>
      </Modal.Header>
      {bodyComponent()}
    </Modal>
  );
};

export default AddProductModal;
