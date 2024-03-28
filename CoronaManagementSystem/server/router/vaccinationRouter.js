import express, { json } from "express";
import { getVaccinationDetails } from "../service/vaccinationService.js";
import { getAllVaccinations,addVaccination } from "../service/vaccinationService.js";
import { removeVaccination,updateVaccination } from "../service/vaccinationService.js";

const vaccinationRouter = express.Router();

vaccinationRouter.get('/', async function(req,res,next)
{
    try {
        res.json(await getAllVaccinations());
      } catch (err) {
        console.error(`there are not vaccinated patients`, err.message);
        next(err);
      }
});

vaccinationRouter.get("/:vaccinationId", async function (req, res, next) {
    let vaccinationId = req.params.vaccinationId;
    try {
      res.json(await getVaccinationDetails(vaccinationId));
    } catch (err) {
      console.error(`The server can not get this member`, err.message);
      next(err);
    }
  });

  
  vaccinationRouter.post('/', async function (req, res, next) {
    try {
        res.json(await addVaccination(req.body));
    } catch (err) {
        console.error(`Error while creating vaccination`, err.message);
        next(err);
    }
  });

  vaccinationRouter.delete("/removeVaccinated/:vaccine_id", async function (req, res, next) {
    let vaccineId=req.params.vaccine_id;
    try {
      res.json(await removeVaccination(vaccineId));
    } catch (err) {
      console.error(`The server can not delete this vaccination`, err.message);
      next(err);
    }
  }) 

  vaccinationRouter.put("/", async function (req, res, next) {
    try {
      console.log(req.body);
      res.json(await updateVaccination(req.body));
    } catch (err) {
      console.error(`The server can not add this vaccination`, err.message);
      next(err);
    }
  });

export{
    vaccinationRouter
}