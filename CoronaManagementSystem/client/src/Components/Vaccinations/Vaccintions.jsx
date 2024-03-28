
import { useState,useEffect } from "react";
import { Outlet } from 'react-router-dom';

const Vaccinations = (props)=>{
  const{vaccineId}=props;
  const[allVaciinations,setAllVaccinations]=useState([])

  const vaccine = {
    id: "",
    name: "",
    manufacturer: ""
  }; 

  async function fetchAllVaccinations()  {
    fetch(`http://localhost:1234/member/vaccination/${vaccineId}`)
     .then(response=>response.json())
      .then(data=>setAllVaccinations(data[0]))
    .catch (error=>
      console.error(error))
  };
  
  useEffect(() => {
    fetchAllVaccinations();
  }, []); 

 
  return (
  <>
      <p>name of vaccination: {allVaciinations.vaccination_name}</p>
      <p>name of the manufacturer: {allVaciinations.manufacturer}</p>

  </>
  )
}

export default Vaccinations