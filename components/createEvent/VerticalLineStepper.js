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

function getSteps() {
  return [
    {
      label: 'Account Details',
      eventKey: 'accountDetails',
    },
    {
      label: 'Event Details',
      eventKey: 'eventDetails',
    },
    {
      label: 'Online / Physical',
      eventKey: 'orders',
    },
    {
      label: 'Event Images',
      eventKey: 'download',
    },
  ];

  // return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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
                <Typography>{getStepContent(index)}</Typography>
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
}

// import { Col } from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import {
//   IoIosList,
//   IoIosClipboard,
//   IoIosDownload,
//   IoIosCash,
//   IoIosCreate,
//   IoIosPerson,
//   IoIosArrowRoundDown,
//   IoMdArrowRoundDown
// } from 'react-icons/io';

// const FormStepper = () => {
//   return (
//     <Col lg={3} md={4}>
//       <Nav
//         variant="pills"
//         className="flex-column my-account-content__navigation space-mb--r60"
//       >
//         <Nav.Item style={{ marginBottom: 100 }}>
//           <Nav.Link eventKey="accountDetails">
//             <IoIosPerson /> Event Details
//           </Nav.Link>
//         </Nav.Item>
//         <IoIosArrowRoundDown size="large"/>
//         <Nav.Item>
//           <Nav.Link eventKey="dashboard">
//             <IoIosList /> Physical / Online
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="orders">
//             <IoIosClipboard /> Ticketing
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="download">
//             <IoIosDownload /> Event Images
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="payment">
//             <IoIosCash /> Payment
//           </Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="address">
//             <IoIosCreate /> Address
//           </Nav.Link>
//         </Nav.Item>
//       </Nav>
//     </Col>
//   );
// };
// export default FormStepper;
