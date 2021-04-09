import { getSellerProfilesFromEvent } from 'lib/query/eventApi';

export function getBoothTotalFromSellerProfiles(sellerProfiles) {
    const arrayOfBoothArrays = sellerProfiles.map((sellerProfile) => sellerProfile.booths);
    return arrayOfBoothArrays.reduce((x,y) => x + y.length, 0);
};

export async function getBoothTotalFromEvent(eventId) {
    const sellerProfiles = await getSellerProfilesFromEvent(eventId);
    return getBoothTotalFromSellerProfiles(sellerProfiles);
}

