import { query } from './db.js';
import config from '../config.js';
import dateFormat from 'dateformat';

const db = config.db.database;

async function getAllCoronaPatients() {
    const data = await query(`SELECT date_of_sick,date_of_recovery,member_id FROM ${db}.covid`);
    return data;
}

async function getCovidDetails(memberId) {
const data = await query(`SELECT * FROM ${db}.covid WHERE member_id = ${memberId}`);
console.log(data);
return data;
}

async function addSickMember(data) {
const date_of_recovery=dateFormat(data.date_of_recovery,"yyyy-mm-dd");
const date_of_sick=dateFormat(data.date_of_sick,"yyyy-mm-dd");
console.log(data);
await query(`INSERT INTO covid 
    VALUES ('${date_of_sick}',
     '${date_of_recovery}','${data.member_id}')`);
return (data.id);
}

async function removePatient(memberId) {
    await query(`DELETE FROM covid WHERE member_id = ${memberId}`);
    console.log("The patient has been deleted from the Corona patients list");
}

async function updatePatient(data) {
    const date_of_recovery=dateFormat(data.date_of_recovery,"yyyy-mm-dd");
    const date_of_sick=dateFormat(data.date_of_sick,"yyyy-mm-dd");
    console.log(data);
    await query(`UPDATE covid SET date_of_sick='${date_of_sick}',
    date_of_recovery='${date_of_recovery}' 
    WHERE member_id='${data.member_id}'`);
    console.log("The patient has been update from the Corona patients list");
}

export{
    addSickMember,
    getCovidDetails,
    getAllCoronaPatients,
    updatePatient,
    removePatient
}