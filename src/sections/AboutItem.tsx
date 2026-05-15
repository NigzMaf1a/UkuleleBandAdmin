//interfaces
import type About from "../interfaces/about";

//components
import DynamicDiv from "../components/DynamicDiv";
import DynamicP from "../components/p/DynamicP";


interface AboutItemProps{
  about:About | string;
}

export default function AboutItem({about}:AboutItemProps){
  return(
    <DynamicDiv className="informer-kids">
        <DynamicP text = {typeof about === "string" ? about : about.Detail}/>
    </DynamicDiv>
  );
}