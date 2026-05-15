import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

//components
import DynamicDiv from "../DynamicDiv";
import InformerItem from "../../sections/InformerItem";

//interfaces
import type Inventory from "../../interfaces/inventory";
import type User from "../../interfaces/user";

//scripts
import Admin from "../../scripts/user/Admin";

export default function ReportGenerator() {

  const [store, setStore] = useState<Inventory[]>([]);
  const [thisAdmin, setThisAdmin] = useState<Admin>();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      navigate('/login');
      return;
    }    
    if(user && token)(()=>{
      const admin = new Admin(user.regid, token);
      setThisAdmin(admin);
    })();
  }, [navigate]);  

  useEffect(()=>{
    if(thisAdmin)(async ()=>{
      const equipment:Inventory[] = await thisAdmin.fetchInventory();

      setStore(equipment);
    })();
  }, [thisAdmin]);

  console.log('Store dem:', store);

  const mapStore: React.ReactNode = useMemo(()=>{

    if(store.length === 0)((equipz:Inventory[])=>{
      equipz.map((equip, idx)=>(
        <InformerItem 
                      key={idx}
                      label1="ID:" 
                      label2="Description"
                      text1={String(equip.EquipmentID)}
                      text2={equip.Description}
                      text3={equip.Condition}
        />
      ));
    })(store);

  }, [store]);

  return (
    <DynamicDiv>
      <Container className="py-4">
        {store.length !== 0 &&
          (<Card className="mb-4">
            <Card.Header className="fw-bold golden-rod text-white">
              Pending Users
            </Card.Header>
            <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
              {mapStore}
            </Card.Body>
           </Card>
           )         
        }
      </Container>
      <InformerItem label1="Mkuu" label2="Main" text1="Nigel Khasiani" text2="Diana Ndinda" text3="Charmed"/>
      <InformerItem label1="Mkuu" label2="Main" text1="Nigel Khasiani" text2="Diana Ndinda" text3="Charmed"/>
      <InformerItem label1="Mkuu" label2="Main" text1="Nigel Khasiani" text2="Diana Ndinda" text3="Charmed"/>
      <InformerItem label1="Mkuu" label2="Main" text1="Nigel Khasiani" text2="Diana Ndinda" text3="Charmed"/>
    </DynamicDiv>
  );
}