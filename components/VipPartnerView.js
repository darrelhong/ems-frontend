import React, { useState, useEffect } from 'react';
import VipPartnerCard from '../components/VipPartnerCard';
import { Row, Modal, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import {
  handleCancel,
  handleDelete,
} from '../lib/functions/eventOrganiser/eventFunctions';

const VipPartnerView = ({ handleDeleteVip, vips, layout }) => {
  const [currVips, setCurrVips] = useState(vips);

  useEffect(() => {
    if (vips) {
      setCurrVips(vips);
    }
  });
  const { addToast, removeToast } = useToasts();

  const createToast = (message, appearanceStyle) => {
    const toastId = addToast(message, { appearance: appearanceStyle });
    setTimeout(() => removeToast(toastId), 3000);
  };

  const deleteVip = async (vipid) => {
    console.log('trying to delete this: ', vipid);
    await handleDeleteVip(vipid);
  };

  return (
    <div className="shop-products">
      <Row className={layout}>
        {currVips &&
          currVips.map((vip) => {
            return (
              <VipPartnerCard
                key={vip.id}
                vip={vip}
                deleteVip={deleteVip}
                createToast={createToast}
              />
            );
          })}
      </Row>
    </div>
  );
};
export default VipPartnerView;
