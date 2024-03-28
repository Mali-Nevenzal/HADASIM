import express, { json } from "express";
import { getVaccinatedDetails,getAllVaccinated,addVaccinatedPatient } from "../service/vaccinatedService.js";
import { removeVaccinatedPatient, updateVaccinatedPatient } from "../service/vaccinatedService.js";

const vaccinatedRouter = express.Router();

vaccinatedRouter.get('/', async function(req,res,next)
{
    try {
        res.json(await getAllVaccinated());
      } catch (err) {
        console.error(`there are not vaccinated patients`, err.message);
        next(err);
      }
});

vaccinatedRouter.get("/:memberId", async function (req, res, next) {
    let memberId = req.params.memberId;
    try {
      res.json(await getVaccinatedDetails(memberId));
    } catch (err) {
      console.error(`The server can not get this vaccinated patient`, err.message);
      next(err);
    }
  });

  
  vaccinatedRouter.post('/', async function (req, res, next) {
    try {
        res.json(await addVaccinatedPatient(req.body));
    } catch (err) {
        console.error(`Error while creating vaccinated patient`, err.message);
        next(err);
    }
  });

  vaccinatedRouter.delete("/removeVaccinated/:memberId/:vaccine_id", async function (req, res, next) {
    let memberId = req.params.memberId;
    let vaccineId=req.params.vaccine_id;
    try {
      res.json(await removeVaccinatedPatient(memberId,vaccineId));
    } catch (err) {
      console.error(`The server can not delete this vaccinated patient`, err.message);
      next(err);
    }
  }) 

  vaccinatedRouter.put("/", async function (req, res, next) {
    try {
      console.log(req.body);
      res.json(await updateVaccinatedPatient(req.body));
    } catch (err) {
      console.error(`The server can not add this vaccinated patient`, err.message);
      next(err);
    }
  });

  export {
    vaccinatedRouter
} 