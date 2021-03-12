import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`btn btn-sm ${copied ? 'btn-purple' : 'btn-outline-purple'}`}
      onClick={() => {
        if (navigator?.share) {
          navigator.share({
            title,
            url,
          });
        } else {
          navigator.permissions
            .query({ name: 'clipboard-write' })
            .then((result) => {
              if (result.state == 'granted' || result.state == 'prompt') {
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                });
              }
            });
        }
      }}
    >
      {copied ? 'Link Copied' : 'Share'} <AiOutlineShareAlt />
    </button>
  );
}

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
