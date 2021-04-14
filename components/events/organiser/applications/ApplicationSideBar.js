import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const ApplicationSideBar = ({ setFilterValue, filterValue, events, setEventFilter }) => {
    const checkActive = (value) => {
        return value == filterValue;
    }

    const appStatusEnum = ["PENDING", "APPROVED", "REJECTED", "CANCELLED", "CONFIRMED"]

    const handleChange = (e) => {
        if (e.target.value == 'all') {
          setEventFilter("all");
        } else {
          setEventFilter(e.target.value);
        }
      };
    
    return (
        <>
            <div className="sidebar">
                <div className="widget">
                    <h5 className="widget__title">Status</h5>
                    <ButtonGroup
                        color="primary"
                        aria-label=" vertical outlined primary button group"
                        orientation="vertical"
                    >
                        {appStatusEnum.map((status) => {
                            return (
                                <Button
                                    variant={`${checkActive(status) ? 'contained' : 'outlined'}`}
                                    onClick={() => setFilterValue(status)}
                                    color="secondary">
                                    {status}
                                </Button>
                            )
                        }
                        )
                        }
                    </ButtonGroup>
                </div>
                <br></br>
                <br></br>

            </div>
            
            <div className="sidebar">
            <h5 className="widget__title">Filter By Events</h5>
                <select
                    className="custom-select"
                    onChange={handleChange}
                >
                    <option value="all">All Events</option>
                    {(events != null ||
                        events != undefined) &&
                        events.map((event) => {
                                return (
                                    <option value={event.eid}>
                                        {event.name}
                                    </option>
                                );
                            
                        })}
                </select>

            </div>
        </>
    )
}

export default ApplicationSideBar;