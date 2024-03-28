import { React, useContext} from "react";

// {moment(member[0].date_of_birth).format('DD-MM-YYYY')}

const AddMember = (props) => {
    const {setAllMembers, closePopUp} = props;

    const newMember = {
        id: "",
        f_name: "",
        l_name: "",
        date_of_birth: "",
        phone:"",
        mobyle_phone:"",
        address:""
      }; 

    async function handleAddBtn(event) {
        event.preventDefault();
        newMember.id = event.target.id.value;
        newMember.l_name = event.target.l_name.value;
        newMember.f_name = event.target.f_name.value;
        newMember.phone = event.target.phone.value;
        newMember.mobyle_phone = event.target.mobyle_phone.value;
        newMember.address = event.target.address.value;
        newMember.date_of_birth = event.target.date_of_birth.value;
        addMember();
        closePopUp();
    }

   async function addMember() {
        await fetch("http://localhost:1234/members", {
                method: "POST",
                body: JSON.stringify(newMember),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((respons) => {
                if (respons.ok) {
                    let updateData;
                    setAllMembers((prevArr) => {
                        updateData = [...prevArr, newMember];
                        return updateData;
                    });
                }
            })
            .catch((error) => console.error(error))
    }

    return (
        <>
            <div className="container">
                <p>add new member:</p>
                <form onSubmit={handleAddBtn}>
                    <input placeholder="ID:" type="text" name="id"/>
                    <input placeholder="first name:" type="text" name="f_name"/>
                    <input placeholder="last name:" type="text" name="l_name"/>
                    <input placeholder="date of birth:" type="text" name="date_of_birth"/>
                    <input placeholder="phone number:" type="text" name="phone"/>
                    <input placeholder="mobyle phone number:" type="text" name="mobyle_phone"/>
                    <input placeholder="address:" type="text" name="address"/>
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        </>
    );
};

export default AddMember;
