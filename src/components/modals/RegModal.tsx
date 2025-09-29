import { useEffect, useState } from "react";

//components
import GlobalModal from "./GlobalModal";
import DynamicDiv from "../DynamicDiv";
import DynamicButton from "../buttons/DynamicButton";
import LabelledInput from "../inputs/LabelledInput";

//interfaces
import type { UserPayload } from '../../interfaces/user';
import type User from "../../interfaces/user";

//scripts
import Admin from "../../scripts/user/Admin";

interface RegModalProps{
    callback2:()=>void;
}

//scripts
import hashPassword from "../../scripts/hashPassword";
import validateFields from "../../scripts/validateFields";
import DynamicDropdown from "../dropdowns/DynamicDropdown";

export default function RegModal({callback2}:RegModalProps) {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState('');
    const [regType, setRegtype] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [photo] = useState<null>(null);
    const [accStatus] = useState<string>('Approved');
    const [thisAdmin, setThisAdmin] = useState<Admin>();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);
   
    if(user && token)(()=>{
      const admin = new Admin(user.RegID, token);
      setThisAdmin(admin);
    })();
  }, []);

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

        const hashedPassword = await hashPassword(validated.password)

        const payload:UserPayload = {
            Name:validated.name,
            PhoneNo:validated.phone,
            Email:validated.email,
            Password:hashedPassword,
            Gender:validated.gender,
            RegType:validated.regType,
            dLocation:validated.location,
            accStatus:validated.location,
            Photo:photo

        };
        await thisAdmin?.registerUser(payload);
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
                      border:'1px'                        
                    }}
              className="d-flex flex-column justify-content-between align-items-center h-auto px-1 rounded-1"
        >
            <LabelledInput label="Name:"
                           value={name}
                           onChange={setName}
                           className="w-100"
                           type="text"
                           placeholder="Blah Blah"
            />
            <LabelledInput label="Phone:"
                           value={phone}
                           onChange={setPhone}
                           className="w-100"
                           type="text"
                           placeholder="07********"
            />
            <LabelledInput label="Email:"
                           value={email}
                           onChange={setEmail}
                           className="w-100"
                           type="email"
                           placeholder="Blah@gmail.com"
            />
            <LabelledInput label="Password:"
                           value={password}
                           onChange={setPassword}
                           className="w-100"
                           type="password"
                           placeholder="********"
            />
            <LabelledInput label="Confirm Password:"
                           value={confirmPassword}
                           onChange={setConfirmPassword}
                           className="w-100"
                           type="password"
                           placeholder="********"
            />
            <DynamicDropdown values={['Male', 'Female']} label="Gender" onChange={setGender}/>
            <DynamicDropdown values={['Customer', 'DJ', 'Mcee', 'Storeman', 'Accountant', 'Dispatchman', 'Inspector', 'Band', 'Admin', 'Supplier']} 
                             label="Reg Type" 
                             onChange={setRegtype}
                             className="my-3"
            />
            <DynamicDropdown values={['Nairobi CBD', 'Westlands', 'Karen', 'Langata', 'Kilimani', 'Eastleigh', 'Umoja', 'Parklands', 'Ruiru', 'Ruai', 'Gikambura', 'Kitengela', 'Nairobi West', 'Nairobi East']} 
                             label="Location" 
                             onChange={setLocation}
            />
        </form>
        <DynamicDiv style={{
                            width:'100%',
                            height:'70px',
                            marginTop:'15px'
                          }}   
                    className="d-flex flex-row justify-content-between align-items-center px-2" 
        >
            <DynamicButton label="Register"
                           type="button"
                           onClick={()=>registerUser}
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
