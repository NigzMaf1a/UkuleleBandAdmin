//components
import DynamicDiv from "../DynamicDiv"
import DynamicP from "../p/DynamicP"

//interface
interface StripProps{
    title:string;
}

function Strip({title}:StripProps) {
  return (
      <DynamicDiv style={{
                          color:'#FFFFFF',
                          height:'70px',
                          backgroundColor:'#15317E'
                        }}
                  className="d-flex flex-row justify-content-center align-items-center w-100"
      >
        <DynamicP text={title}/>
      </DynamicDiv>
  )
}

export default Strip