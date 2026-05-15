import {useState, useEffect} from 'react';

//components
import GlobalModal from '../modals/GlobalModal';
import DynamicDiv from '../DynamicDiv';
import LoadingAnimation from './LoadingAnimation';
import DynamicHead from '../h/DynamicHead';
import LabelledP from '../p/LabelledP';

//interfaces
import type User from '../../interfaces/user';

export default  function FancyLoad() {
  const [user, setUser] = useState<User>();
  useEffect(()=>{
    try{
      const userString = localStorage.getItem("user");
      const who: User | null = userString ? JSON.parse(userString) : null;
      if(who){
        setUser(who);
      }
    } catch(err){
      console.error(`Error: ${err} occurred while getting the logged in user`)
    }
  }, []);
  return (
    <GlobalModal>
      <DynamicDiv className='d-flex flex-column align-items-center'
                  style={{
                          position:'fixed',
                          width:'300px',
                          height:'300px',
                          backgroundColor:'#FFFFFF'
                        }}  
      >
      </DynamicDiv>
    </GlobalModal>
  )
}
