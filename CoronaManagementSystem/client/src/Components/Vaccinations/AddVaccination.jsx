import { React, useContext} from "react";

// {moment(member[0].date_of_birth).format('DD-MM-YYYY')}

const AddVaccination = (props) => {
    const { closePopUp} = props;

    const newVaccine = {
        vaccination_name: "",
        manufacturer: ""
      }; 

    async function handleAddBtn(event) {
        event.preventDefault();
        newVaccine.vaccination_name = event.target.vaccination_name.value;
        newVaccine.manufacturer = event.target.manufacturer.value;
        addvaccination();
        closePopUp();
    }

   async function addvaccination() {
        await fetch("http://localhost:1234/member/vaccination", {
                method: "POST",
                body: JSON.stringify(newVaccine),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((respons) => {window.location.reload();})
            .catch((error) => console.error(error))
    }

    return (
        <>
            <div className="container">
                <p>add new vaccination:</p>
                <form onSubmit={handleAddBtn}>
                    <input placeholder="name of vaccination" type="text" name="vaccination_name"/>
                    <input placeholder="name of the manufacturer:" type="text" name="manufacturer"/>
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        </>
    );
};

export default AddVaccination;
