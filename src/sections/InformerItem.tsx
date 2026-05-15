import { useState, useEffect } from "react";
//components
import DynamicDiv from "../components/DynamicDiv";
import LabelledP1 from "../components/p/LabelledP1";
import DynamicP from "../components/p/DynamicP";
import LoadingAnimation from "../components/loading/LoadingAnimation";

interface InformerItemProps{
  label1:string;
  label2:string;
  text1:string;
  text2:string;
  text3:string;
}

export default function InformerItem({label1, label2, text1, text2, text3}:InformerItemProps) {
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{setLoading(false)}, 1000);
    }, []);
  return (
    <DynamicDiv className="d-flex flex-row justify-content-between align-items-center informer-item px-3"
                style={{
                        textAlign: loading ? 'center' : 'start'
                      }}
    >
        {
         loading ? <><DynamicP text="Loading..."/> <LoadingAnimation/></> : 
            <>
                <DynamicDiv className="d-flex flex-column justify-content-between gap-3">
                    <LabelledP1 label={label1} text={text1}/>
                    <LabelledP1 label={label2} text={text2}/>
                </DynamicDiv>
                <DynamicP text={text3} className="informer-text"/>
            </>
        }
    </DynamicDiv>
  )
}