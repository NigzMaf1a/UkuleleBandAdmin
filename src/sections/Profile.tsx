import { useState } from "react";

//components
import GlobalModal from "../components/modals/GlobalModal";
import DynamicDiv from "../components/DynamicDiv";
import RoundedImage from "../components/images/RoundedImage";
import LabelledP2 from "../components/p/LabelledP2";
import DynamicButton from "../components/buttons/DynamicButton";

//interfaces
import type User from "../interfaces/user";
interface ProfileProps{
    user:User;
    callback1:()=>void;
    callback2:()=>void;
    callback3:()=>void;
    callback4:()=>void;
}


export default function Profile({user, callback1, callback2, callback3, callback4}:ProfileProps) {
  const [/*mouseOn*/, setMouseOn] = useState<boolean>(false);

  function toggleMousePresence(){
    setMouseOn(prev => !prev);
  }

  return (
    <GlobalModal>
        <DynamicDiv   className="d-flex flex-column justify-content-center align-items-center px-3 py-3 gap-2 profile prof-style"
          onMouseEnter={toggleMousePresence}
          onMouseLeave={toggleMousePresence}  
        >
            <RoundedImage src={'/nzaumi.jpg'}
                          style={{
                                   height:'100px',
                                   width:'100px'
                                }}  
            />

            <DynamicDiv className="d-flex flex-column justify-content-center align-items-center my-2"
                        style={{
                                width:'100%'
                              }}  
            >
                <LabelledP2 label={'Name:'} text={user.Name}/>
                <LabelledP2 label={'Email:'} text={user.Email}/>
                <LabelledP2 label={'Reg Type:'} text={user.RegType}/>

            </DynamicDiv>

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center px-2 profile-item edit-profile"
                        style={{
                                width:'100%',
                                height:'30px'
                               }}
                        onClick={callback2}  
            >
                Edit Profile
            </DynamicDiv>

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center px-2 profile-item switch-user"
                        onClick={callback3}
                        style={{
                                width:'100%',
                                height:'30px'
                              }}  
            >
                Switch User
            </DynamicDiv>

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center px-2 profile-item logout"
                        onClick={callback4}
                        style={{
                                width:'100%',
                                height:'30px'
                              }}  
            >
                Log Out
            </DynamicDiv> 

            <DynamicButton label="Close"
                           onClick={callback1}
                           className="mt-4 close profile-close"
            />                                                                   
        </DynamicDiv>
    </GlobalModal>
  )
} 