import { useState, useEffect } from 'react';

const BoothProductComponent = ({booth}) => {
    const [products,setProducts] = useState([]);
    const [booth, setBooth] = useState(Object);
    const [slicedProducts,setSlicedProducts] = useState([]);
    const [productsWithKeys,setProductsWithKeys] = useState([]);

    useEffect(()=>{
        const loadData = () => {
            setBooth(booth);
            const boothProducts = booth.products;
            while (boothProducts.length) {
                
            }
            
        };
        if (booth) loadData();
    },[]);

    return (
        <h4>{booth.name}</h4>
    )
};

export default BoothProductComponent;