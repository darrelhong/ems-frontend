import {
    IoMdRestaurant,
    IoMdTrophy,
} from 'react-icons/io';
import { Row } from "react-bootstrap";
import SellerProfileCard from './SellerProfileCard';
import Link from 'next/link';

const BusinessPartnerTab = ({
    event,
    newSellerApplications,
    sellerProfiles
}) => {

    const getBoothTotal = () => {
        const arrayOfBoothArrays = sellerProfiles.map((sellerProfile) => sellerProfile.booths);
        return arrayOfBoothArrays.reduce((x, y) => x + y.length, 0);
    }

    const renderSummarizedInfo = () => (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                {newSellerApplications.length != 0 ? (
                    <ul>
                        <li
                            style={{
                                color: 'red'
                            }}>
                            <IoMdTrophy />
                            {newSellerApplications.length} {' '}new applications
              </li>
                    </ul>
                )
                    : (
                        <ul>
                            <li>
                                <IoMdTrophy />
                No new applications
              </li>
                        </ul>
                    )}
                <ul>
                    <Link href={`/organiser/events/applications?eid=${event.eid}`} >
                        <button
                            // onClick={() => console.log('hello')}
                            className="btn btn-fill-out btn-addtocart space-ml--10"
                            style={{ textAlign: 'right' }}
                        >
                            <i className="icon-basket-loaded" /> Manage Event Booths
          </button>
                    </Link>
                </ul>
            </div>
            <ul>
                <li>
                    <IoMdTrophy />
                    {/* STILL WRONG */}
            Confirmed booths for your event:{' '}
                    {/* {event.sellerApplications?.length ?? 0} / {event.boothCapacity} */}
                    {getBoothTotal() ?? 0} / {event.boothCapacity} (Set Capacity)
                {/* {event.eventBoothTransactions?.length ?? 0} / {event.boothCapacity} */}
                </li>
            </ul>
        </div>
    );

    const renderConfirmedPartners = () => {
        return (
            <div className="shop-products"
                style={{
                    marginTop: '10%'
                }}
            >
                <Row className="list">
                    {sellerProfiles.length != 0 ? (
                        sellerProfiles.map((sellerProfile) => {
                            return (
                                <SellerProfileCard
                                    sellerProfile={sellerProfile}
                                />
                            );
                        })
                    ) : (
                        <div
                            className="product-description-tab__details"
                            style={{ textAlign: 'center' }}
                        >
                            No Partners yet to display!
                        </div>
                    )
                    }
                </Row>
            </div>
        )
    };

    if (event.boothCapacity == 0) {
        //booth capacity not set or left at 0, just say no booth capacity was set, zero button
        return (
            <div
                className="product-description-tab__details"
                style={{ textAlign: 'center' }}
            >
                Booth capacity not set yet !
            </div>
        );
    } else if (event.eventStatus == 'DRAFT') {
        //this case we just show the booth capacity set, no transaction count or button
        return (
            <li>
                <IoMdRestaurant />{' '}
                {event.ticketCapacity
                    ? `Tickets Capacity: ${event.ticketCapacity}`
                    : 'Ticket Capacity not set yet!'}
            </li>
        );
    };


    //render the normal page with count, capacity and button
    return (
        <div
            className="product-content__sort-info space-mb--20">
            {renderSummarizedInfo()}
            {renderConfirmedPartners()}
        </div>
    );
};

export default BusinessPartnerTab;