import PartnerProfile from '../../components/PartnerProfile';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';
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

  const localuser = JSON.parse(query.localuser);
return (
 <div>
       {role === "Partner" && (
        <PartnerWrapper>
          <PartnerProfile localuser={localuser} />
        </PartnerWrapper>
      )}

      {role === 'Attendee' && (
        <AttendeeWrapper>
          <PartnerProfile localuser={localuser} />
        </AttendeeWrapper>
      )}

      {role === 'Organiser' && (
        <OrganiserWrapper>
          <PartnerProfile
            localuser={localuser}
          />
        </OrganiserWrapper>)}

     </div>
   )


};

export default withRouter(Profile);
