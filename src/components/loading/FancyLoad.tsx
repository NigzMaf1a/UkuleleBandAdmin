import {useState, useEffect} from 'react';

//components
import GlobalModal from '../modals/GlobalModal';
import DynamicDiv from '../containers/DynamicDiv';
import LoadingAnimation from './LoadingAnimation';
import DynamicHead from '../h/DynamicHead';
import LabelledP from '../p/LabelledP';

//interfaces
import User from '@/interfaces/user';

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

        <DynamicDiv>
          <DynamicHead text={t('loading')}
                       style={{
                                marginTop:'20px'
                             }}
          />
          <LoadingAnimation className='my-auto' 
                            style={{
                                    marginTop:'50px',
                                    marginBottom:'100px'
                                  }}
          />
          <LabelledP label={'Reg Type')} 
                     text={user?.RegType}
          />
        </DynamicDiv>
      </DynamicDiv>
    </GlobalModal>
  )
}
