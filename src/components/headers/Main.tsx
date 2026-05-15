import { useState } from "react";

//components
import Ribz from "../Ribz";
import Header from "../Header";
import DynamicDiv from "../DynamicDiv";
import DynamicP from "../p/DynamicP";
import DynamicButton from "../buttons/DynamicButton";
import RegModal from "../modals/RegModal";

interface MainProps{
    brand:string;
}

export default function Main({brand}:MainProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal(){
    setShowModal(prev => !prev);
  }

  return (
    <>
      <DynamicDiv className="d-flex flex-row justify-content-between align-items-center px-6"
                  style={{
                          height:'100px',
                          width:'98.5%'
                        }}    
      >
        <Ribz style={{
                      height:'100px',
                      borderRadius:'10px'
                    }}
              className="justify-content-between align-items-center mx-2"
        >
              
          <Header brand={brand} />
          <DynamicDiv style={{
                              height:'70px',
                              width:'300px',
                              color:'#2554C7',
                              marginLeft:'10px'
                            }}
                      className="d-flex flex-row justify-content-between align-items-center"
          >
            <DynamicP text={'Click the button to add a user'} className="strip-add-user-text"/>
            <DynamicButton label="Add" 
                           onClick={toggleModal}
                           className="add-user-btn"
            />
          </DynamicDiv>
        </Ribz>
      </DynamicDiv>
        {showModal && <RegModal callback2={toggleModal}/>}
    </>
  );
}