import express, { json } from "express";
import { addSickMember, getCovidDetails,getAllCoronaPatients} from "../service/covidService.js";
import { updatePatient, removePatient} from "../service/covidService.js";

const covidRouter = express.Router();


covidRouter.get('/', async function(req,res,next)
{
    try {
        res.json(await getAllCoronaPatients());
      } catch (err) {
        console.error(`there are not corona patients`, err.message);
        next(err);
      }
});

covidRouter.get('/:memberId', async function (req, res, next) {
    let memberId = req.params.memberId;
    try {
      res.json(await getCovidDetails(memberId));
    } catch (err) {
      console.error(`The server can not get this member`, err.message);
      next(err);
    }
  })

  covidRouter.post('/', async function (req, res, next) {
    try {
        res.json(await addSickMember(req.body));
    } catch (err) {
        console.error(`Error while creating covid history`, err.message);
        next(err);
    }
  });

  covidRouter.delete("/removePatient/:memberId", async function (req, res, next) {
    let memberId = req.params.memberId;
    try {
      res.json(await removePatient(memberId));
    } catch (err) {
      console.error(`The server can not delete this Corona patient`, err.message);
      next(err);
    }
  }) 

  covidRouter.put("/:memberId", async function (req, res, next) {
    try {
      console.log(req.body);
      res.json(await updatePatient(req.body));
    } catch (err) {
      console.error(`The server can not add this member`, err.message);
      next(err);
    }
  });

export {
    covidRouter
}