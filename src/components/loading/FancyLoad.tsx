import {useState, useEffect} from 'react';

//components
import GlobalModal from '../modals/GlobalModal';
import DynamicDiv from '../DynamicDiv';

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
      console.log(user);
      
    } catch(err){
      console.error(`Error: ${err} occurred while getting the logged in user`)
    }
  }, [user]);
  return (
    <GlobalModal>
      <DynamicDiv className='align-items-center d-flex flex-column'
                  style={{
                          position:'fixed',
                          width:'300px',
                          height:'300px',
                          backgroundColor:'#FFFFFF'
                        }}  
      >
        <></>
      </DynamicDiv>
    </GlobalModal>
  )
}
