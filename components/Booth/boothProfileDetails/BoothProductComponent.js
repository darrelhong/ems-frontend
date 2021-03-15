import { useState, useEffect } from 'react';

const BoothProductComponent = ({booth}) => {
    const [products,setProducts] = useState([]);
    const [boothData, setBooth] = useState(Object);
    // const [slicedProducts,setSlicedProducts] = useState([[]]);
    // const [productsWithKeys,setProductsWithKeys] = useState([]);
    const [paginatedProducts, setPaginatedProducts] = useState([]);

    useEffect(()=>{
        const loadData = () => {
            setBooth(booth);
            const boothProducts = booth.products;
            let slicedProducts = [[]];
            let productsWithKeys = [];
            // let productsWithKeys = [1,2,3,4,5,6,7,8,9];
            while (boothProducts.length) {
                slicedProducts.push(boothProducts.splice(0,5));
            }
            let counter = 0;
            for (const productSet of slicedProducts) {
                const input = {
                    "key" : booth.boothNumber + ' ' + counter,
                    "products" : productSet
                };
                //idk why first array is always empty 
                if (counter!=0) productsWithKeys.push(input); 
                counter+=1;
            }
            setPaginatedProducts(productsWithKeys);
        };
        if (booth) loadData();
    },[booth]);

    return (
        <h4>Booth {booth?.boothNumber}</h4>
    )
};

export default BoothProductComponent;