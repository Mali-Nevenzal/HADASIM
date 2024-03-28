
import { useState,useEffect } from "react";
import "../commonStyle/popupStyle.css"
import { Outlet } from 'react-router-dom';
import Vaccinations from "../Vaccinations/Vaccintions";
import style from "./Vaccinated.module.css";
import moment from 'moment';


const Vaccinated = (props)=>{
  const[allVaccinateds,setAllVaccinateds]=useState([]);
  const{memberId}=props;
  console.log("mali" + memberId);
  async function fetchAllVaccinateds()  {
    fetch(`http://localhost:1234/member/vaccinated/${memberId}`)
     .then(response=>response.json())
      .then(data=>setAllVaccinateds(data))
    .catch (error=>
      console.error(error))
  };
  
  useEffect(() => {
  fetchAllVaccinateds();
  }, []); 

 
  
  return (
  <>
    <div >
          <div >
              {allVaccinateds.map((vaccine, index) =>
              (<div key={index} >
                    <Vaccinations vaccineId={vaccine.vaccine_id}/>
                    <span>date of vaccination: {moment(vaccine.date_of_vaccination).format('DD-MM-YYYY')}</span>
              </div>
              ))}
              <Outlet />
     </div></div>
  </>
  )
}

export default Vaccinated