import { useState,useEffect } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { Link} from 'react-router-dom';
import Popup from "reactjs-popup";
import "../commonStyle/popupStyle.css"
import style from "./Member.module.css";
import { Outlet } from 'react-router-dom';
import AddMember from "./AddMember";
import AddVaccination from "../Vaccinations/AddVaccination";
const Members = ()=>{
  const[allMembers,setAllMembers]=useState([]);
  const [inEditing, setInEditing] = useState(-1);

  async function fetchAllMembers()  {
    fetch(`http://localhost:1234/members`)
     .then(response=>response.json())
      .then(data=>setAllMembers(data))
    .catch (error=>
      console.error(error))
  };
  
  useEffect(() => {
  if (!allMembers.length)
  fetchAllMembers();
  }, []); //Call fetchMymembers when the component mounts

  function deleteMember(id) {
    fetch(`http://localhost:1234/members/removeMember/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
              const updataData = allMembers.filter(member => member.id != id);
              setAllMembers(updataData);
            }
        });
}
  
  return (
  <>
    <h1>members page</h1>   
    <div className={style.memberWarpper}>
      <div>
          <Popup trigger=
              {<div className="addBtn" >add new member<FiPlusCircle /></div>}
              position="center center"
              closeOnDocumentClick>
              {close => (
                  <div className="popupContainer">
                      <AddMember allMembers={allMembers} setAllMembers={setAllMembers} closePopUp={close} />
                  </div>
              )}
          </Popup>
          <Popup trigger=
              {<div className="addBtn" >add new vaccination<FiPlusCircle /></div>}
              position="center center"
              closeOnDocumentClick>
              {close => (
                  <div className="popupContainer">
                      <AddVaccination closePopUp={close} />
                  </div>
              )}
          </Popup>
          </div>
          <div className={style.listContainer}>
              {allMembers.map((member, index) =>
              (<div key={index} className={style.member}>
                  <>
                      <Link to={`/members/${member.id}`} state={{ memberId: member.id}}>
                          <span>ID: {member.id} </span>
                          <span>  NAME:  {member.l_name}-{member.f_name}</span>
                      </Link>
                      <span onClick={() => deleteMember(member.id)}><RiDeleteBin7Fill /></span>
                  </>
              </div>
              ))}
             
              <Outlet />
          </div></div>
  </>
  )
}

export default Members