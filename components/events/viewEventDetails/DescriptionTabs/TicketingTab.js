import {
    IoMdCalendar,
    IoMdRestaurant,
    IoMdCash,
    IoMdTrophy,
  } from 'react-icons/io';
  
const TicketingTab = ({
    event,
    prettySaleStartDate,
    prettySalesEndDate,
    setShowModal
}
) => {
    return (
        <div className="product-content__sort-info space-mb--20"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}
        >
            { event && event.sellingTicket ? (
                <div>
                    <ul>
                        <li>
                           <h6><IoMdCash /> Ticket Price:{' '}{event.ticketPrice ? '$' + event.ticketPrice : 'Not set yet'}</h6> 
                        </li>
                        <li>
                           <h6> <IoMdRestaurant />
                            {event.ticketCapacity
                                ? `Tickets Sold: ${event?.ticketTransactions?.length ?? 0} / ${event.ticketCapacity}`
                                : 'Ticket Capacity not set yet!'}</h6>
                        </li>
                        <li>
                        <h6> <IoMdCalendar /> Ticket Sale Start Date:{' '} {prettySaleStartDate ? prettySaleStartDate : 'Not set yet'} </h6>
                            {/* <IoMdLocate />{format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')} */}
                        </li>
                        <li>
                        <h6> <IoMdCalendar /> Ticket Sale End Date:{' '} {prettySalesEndDate ? prettySalesEndDate : 'Not set yet'} </h6>
                        </li>
                    </ul>
                </div>
            ) : (
                <ul>
                    <li>
                       
    <h6> <IoMdCash />No Ticket Sales for this event!</h6>
  </li>
                </ul>
            )}
            <ul>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    style={{ textAlign: 'right' }}
                >
                    <i className="icon-basket-loaded" /> {event.sellingTicket ? 'Manage ticketing details' : 'Activate Ticket Sales'}
                </button>
            </ul>
        </div>
    )
};

export default TicketingTab;