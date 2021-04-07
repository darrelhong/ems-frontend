import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const GeneralSideBar = ({ setFilterValue, filterValue, statuses }) => {
    const checkActive = (value) => {
        return value == filterValue;
    }

    return (
        <div className="sidebar">
            <div className="widget">
                <h5 className="widget__title">Status</h5>
                <ButtonGroup
                    color="primary"
                    aria-label=" vertical outlined primary button group"
                    orientation="vertical"
                >
                    {statuses.map((status) => {
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
        </div>
    )
}

export default GeneralSideBar;