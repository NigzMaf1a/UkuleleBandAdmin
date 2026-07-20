import { useState } from "react";

//components
import GlobalModal from "../components/modals/GlobalModal";
import DynamicDiv from "../components/DynamicDiv";
import RoundedImage from "../components/images/RoundedImage";
import LabelledP2 from "../components/p/LabelledP2";
import DynamicButton from "../components/buttons/DynamicButton";

//interfaces
import type User from "../interfaces/user";
interface ProfileProps {
  user: User;
  callback1: () => void;
  callback2: () => void;
  callback3: () => void;
  callback4: () => void;
}


export default function Profile({ user, callback1, callback2, callback3, callback4 }: ProfileProps) {
  const [/*mouseOn*/, setMouseOn] = useState<boolean>(false);

  function toggleMousePresence() {
    setMouseOn(prev => !prev);
  }

  return (
    <GlobalModal>
      <DynamicDiv className="align-items-center d-flex flex-column gap-2 justify-content-center prof-style profile px-3 py-3"
        onMouseEnter={toggleMousePresence}
        onMouseLeave={toggleMousePresence}
      >
        <RoundedImage src={'/nzaumi.jpg'}
          style={{
            height: '100px',
            width: '100px'
          }}
        />

        <DynamicDiv className="align-items-center d-flex flex-column justify-content-center my-2"
          style={{
            width: '100%'
          }}
        >
          <LabelledP2 label={'Name:'} text={user.name} />
          <LabelledP2 label={'Email:'} text={user.email} />
          <LabelledP2 label={'Reg Type:'} text={user.regtype} />

        </DynamicDiv>

        <DynamicDiv className="align-items-center d-flex edit-profile flex-row justify-content-between profile-item px-2"
          style={{
            width: '100%',
            height: '30px'
          }}
          onClick={callback2}
        >
          Edit Profile
        </DynamicDiv>

        <DynamicDiv className="align-items-center d-flex flex-row justify-content-between profile-item px-2 switch-user"
          onClick={callback3}
          style={{
            width: '100%',
            height: '30px'
          }}
        >
          Switch User
        </DynamicDiv>

        <DynamicDiv className="align-items-center d-flex flex-row justify-content-between logout profile-item px-2"
          onClick={callback4}
          style={{
            width: '100%',
            height: '30px'
          }}
        >
          Log Out
        </DynamicDiv>

        <DynamicButton label="Close"
          onClick={callback1}
          className="close mt-4 profile-close"
        />
      </DynamicDiv>
    </GlobalModal>
  )
} 