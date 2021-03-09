import OrganiserProfile from '../../components/OrganiserProfile';
import ProfileNewOrganiser from '../../components/ProfileNewOrganiser';

import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';
import GuestWrapper from '../../components/wrapper/GuestWrapper';

import {getUser} from '../../lib/query/getUser';
import api from '../../lib/ApiClient';

const Profile = ({ router: { query } }) => {
  const [role, setRole] = useState();
  const[user, setUser] = useState(Object);
  
  useEffect(async () => {
  console.log("test");
    if (localStorage.getItem('userId') != null ) {

        await getUser(localStorage.getItem('userId')).then(
          (data) => {
            setUser(data);
            console.log(data);
            console.log(user);
            setRole(getRole(data));
          }
        );
    

      
    }else {

      setRole("Guest");
    }
    
  }, [])

  const getRole = (user) => {
    
    var check = "";
          if (user.roles[0].description === "Attendee") {
        check = "Attendee";
      } else if (user.roles[0].description === "Event Organiser") {
        check = "Organiser";
      } else {
        check = 'Partner';
      }
      
      return check;
  }

  const paraId_ = JSON.parse(query.paraId);
return (
 <div>
       {role === "Partner" && (
        <PartnerWrapper>
          <OrganiserProfile paraId_={paraId_} />
        </PartnerWrapper>
      )}

      {role === 'Attendee' && (
        <AttendeeWrapper>
          <OrganiserProfile paraId_={paraId_} />
        </AttendeeWrapper>
      )}

      {role === 'Organiser' && (
        <OrganiserWrapper>
          <OrganiserProfile
            paraId_={paraId_}
          />
        </OrganiserWrapper>)}

        {role === 'Guest' && (
        <GuestWrapper>
          <ProfileNewOrganiser
           paraId_={paraId_}
          />
        </GuestWrapper>)}

     </div>
   )


};

export default withRouter(Profile);
