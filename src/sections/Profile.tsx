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
  return (
    <GlobalModal>
        <DynamicDiv style={{
                            width:'300px',
                            height:'500px',
                            backgroundColor:'#ffffff'
                           }}
                    className="d-flex flex-column justify-content-center align-items-center px-3 py-3 gap-2 "  
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

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center border-bottom px-2 profile-item"
                        style={{
                                width:'100%',
                                height:'30px',
                                cursor:'pointer',
                                color:'gray'
                               }}
                        onClick={callback2}  
            >
                Edit Profile
            </DynamicDiv>

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center border-bottom px-2"
                        onClick={callback3}
                        style={{
                                width:'100%',
                                height:'30px',
                                cursor:'pointer',
                                color:'gray'
                              }}  
            >
                Switch User
            </DynamicDiv>

            <DynamicDiv className="d-flex flex-row justify-content-between align-items-center border-bottom px-2"
                        onClick={callback4}
                        style={{
                                width:'100%',
                                height:'30px',
                                cursor:'pointer',
                                color:'gray'
                              }}  
            >
                Log Out
            </DynamicDiv> 

            <DynamicButton label="Close"
                           onClick={callback1}
                           style={{
                                    border:'1px solid grey',
                                    width:'50px',
                                    height:'30px',
                                    color:'grey'
                                 }}
                           className="mt-4 close"
            />                                                                   
        </DynamicDiv>
    </GlobalModal>
  )
} 