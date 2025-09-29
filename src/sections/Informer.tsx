//components
import DynamicDiv from "../components/DynamicDiv";
import InformerItem from "./InformerItem";
import NoteOne from "../components/notes/NoteOne";

//interfaces
import type User from "../interfaces/user";
import type Inventory from "../interfaces/inventory";

interface InformerProps{
  nav:number;
  users:User[];
}

interface DashProps{
  users:User[];
}

interface AccProps{
  users:User[];
}

interface AboutProps{
  detail:string;
}

interface RepProps{
  store:Inventory;
}

function Dash({users}:DashProps){
  return(
    <DynamicDiv className="informer-kids">
      {users ? users.map((user) => <InformerItem key={user.RegID} label1="Name:" label2="Email:" text1={user.Name} text2={user.Email} text3={user.accStatus}/>) :  <NoteOne text='No registered users'/>}
    </DynamicDiv>
  );
}

function Acc({users}:AccProps){
  return(
    <DynamicDiv className="informer-kids">
      {users ? users.map((user) => <InformerItem key={user.RegID} label1="Name:" label2="Email:" text1={user.Name} text2={user.Email} text3={user.RegType}/>) :  <NoteOne text='No registered users'/>}
    </DynamicDiv>
  );
}

function About({detail}:AboutProps){
  return(
    <DynamicDiv className="informer-kids">
      <InformerItem/>
    </DynamicDiv>
  );
}

function Rep({store}:RepProps){
  return(
    <DynamicDiv className="informer-kids">
      <InformerItem/>
    </DynamicDiv>
  );
}

function Feed({store}:RepProps){
  return(
    <DynamicDiv className="informer-kids">
      <InformerItem/>
    </DynamicDiv>
  );
}

export default function Informer({nav, users}:InformerProps) {

  return (
    <DynamicDiv className="informer">
        {nav === 1 ? <Dash users={users}/> : nav === 2 ? <Acc users={users}/> : nav === 3 ? <About detail=""/> : nav === 4 ? <Rep/> : <Feed/>}
    </DynamicDiv>
  );
}