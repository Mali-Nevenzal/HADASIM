

import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import Popup from "reactjs-popup";
// import "../commonStyle/popupStyle.css"
import style from "./Covid.module.css";
import { Outlet } from 'react-router-dom';
import moment from 'moment';
import UpdateCovidPatient from "./UpdateCovidPatient";
import AddCovidPatient from "./AddCovidPatient";

const Covid = (props) => {
  const [covid, setCovid] = useState([]);

  const { memberId, setdisplaCovidBtn } = props;
  console.log("mali" + memberId);
  async function viewCovidDetails() {
    fetch(`http://localhost:1234/member/covid/${memberId}`)
      .then(response => response.json())
      .then(data => { setCovid(data); setdisplaCovidBtn(false) })
      .catch(error =>
        console.error(error))
  };

  useEffect(() => {
    viewCovidDetails();
  }, []);

  return (
    <>
      <div >
        <div >
          {covid.map((covid, index) =>
          (<div key={index} >
            <span>date of sick: {moment(covid.date_of_sick).format('DD-MM-YYYY')}</span>
            <span>date of recovery: {moment(covid.date_of_recovery).format('DD-MM-YYYY')}</span>
          </div>
          ))}
          <Outlet />
        </div></div>
    </>
  )
}

export default Covid


{/* <UpdateCovidPatient memberId={memberId} covid={covid} setInEditing={setInEditing} setCovid={setCovid} />} */ }