import React, { useState } from "react";

const AddVaccinated = (props) => {
  const { memberId, closePopUp } = props;
  const [allVaccinations, setAllVaccinations] = useState([]);
  const[allVaccinateds,setAllVaccinateds]=useState([]);

  const newVaccinated = {
    member_id: memberId,
    vaccine_id: "",
    date_of_vaccination: ""
  };

  async function handleAddBtn(event) {
    event.preventDefault();
    newVaccinated.vaccine_id = event.target.vaccine_id.value;
    newVaccinated.date_of_vaccination = event.target.date_of_vaccination.value;
    await fetchAllVaccinations(); // Fetch all vaccinations before checking
    checkCorrectDetails();
    closePopUp();
  }

  async function fetchAllVaccinations() {
    try {
      const response = await fetch(`http://localhost:1234/member/vaccination/${newVaccinated.vaccine_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vaccinations');
      }
      const data = await response.json();
      setAllVaccinations(data);
    } catch (error) {
      console.error(error);
    }
  };

  function checkCorrectDetails() {
    let isExists = allVaccinations.some((v) => newVaccinated.vaccine_id === v.id);
    isExists ? alert("Vaccination with this ID already exists") : fetchVaccinated();
    console.log(allVaccinateds.length);
    allVaccinateds.length>=4? alert("You cannot be vaccinated more than 4 times"):addVaccinated();
  }
  

  async function fetchVaccinated()  {
    fetch(`http://localhost:1234/member/vaccinated/${memberId}`)
     .then(response=>response.json())
      .then(data=>setAllVaccinateds(data))
    .catch (error=>
      console.error(error))
  };


  async function addVaccinated() {
    try {
      const response = await fetch("http://localhost:1234/member/vaccinated", {
        method: "POST",
        body: JSON.stringify(newVaccinated),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add vaccination');
      }
      window.location.reload(); // Reload the page after successful addition
      alert("Vaccination date successfully added")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container">
        <p>Add new vaccination:</p>
        <form onSubmit={handleAddBtn}>
          <input placeholder="ID of vaccination" type="text" name="vaccine_id" />
          <input placeholder="Date of the vaccination:" type="text" name="date_of_vaccination" />
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
}

export default AddVaccinated;
