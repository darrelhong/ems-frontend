import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBoothProfile, getBoothsByBoothProfile } from 'lib/query/boothApi';
import ProductScrollView from 'components/Booth/boothProfileDetails/ProductScrollView';
import BoothProductComponent from 'components/Booth/boothProfileDetails/BoothProductComponent';

const BoothProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [boothProfile, setBoothProfile] = useState(Object);
    const [booths, setBooths] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const boothProfileData = await getBoothProfile(id);
            setBoothProfile(boothProfileData);
            const boothData = await getBoothsByBoothProfile(id);
            setBooths(boothData);
        }
        loadData();
    }, []);

    return (
        <div>
            <h1>aye lmao {id}</h1>
            <h6>Booth Profile description: {boothProfile?.description ?? 'lmaooo'}</h6>
            {/* {booths && booths.map((booth) => (
                <div>
                    <h6>Booth number: {booth?.boothNumber ?? 'lmaooo'}</h6>
                    {booth.products && booth.products.map((product) => (
                        <h6>Product name: {product?.name ?? 'lmaooo'}</h6>
                    ))
                    }
                </div>
            ))} */}
            <h1>ScrollView style</h1>
            {booths && (<BoothProductComponent booth={booths[0]}/>)}
            <ProductScrollView />
            {/* <ProductScrollView /> */}
        </div>
    )
}

export default BoothProfile;