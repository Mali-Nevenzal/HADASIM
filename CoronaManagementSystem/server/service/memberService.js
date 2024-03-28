
import { query } from './db.js';
import config from '../config.js';
import dateFormat from 'dateformat';
const db = config.db.database;

async function getAllMembers() {
        const data = await query(`SELECT id,l_name,f_name FROM ${db}.members`);
        return data;
}

async function getMemberById(memberId) {
    const data = await query(`SELECT * FROM ${db}.members WHERE id = ${memberId}`);
    return data;
}

async function removeMember(memberId) {
    await query(`DELETE FROM members WHERE id = ${memberId}`);
    console.log("The member has been deleted from the members list");
}

async function updateMember(data) {
    const date_of_birth=dateFormat(data.date_of_birth,"yyyy-mm-dd");
    await query(`UPDATE members SET id='${data.id}',f_name='${data.f_name}',
    l_name='${data.l_name}',date_Of_birth='${date_of_birth}',
    phone='${data.phone}', mobyle_phone='${data.mobyle_phone}',
    address='${data.address}' 
    WHERE id='${data.id}'`);
    console.log("The member has been update from the members list");
    return(data.id)
}

async function addMember(data)
{
    const date_of_birth=dateFormat(data.date_of_birth,"yyyy-mm-dd");
    console.log(data);
    await query(`INSERT INTO ${db}.members 
        VALUES ('${data.id}','${data.f_name}', '${data.l_name}','${date_of_birth}',
        '${data.phone}', '${data.mobyle_phone}','${data.address}')`);
    return (data.id);
}
    

export {
    getAllMembers,
    getMemberById,
    removeMember,
    addMember,
    updateMember
}
