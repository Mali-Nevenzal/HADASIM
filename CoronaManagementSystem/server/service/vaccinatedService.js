import { query } from './db.js';
import config from '../config.js';
import dateFormat from 'dateformat';

const db = config.db.database;

async function getAllVaccinated() {
    const data = await query(`SELECT * FROM ${db}.vaccinated`);
    return data;
}

async function getVaccinatedDetails(memberId) {
    const data = await query(`SELECT * FROM ${db}.vaccinated WHERE member_id = ${memberId}`);
    return data;
}

async function removeVaccinatedPatient(memberId,vaccineId) {
    await query(`DELETE FROM vaccinated 
    WHERE member_id = ${memberId} && vaccine_id = ${vaccineId}`);
    console.log("The member has been deleted from the members list");
}

async function updateVaccinatedPatient(data) {
    const date_of_vaccination=dateFormat(data.date_of_vaccination,"yyyy-mm-dd");
    await query(`UPDATE vaccinated SET member_id='${data.member_id}',
    vaccine_id='${data.vaccine_id}',
    date_of_vaccination='${date_of_vaccination}'
    WHERE member_id='${data.member_id}' && vaccine_id='${data.vaccine_id}'`);
    console.log("The vaccinated patient has been update from the vaccinated patient list");
}

async function addVaccinatedPatient(data)
{
    const date_of_vaccination=dateFormat(data.date_of_vaccination,"yyyy-mm-dd");
    await query(`INSERT INTO ${db}.vaccinated
        VALUES ('${data.member_id}','${data.vaccine_id}',
         '${date_of_vaccination}')`);
    return (data.id);
}

export{
    getVaccinatedDetails,
    getAllVaccinated,
    removeVaccinatedPatient,
    updateVaccinatedPatient,
    addVaccinatedPatient
}