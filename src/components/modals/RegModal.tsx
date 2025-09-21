import { useState } from "react";

//components
import GlobalModal from "./GlobalModal";
import DynamicDiv from "../DynamicDiv";
import DynamicButton from "../buttons/DynamicButton";
import LabelledInput from "../inputs/LabelledInput";

//interfaces
import type { UserPayload } from '../../interfaces/user';
import type { RegisterResponse } from "../../scripts/services/registerUser";

interface RegModalProps{
    // callback1:(user:UserPayload)=>Promise<RegisterResponse>;
    callback2:()=>void;
}

//scripts
import hashPassword from "../../scripts/hashPassword";
import validateFields from "../../scripts/validateFields";

export default function RegModal({callback1, callback2}:RegModalProps) {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [regType, setRegtype] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [photo] = useState<null>(null);
    const [accStatus] = useState<string>('Approved');

  async function registerUser(e: React.FormEvent){
    e.preventDefault();
    try{
        const validated = validateFields(
          name,
          phone,
          email,
          password, 
          confirmPassword,
          gender,
          regType, 
          location,
          accStatus
        );

        const payload:UserPayload = {
            Name:validated.name,
            PhoneNo:validated.phone,
            Email:validated.email,
            Password:validated.password,
            Gender:validated.gender,
            RegType:validated.regType,
            dLocation:validated.location,
            accStatus:validated.location

        };
        await callback1(payload);
    } catch(err){
        console.error('Error' + err + 'Occurred while registering user');
        throw err;
    }
  }
  return (
<GlobalModal>
    <DynamicDiv style={{
                        height:'70%',
                        width:'300px',
                        backgroundColor:'white',
                        overflowY:'auto'
                       }}  
                className="d-flex flex-column  align-items-center px-2 py-3"
    >
        <form onSubmit={registerUser}
              style={{
                      width:'100%',
                      border:'1px solid green'                        
                    }}
              className="d-flex flex-column justify-content-between align-items-center h-auto px-1 rounded-1"
        >
            <LabelledInput label="Name:"
                           value={name}
                           onChange={setName}
                           className="w-100"
                           type="text"
                           placeholder="Please enter a name"
            />
        </form>
        <DynamicDiv style={{
                            width:'100%',
                            height:'70px'
                          }}   
                    className="d-flex flex-row justify-content-between align-items-center px-2" 
        >
            <DynamicButton label="Register"
                           style={{
                                    color:'#FFFFFF',
                                    backgroundColor:'green',
                                    width:'50px',
                                    height:'30px'
                                 }}
            />
            <DynamicButton label="Close"
                           onClick={callback2}
                           style={{    
                                    width:'50px',
                                    height:'30px',
                                    border:'1px solid green',
                                    color:'green'                                                         
                                 }}
            />
        </DynamicDiv>
    </DynamicDiv>
</GlobalModal>
  )
}
