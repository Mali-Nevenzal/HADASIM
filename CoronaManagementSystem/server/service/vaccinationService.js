import { query } from './db.js';
import config from '../config.js';

const db = config.db.database;
async function getAllVaccinations() {
    const data = await query(`SELECT * FROM ${db}.vaccinations`);
    return data;
}

async function getVaccinationDetails(vaccinationId) {
    const data = await query(`SELECT * FROM ${db}.vaccinations WHERE id = ${vaccinationId}`);
    console.log(data);
    return data;
}

async function addVaccination(data)
{
    const result=await query(`INSERT INTO ${db}.vaccinations(vaccination_name,manufacturer)
        VALUES ('${data.vaccination_name}',
         '${data.manufacturer}')`);
    return (result.insertId);
}

async function removeVaccination(vaccineId) {
    await query(`DELETE FROM vaccinations 
    WHERE id = ${vaccineId}`);
    console.log("The vaccination has been deleted from the vaccinations list");
}

async function updateVaccination(data) {
    await query(`UPDATE vaccinations SET id='${data.id}',
    vaccination_name='${data.vaccination_name}',
    manufacturer='${data.manufacturer}'
    WHERE id='${data.id}'`);
    console.log("The vaccinated patient has been update from the vaccinated patient list");
}

export{
    getVaccinationDetails,
    getAllVaccinations,
    addVaccination,
    removeVaccination,
    updateVaccination
}