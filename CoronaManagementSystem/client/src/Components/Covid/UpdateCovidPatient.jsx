import React from "react";


const UpdateCovid = (props) => {
  const { memberId,covid, setInEditing, setCovid } = props;

  async function handleCovidDetailsUpdate(event) {
    event.preventDefault();
    covid.date_of_recovery = ((event.target.date_of_recovery.value)===""?
    covid.date_of_recovery:event.target.date_of_recovery.value);
    covid.date_of_sick = ((event.target.date_of_sick.value)===""?
    covid.date_of_sick:event.target.date_of_sick.value);

    fetch(`http://localhost:1234/member/covid/${memberId}`, {
      method: 'put',
      body: JSON.stringify(
        covid
      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (response.ok) {
          setInEditing(false);
          let updateData;
          setCovid(prev => {
            updateData = prev.map((el) => (el.id === todo.id ? todo : el));
            return updateData
          });
        }
      })
      .catch(error =>
        console.error(error))
  }

  return (
    <>
      <form onSubmit={(e) => handleCovidDetailsUpdate(e)}>
        <input type="text" name="date_of_sick" defaultValue={covid.date_of_sick} />
        <input type="text" name="date_of_recovery" defaultValue={covid.date_of_recovery} />
        <input type="submit" value="update" />
      </form>
    </>
  );
};

export default UpdateCovid;
