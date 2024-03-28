import { useState,useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UpdateMember from "./UpdateMember";
import moment from 'moment';
import Covid from "../Covid/Covid";
import Vaccinated from "../Vaccinated/Vaccinated";
import AddVaccination from "../Vaccinations/AddVaccination";
import Popup from "reactjs-popup";
import { FiPlusCircle } from "react-icons/fi";
import AddVaccinated from "../Vaccinated/AddVaccinated";

const MembersDetails = ()=>{
    const location = useLocation();
    const { memberId } = location.state;
    const[member,setMember]=useState([]);
    const[isEditing,setInEditing] = useState(false);
    const[display,setDisplay]=useState(false);
    const[covid,setCovid]=useState(false);
    const[displaCovidBtn,setDisplayCovidBtn]=useState(true);
    const[addViccine,setAddVaccine]=useState(false);
    
    async function fetchMember()  {
      fetch(`http://localhost:1234/members/${memberId}`)
       .then(response=>response.json())
       .then(data=>setMember(data))
      .catch (error=>
        console.error(error))
    };
    
    useEffect(() => {
    if (!member.length)
    fetchMember();
    }, [member]); //Call fetchMymembers when the component mounts

    const viewAllMembers = () => { window.history.back();};

    return(
        <>
         <h1>your details:</h1> 
         {member.length!=0?
         <div>
            < p>ID: {memberId}  </ p> 
            < p>name: {member[0].l_name}  {member[0].f_name}</ p>
            < p>date of birth: {moment(member[0].date_of_birth).format('DD-MM-YYYY')}</ p>
            < p>phone number: {member[0].phone}</ p>
            < p>mobyle phone number: {member[0].mobyle_phone}</ p>
            < p>address: {member[0].address}</ p>
            {!display&&<button onClick={()=>{setInEditing(true); setDisplay(true)}}>click to update</button>}
            {isEditing && <UpdateMember member={member[0]} setDisplay={setDisplay} display={display} />} 
         </div>
         :
         <div></div>}
         {displaCovidBtn && <button onClick={()=>{setCovid(true);setDisplayCovidBtn(false)}}>view your covid details</button>}
         {covid && <Covid memberId={memberId} setdisplaCovidBtn={setDisplayCovidBtn}/>}
         {covid && <Vaccinated memberId={memberId}/>}
         {!displaCovidBtn && <button onClick={()=>{setCovid(false);setDisplayCovidBtn(true)}}>close your covid details</button>}
         <button onClick={viewAllMembers}>view all members</button>     
         <Popup trigger=
              {<div className="addBtn" >add vaccination date<FiPlusCircle /></div>}
              position="center center"
              closeOnDocumentClick>
              {close => (
                  <div className="popupContainer">
                      <AddVaccinated memberId={memberId} closePopUp={close} />
                  </div>
              )}
          </Popup>   
         <Outlet />
        </>
    )
}
export default MembersDetails

{/* <button onClick={()=>setAddVaccine(true)}>add vaccination date</button>
{addViccine && <AddVaccination setAddVaccine={setAddVaccine}/>} */}