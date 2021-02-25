import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
// import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const VerticalLinearStepper = ({ activeStep, setActiveStep, steps }) => {
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //   const getStepIconComponent = (index) => {
  //     if (index < 1) {
  //       return <IoIosMenu />;
  //     } else return <IoIosSearch />;
  //   };

  const navigateStepper = (index) => {
    setActiveStep(index);
  };

  return (
    // <div className={classes.root}>
    <Col lg={3} md={4}>
      <Nav
        variant="pills"
        className="flex-column my-account-content__navigation space-mb--r60"
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <Nav.Item>
                <Nav.Link
                  eventKey={step.eventKey}
                  onClick={() => navigateStepper(index)}
                >
                  {/* <StepLabel
                    StepIconComponent={() => getStepIconComponent(index)}
                    onClick={() => navigateStepper(index)}
                  >
                    {step.label}
                  </StepLabel> */}
                  {index + 1}. {step.label}
                </Nav.Link>
              </Nav.Item>
              <StepContent>
                <Typography>{step.content}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Nav>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      {/* </div> */}
    </Col>
  );
};

export default VerticalLinearStepper;

VerticalLinearStepper.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  steps: PropTypes.array,
};
