//components
import Ribz from '../Ribz';
import DynamicP from '../p/DynamicP';

interface NoteOneProps{
  text:string;
}

export default function NoteOne({text}:NoteOneProps) {
  return (
    <Ribz style={{height:'70px'}}
          className='justify-content-center align-items-center border bg-white'
    >
        <DynamicP text={text}/>
    </Ribz>
  )
}