import { useState, useEffect } from 'react';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { BreadcrumbOne } from 'components/Breadcrumb';
import Link from 'next/link';
import { getProductsByBpId } from 'lib/query/productApi';
import { Alert, Col, Container, Row, Button } from 'react-bootstrap';
import ProductCard from 'components/BpProducts/ProductCard';
import ProdDescriptionModal from 'components/BpProducts/ProdDescriptionModal';
import AddNewProdModal from 'components/BpProducts/AddNewProdModal';
import EditProdModal from 'components/BpProducts/EditProdModal';
import DeleteProdModal from 'components/BpProducts/DeleteProdModal';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'lib/MaterialTable';
import { InfoOutlined } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from 'react-toast-notifications';

const PartnerProductsView = () => {
    const { addToast, removeToast } = useToasts();
    const [products, setProducts] = useState([]);
    // const [user, setUser] = useState(Object);
    const userId = localStorage.getItem('userId');

    const [showAddProdModal, setShowAddProdModal] = useState(false);
    const [productToShow, setProductToShow] = useState(false);
    // const [showProdDetailModal, setShowProdDetailModal] = useState(false);
    const [showEditProdModal, setShowEditProdModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (userId) loadProducts();
    }, []);

    const loadProducts = async () => {
        const productData = await getProductsByBpId(userId);
        setProducts(productData);
    };

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };

    const handleProdClick = (rowData) => {
        setProductToShow(rowData);
        // setShowProdDetailModal(true);
        setShowEditProdModal(true);
    };

    const closeAddProdModal = () => {
        setShowAddProdModal(false);
        setProductToShow(null);
    };

    const handleDelete = (rowData) => {
        setProductToShow(rowData);
        setShowDeleteModal(true);
    };

    const columns = [
        // { field: 'pid', title: 'ID' },
        {
            title: 'Image', field: 'image', render: rowData => <img src={rowData?.image}
            // style={{ width: 40, borderRadius: '50%' }} 
            />
        },
        { field: 'name', title: 'Name' },
        { field: 'description', title: 'Product Description' },
    ];

    return (
        <PartnerWrapper title="Products">
            {/* <ProdDescriptionModal
                product={productToShow}
                showProdDetailModal={showProdDetailModal}
                closeShowProdDetailModal={() => setShowProdDetailModal(false)}
            /> */}
            <EditProdModal
                product={productToShow}
                showEditProdModal={showEditProdModal}
                closeShowEditProdModal={() => setShowEditProdModal(false)}
                createToast={createToast}
                loadProducts={loadProducts}
            />
            <AddNewProdModal
                showAddProdModal={showAddProdModal}
                closeAddProdModal={() => closeAddProdModal()}
                product={productToShow}
                createToast={createToast}
                loadProducts={loadProducts}
            />
            <DeleteProdModal
                product={productToShow}
                showDeleteModal={showDeleteModal}
                closeModal={() => setShowDeleteModal(false)}
                createToast={createToast}
                loadProducts={loadProducts}
            />
            <BreadcrumbOne pageTitle="View products">
                <ol className="breadcrumb justify-content-md-end">
                    <li className="breadcrumb-item">
                        <Link href="/partner/home">
                            <a>Partner Home</a>
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
            </BreadcrumbOne>
            <Container className="my-4">
                <Row
                    className="mb-4"
                >
                    <Col md={8} lg={6}
                        style={{
                            textAlign: 'right',
                            marginLeft: 'auto'
                        }}
                    >
                        <Button
                            variant="danger"
                            type="button"
                            onClick={() => setShowAddProdModal(true)}
                        >
                            <AddIcon />{' '}Add new Product
                            </Button>
                    </Col>
                </Row>
                <Row className="mb-4">
                    {products && (
                        <MaterialTable
                            title="Business Partners"
                            columns={columns}
                            data={products}
                            hover
                            options={{
                                filtering: true,
                                actionsColumnIndex: -1,
                            }}
                            style={{
                                width:'100%'
                            }}
                            actions={[
                                {
                                    icon: EditIcon,
                                    tooltip: 'Edit Product Details',
                                    onClick: (event, rowData) => handleProdClick(rowData)
                                    // onClick: (event, rowData) => {
                                    //     router.push(`bizpartners/${rowData.id}`);
                                    // },
                                },
                                {
                                    icon: DeleteIcon,
                                    tooltip: 'Delete Product',
                                    onClick: (event, rowData) => handleDelete(rowData)
                                }
                            ]}
                        />
                    )}

                    {/*               
                    {products.map((product) => (
                        <Col
                            key={product.pid}
                            sm={6}
                            lg={4}
                            className="mb-5 d-flex align-items-stretch"
                        >
                            <a className="w-100"
                                onClick={()=>handleProdClick(product)}
                            >
                                <ProductCard product={product} />
                            </a>
                        </Col>
                    ))} */}
                </Row>
            </Container>
        </PartnerWrapper>
    )
};

export default PartnerProductsView;