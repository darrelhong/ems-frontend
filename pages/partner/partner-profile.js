import PartnerProfile from '../../components/PartnerProfile';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import AttendeeWrapper from '../../components/wrapper/AttendeeWrapper';
import useUser from '../../lib/query/useUser';

const Profile = ({ router: { query } }) => {
  const [role, setRole] = useState();
  const { data: user } = useUser(localStorage.getItem('userId'));

  useEffect(async () => {
    if (localStorage.getItem('userId') != null || user != undefined) {
      console.log("hello2");
      // await useUser().then((data) => {setUser(data)})

    //   console.log({ user }) useUser(localStorage.getItem('userId'));
      var check = ""
      if (user.roles[0].description === "Attendee") {
        check = "Attendee";
      } else if (user.roles[0].description === "Event Organiser") {
        check = "Organiser";
      } else {
        check = "Partner";
      }
      // });
      setRole(check);
    }else {

      setRole("Guest");
    }
    
  })

  const localuser = JSON.parse(query.localuser);
  return (
    <div>
      {role === "Partner" && (
        <PartnerWrapper>
          <PartnerProfile
            localuser={localuser}
          />
        </PartnerWrapper>)}

      {role === "Attendee" && (
        <AttendeeWrapper>
          <PartnerProfile
            localuser={localuser}
          />
        </AttendeeWrapper>)}

      {role === "Organiser" && (
        <OrganiserWrapper>
          <PartnerProfile
            localuser={localuser}
          />
        </OrganiserWrapper>)}

    </div>
  )


};



export default withRouter(Profile);