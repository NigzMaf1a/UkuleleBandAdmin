//components
import GlobalModal from "../components/modals/GlobalModal";
import DynamicDiv from "../components/DynamicDiv";
import RoundedImage from "../components/images/RoundedImage";

//interfaces
import type User from "../interfaces/user";
interface EditProfileProps{
  user:User;
}

export default function EditProfile({user}:EditProfileProps) {
  return (
    <GlobalModal>
        <DynamicDiv style={{
                            width:'300px',
                            height:'500px',
                            backgroundColor:'#ffffff'
                           }}
                    className="d-flex flex-column justify-content-center align-items-center px-3 py-3 gap-2 "  
        >
            <RoundedImage src={'/vite.svg'}
                          style={{
                                   height:'100px',
                                   width:'100px',
                                   border:'1px solid blue'
                                }}  
            />                                                        
        </DynamicDiv>
    </GlobalModal>
  )
} 