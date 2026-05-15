//react
import { useState, useEffect } from "react";

//components
import DynamicDiv from "../components/DynamicDiv";
import InformerItem from "./InformerItem";
import NoteOne from "../components/notes/NoteOne";
import ReportGenerator from "../components/generators/ReportGenerator";
import AboutItem from "./AboutItem";

//interfaces
import type User from "../interfaces/user";
import type Inventory from "../interfaces/inventory";
import type About from "../interfaces/about";
import type Feedback from "../interfaces/feedback";

interface InformerProps{
  nav:number;
  users:User[];
  store:Inventory[];
  about:About;
  feedback:Feedback;
}

interface DashProps{
  users:User[];
}

interface AccProps{
  users:User[];
}

interface AboutProps{
  about:About;
}

interface RepProps{
  store:Inventory[];
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

function AboutPreview({about}:AboutProps){
  return(
    <DynamicDiv className="informer-kids">
      {<AboutItem about={about}/>}
    </DynamicDiv>
  );
}

function Rep({store}:RepProps){
  return(
    <ReportGenerator/>    
  );
}

function Feed({feedback}:InformerProps){
  return(
    <DynamicDiv className="informer-kids">
      {feedback ? <InformerItem label1={feedback.Name} label2={feedback.Comments} text1={feedback.Response} text2={feedback.Rating}/>: <NoteOne text='No feedback yet'/>}
    </DynamicDiv>
  );
}

export default function Informer({nav, users, store, about, feedback}:InformerProps) {

  const [thisUsers, setThisUsers] = useState<User[]>(users);
  const [thisStore, setThisStore] = useState<Inventory[]>(store);
  const [thisAbout, setThisAbout] = useState<About>(about);
  const [thisFeedback, setThisFeedback] = useState<Feedback>(feedback);

  useEffect(() => {
    setThisUsers(users);
    setThisStore(store);
    setThisAbout(about);
    setThisFeedback(feedback);
  }, [users, store, about, feedback]);

  return (
    <DynamicDiv className="informer">
        {nav === 1 ? <Dash users={thisUsers}/> : nav === 2 ? <Acc users={thisUsers}/> : nav === 3 ? <AboutPreview about={thisAbout}/> : nav === 4 ? <Rep store={thisStore}/> : <Feed feedback={thisFeedback}/>}
    </DynamicDiv>
  );
}