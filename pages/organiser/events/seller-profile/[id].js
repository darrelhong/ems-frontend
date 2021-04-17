import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BreadcrumbOne } from 'components/Breadcrumb';
import OrganiserWrapper from 'components/wrapper/OrganiserWrapper';
import SellerProfilePage from 'components/Booth/sellerProfileDetails/SellerProfilePage';
import { getSellerProfile } from 'lib/query/boothApi';
import Link from 'next/link';

const SellerProfile = () => {
  const router = useRouter();
  const { id } = router.query; //seller profile ID
  const [sellerProfile, setSellerProfile] = useState(Object);

  useEffect(() => {
    const loadProfile = async () => {
      const sellerProfileData = await getSellerProfile(id);
      setSellerProfile(sellerProfileData);
    };
    loadProfile();
  }, []);

  return (
    <div>
      <OrganiserWrapper
        title={
          sellerProfile
            ? `Profile for ${sellerProfile?.event?.name}`
            : 'Booth Profile'
        }
      >
        {/* <BreadcrumbOne pageTitle="Seller Profile"> */}
        <BreadcrumbOne pageTitle="Booth Profile">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active">
              {sellerProfile
                ? `Profile for ${sellerProfile?.event?.name}`
                : 'Booth Profile'}
            </li>
          </ol>
        </BreadcrumbOne>

        {sellerProfile && (
          <SellerProfilePage
            id={id}
            sellerProfile={sellerProfile}
            setSellerProfile={setSellerProfile}
          />
        )}
      </OrganiserWrapper>
    </div>
  );
};

export default SellerProfile;
