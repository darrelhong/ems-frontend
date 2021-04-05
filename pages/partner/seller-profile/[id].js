import { useRouter } from 'next/router';

import SellerProfilePage from 'components/Booth/sellerProfileDetails/SellerProfilePage';

const SellerProfile = () => {
    const router = useRouter();
    const { id } = router.query; //seller profile ID

    return (
        <SellerProfilePage 
        id={id}
        />
    )
}

export default SellerProfile;