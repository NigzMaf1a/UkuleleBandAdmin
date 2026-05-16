import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//components
import GlobalModal from "../components/modals/GlobalModal";
import DynamicDiv from "../components/DynamicDiv";
import RoundedImage from "../components/images/RoundedImage";
import DynamicButton from "../components/buttons/DynamicButton";
import LabelledInput from "../components/inputs/LabelledInput";

//scriptz
import Admin from "../scripts/user/Admin";

//interfaces
import type User from "../interfaces/user";
import type { UserPayload } from "../interfaces/user";
interface EditProfileProps{
  user:User;
  callback1: ()=> void;
}

export default function EditProfile({user, callback1}:EditProfileProps) {
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  // const [photo, setPhoto] = useState<Blob>();
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      navigate('/login');
      return;
    }    
    if(user && token)(()=>{
      const admin = new Admin(user.RegId, token);
      setThisAdmin(admin);
    })();
  }, [navigate]);  

  async function editUser(){
    toast.success('Tryna register user');

    function validatePassword(pass:string, conPass:string){
      if(pass === conPass){
        const validPass = pass;
        return validPass;
      }
    }

    const validPassword = validatePassword(password, confirmPassword);
    const user:UserPayload = {
      PhoneNo:phone, 
      Email:email,
      Password:validPassword
    };

    if(thisAdmin){
      await thisAdmin.updateAdmin(user);
    }
  }


  return (
    <GlobalModal>
        <DynamicDiv className="align-items-center d-flex edit-user-profile flex-column gap-2 justify-content-center px-3 py-3"  
        >
          
            <RoundedImage src={'/vite.svg'}
                          style={{
                                   height:'100px',
                                   width:'100px',
                                   border:'1px solid blue',
                                   marginTop:'50px'
                                }}  
            />    
              <DynamicDiv className="align-items-center d-flex flex-column justify-content-between mx-auto">
                <LabelledInput
                    label="Phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder={user.PhoneNo}
                    type="text"
                />
                <LabelledInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder={user.Email}
                    type="text"
                />
                <LabelledInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder={user.Password}
                    type="password"
                />
                <LabelledInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder={user.Password}
                    type="password"
                />
              </DynamicDiv>

              <DynamicDiv className="align-items-center d-flex flex-row justify-content-between mx-auto switch-user-btn-cont">
                <DynamicButton label="Close" className="switch-user-btn switch-user-btn-close" onClick={callback1}/>
                <DynamicButton label="Edit" className="switch-user-btn switch-user-btn-login" onClick={editUser}/>
              </DynamicDiv> 

        </DynamicDiv>
    </GlobalModal>
  )
} 