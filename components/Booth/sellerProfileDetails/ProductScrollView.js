import { useState, useEffect } from 'react';
import ProductModal from 'components/Booth/sellerProfileDetails/ProductModal';

const ProductScrollView = ({ paginatedProducts, boothId, setBooth, createToast, isPartner }) => {
    // const placeholderImage = "https://static.packt-cdn.com/products/9781849514804/graphics/4804_03_46.jpg";
    const placeholderImage = "https://us.123rf.com/450wm/daksun/daksun1804/daksun180400006/99999388-plain-grey-textured-painted-wall-empty-grey-painted-wall-with-texture.jpg?ver=6"
    const [nextId, setNextId] = useState(0);
    const [backId, setBackId] = useState(0);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [productToShow, setProductToShow] = useState();
    const [productModalShow,setProductModalShow] = useState(false);

    // takes in data like
    // [
    //     {
    //      key(to use for href): someId
    //      maybe both forward and back key?
    //      products: [products 1 - 5]
    //     }
    //     {
    //      key(to use for href): someId
    //      products: [products 6 - 10]
    //     }

    // ]
    useEffect(() => {
        const loadData = () => {
            const currentId = parseInt(paginatedProducts[0]?.key);
            setNextId(currentId + 1);
            setFirstId(currentId);
            setCurrentId(currentId);
            const lastId = parseInt(paginatedProducts[paginatedProducts.length - 1]?.key);
            setBackId(lastId);
            setLastId(lastId);
            // console.log('next is ' +(currentId+1));
            // console.log('current is ' +currentId);
            // console.log('back is ' +lastId);
        };
        if (paginatedProducts) loadData();
    }, [paginatedProducts]);

    const handleBack = () => {
        let current = currentId;
        let back = backId;
        // console.log('curren is ' +current);
        // console.log('back is ' +back);

        if (currentId == firstId) {
            setNextId(current);
            setBackId(lastId - 1);
            setCurrentId(lastId);
        } else {
            setCurrentId(back);
            setNextId(current);
            //if now we go back to first means the back is last one now
            (back == firstId) ? setBackId(lastId) : setBackId(back - 1);
        }
    };

    const handleNext = () => {
        let current = currentId;
        let next = nextId;
        // console.log('curren is ' +current);
        // console.log('next is ' +next);

        if (currentId == lastId) {
            setBackId(current);
            setNextId(firstId + 1);
            setCurrentId(firstId);
        } else {
            setCurrentId(next);
            setBackId(current);
            //if now we go forward to last means the next is first one now
            (next == lastId) ? setNextId(firstId) : setNextId(next + 1);
        }
    };

    const renderAppendedProducts = (products) => {
        while (products.length < 5) {
            products.push({ "image": placeholderImage })
        };

        return products.map((product) => (
            <div className="item">
                {imageComponent(product)}
            </div>
        ))
    };

    const imageComponent = (product) => (
        <img
            src={product.image}
            // height='150'
            // onClick={() => console.log('image clicked')}
            onClick={() => {
                if (product.image != placeholderImage) {
                    setProductToShow(product);
                    setProductModalShow(true);
                }
            }}
            alt="Product Image" />
    );

    return (
        <div className="wrapper">
            <ProductModal
                product={productToShow}
                productModalShow={productModalShow}
                closeProductModal={() => {
                    setProductModalShow(false);
                    // setProductToShow(null);
                }}
                boothId={boothId}
                setBooth={setBooth}
                createToast={createToast}
                isPartner={isPartner}
            />
            {paginatedProducts && paginatedProducts.length > 1 ? (
                paginatedProducts.map((section, index) => (
                    <section id={section?.key}>
                        <a
                            // href={index == 0 ? `#${paginatedProducts[paginatedProducts.length - 1]?.key}` : `#${paginatedProducts[index + 1]?.key}`}
                            href={`#${backId}`}
                            onClick={handleBack}
                        // stye={{
                        //     display: 'block',
                        //     paddingTop: '90%',
                        //     marginTop: '-90%'
                        // }}
                        >‹</a>
                        {section.products && section.products.length == 5 ? (
                            section.products.map((product) => (
                                <div className="item">
                                    {imageComponent(product)}
                                </div>
                            ))
                        ) : (renderAppendedProducts(section.products))}
                        <a
                            // href={`#${paginatedProducts[index + 1]?.key}`}
                            href={`#${nextId}`}
                            onClick={handleNext}
                        // stye={{
                        //     display:'block',
                        //     paddingTop: '90%',
                        //     marginTop: '-90%'
                        // }}
                        >›</a>
                    </section>
                ))
            ) : (
                paginatedProducts.map((section, index) => (
                    <section id={section?.key}>
                        {section.products && section.products.length == 5 ? (
                            section.products.map((product) => (
                                <div className="item">
                                    {imageComponent(product)}

                                </div>
                            ))
                        ) : (renderAppendedProducts(section.products))}
                    </section>
                ))
            )}

        </div>
    );

    return (
        <div className="wrapper">
            <section id="section1">
                <a href="#section3">‹</a>
                <div className="item">
                    <img
                        src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <a href="#section2">›</a>
            </section>
            <section id="section2">
                <a href="#section1">‹</a>
                <div className="item">
                    <img src="data:image/jpeg;base64,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" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="data:image/jpeg;base64,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" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="data:image/jpeg;base64,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" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="data:image/jpeg;base64,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" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="data:image/jpeg;base64,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" alt="Describe Image" />
                </div>
                <a href="#section3">›</a>
            </section>

            <section id="section3">
                <a href="#section2">‹</a>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <div className="item">
                    <img src="https://timesofindia.indiatimes.com/photo/67586673.cms" alt="Describe Image" />
                </div>
                <a href="#section1">›</a>
            </section>
        </div>
    );
};

export default ProductScrollView;