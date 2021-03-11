import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';

export default function ShareButton({ title, url }) {
  const [shareText, setShareText] = useState('Share');

  return (
    <button
      className="btn btn-purple btn-sm"
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
                  setShareText('Copied');
                });
              }
            });
        }
      }}
    >
      {shareText} <AiOutlineShareAlt />
    </button>
  );
}

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
