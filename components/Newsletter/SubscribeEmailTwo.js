import MailchimpSubscribe from 'react-mailchimp-subscribe';

const CustomForm = ({
  status,
  message,
  onValidated,
  alertColor,
  btnColorClass,
}) => {
  let email;
  const submit = () => {
    email &&
      email.value.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email.value,
      });

    let emailInput = document.getElementById('mc-form-email');
    emailInput.value = '';
  };

  return (
    <div className="newsletter-form-wrapper">
      <div className="newsletter-form newsletter-form--rounded-input position-relative">
        <input
          id="mc-form-email"
          className="form-control"
          ref={(node) => (email = node)}
          type="email"
          placeholder="Your email address"
        />
        <button
          className={`btn btn-send ${
            btnColorClass ? btnColorClass : 'btn-dark'
          }`}
          onClick={submit}
        >
          <i className="icon-envelope-letter"></i>
        </button>
      </div>
      {status === 'sending' && (
        <div
          style={{
            color: alertColor,
            fontSize: '14px',
            marginTop: '15px',
            lineHeight: '1.3',
          }}
        >
          sending...
        </div>
      )}
      {status === 'error' && (
        <div
          style={{
            color: alertColor,
            fontSize: '14px',
            marginTop: '15px',
            lineHeight: '1.3',
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          style={{
            color: alertColor,
            fontSize: '14px',
            marginTop: '15px',
            lineHeight: '1.3',
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  );
};

const SubscribeEmailTwo = ({ mailchimpUrl, alertColor, btnColorClass }) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
            alertColor={alertColor}
            btnColorClass={btnColorClass}
          />
        )}
      />
    </div>
  );
};

export default SubscribeEmailTwo;
