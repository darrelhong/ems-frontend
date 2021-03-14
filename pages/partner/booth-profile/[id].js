import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getBoothProfile } from 'lib/query/boothApi';

const BoothProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [boothProfile,setBoothProfile] = useState(Object);
    
    useEffect(()=>{
        const loadData = async () => {
            const data = await getBoothProfile(1);
            setBoothProfile(data);
        }
        loadData();
    },[]);

    return (
        <div>
            <h1>aye lmao {id}</h1>
            <h6>{boothProfile?.description ?? 'lmaooo'}</h6>
        </div>
    )
}

export default BoothProfile;