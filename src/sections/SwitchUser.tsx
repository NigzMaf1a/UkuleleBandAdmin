import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//components
import GlobalModal from "../components/modals/GlobalModal";
import DynamicDiv from "../components/DynamicDiv";
import LabelledInput from "../components/inputs/LabelledInput";
import DynamicButton from "../components/buttons/DynamicButton";
import RoundedImage from "../components/images/RoundedImage";

//scripts
import loginUser from "../scripts/services/loginUser";

interface SwitchUserProps{
  callback1: () => void;
  callback2: () => void;
}

export default function SwitchUser({callback1, callback2}:SwitchUserProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function logUser(){
    setError("");
    if(email && password){
      localStorage.clear();

    try {
      const { token, user } = await loginUser({
        email,
        password,
      });

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      if(user.regtype !== 'Admin'){
        toast.error('Invalid registration type. Only admins can login here.');
        setEmail('');
        setPassword('');
        navigate('/login');
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success('Login Successful!!!');
      callback1();
      callback2();

      setTimeout(()=>{
        switch (user.regtype) {
          case "Admin":
            navigate("/dashboard");
            break;
          default:
            console.error('Invalid registration type'); 
        }
      }, 3000);

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
      toast.error(error);
    }      
      return;
    }

    if(!email){
      toast.error('Please enter an email to login');
      return;
    }

    if(!password){
      toast.error('Please enter a password to login');
      return;
    }   
    
  }

  return (
    <GlobalModal>
        <DynamicDiv style={{
                            width:'300px',
                            height:'500px',
                            backgroundColor:'#ffffff'
                           }}
                    className="align-items-center d-flex flex-column gap-2 justify-content-center px-3 py-3"  
        >

            <RoundedImage src={'/vite.svg'}
                          style={{
                                   height:'100px',
                                   width:'100px',
                                   border:'1px solid blue'
                                }}  
            />      
            <DynamicDiv className="align-items-center d-flex flex-column gap-2 justify-content-center">

              <LabelledInput
                  label="Email" 
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter email here."
                  type="email"
              />

              <LabelledInput
                  label="Password" 
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter password here."
                  type="password"
              />

              <DynamicDiv className="align-items-center d-flex flex-row justify-content-between mx-auto switch-user-btn-cont">
                <DynamicButton label="Login" className="switch-user-btn switch-user-btn-login" onClick={logUser}/>
                <DynamicButton label="Close" className="switch-user-btn switch-user-btn-close" onClick={callback2}/>
              </DynamicDiv>

            </DynamicDiv>                                                  
        </DynamicDiv>
    </GlobalModal>
  )
} 