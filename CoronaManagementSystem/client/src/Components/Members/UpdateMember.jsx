import React from "react";

const UpdateMember = (props) => {
  const { member, display, setDisplay} = props;
  const updateMember = {
    id: member.id,
    f_name: "",
    l_name: "",
    date_of_birth: member.date_of_birth,
    phone: "",
    mobyle_phone: "",
    address: "",
  };

  async function handleUpdateMember(event) {
    event.preventDefault();
    updateMember.l_name = event.target.l_name.value;
    updateMember.f_name = event.target.f_name.value;
    updateMember.phone = event.target.phone.value;
    updateMember.mobyle_phone = event.target.mobyle_phone.value;
    updateMember.address = event.target.address.value;
    fetch(`http://localhost:1234/members/${member.id}`, {
      method: 'PUT',
      body: JSON.stringify(updateMember),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        setDisplay(false);
        window.location.reload(); // Refresh the page after update
      })
      .then(()=>alert("Your details have been successfully updated"))
      .catch(error => console.error(error));
  }

  return (
    <>
      {display && (
        <form onSubmit={(e) => handleUpdateMember(e)}>
          <input type="text" name="f_name" defaultValue={member.f_name} />
          <input type="text" name="l_name" defaultValue={member.l_name} />
          <input type="text" name="phone" defaultValue={member.phone} />
          <input type="text" name="mobyle_phone" defaultValue={member.mobyle_phone} />
          <input type="text" name="address" defaultValue={member.address} />
          <input type="submit" value="Update" />
        </form>
      )}
    </>
  );
};

export default UpdateMember;
