import { React, useContext} from "react";
import moment from 'moment';

// {moment(member[0].date_of_birth).format('DD-MM-YYYY')}

const AddCovidPatient = (props) => {
    const {setAllMembers, closePopUp} = props;

    const newCovidPatient = {
        member_id: "",
        date_of_sick: "",
        date_of_recovery: ""
      }; 

    async function handleAddBtn(event) {
        event.preventDefault();
        console.log(event.target.date_of_sick.value)
        newCovidPatient.member_id = event.target.member_id.value;
        if(event.target.date_of_sick.value < event.target.date_of_recovery.value)
        {
            newCovidPatient.date_of_sick = event.target.date_of_sick.value;
            newCovidPatient.date_of_recovery = event.target.date_of_recovery.value;
        }
        else
        {
            alert("Incorrect dates");
        }
        addCovidPatient();
        closePopUp();
    }

   async function addCovidPatient() {
        await fetch("http://localhost:1234/member/covid", {
                method: "POST",
                body: JSON.stringify(newCovidPatient),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .catch((error) => console.error(error))
    }

    return (
        <>
            <div className="container">
                <p>add new covid patient:</p>
                <form onSubmit={handleAddBtn}>
                    <input placeholder="member ID:" type="text" name="member_id"/>
                    <input placeholder="date of sick:" type="text" name="date_of_sick"/>
                    <input placeholder="date of recovery:" type="text" name="date_of_recovery"/>
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        </>
    );
};

export default AddCovidPatient;
