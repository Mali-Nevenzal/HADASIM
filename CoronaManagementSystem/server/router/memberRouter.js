import express, { json } from "express";
import {addMember, getAllMembers,updateMember} from '../service/memberService.js';
import { getMemberById } from "../service/memberService.js";
import { removeMember } from "../service/memberService.js";

const memberRouter = express.Router();


memberRouter.get('/', async function(req,res,next)
{
    try {
        res.json(await getAllMembers());
      } catch (err) {
        console.error(`there are not members`, err.message);
        next(err);
      }
});

memberRouter.get("/:memberId", async function (req, res, next) {
    let memberId = req.params.memberId;
    try {
      res.json(await getMemberById(memberId));
    } catch (err) {
      console.error(`The server can not get this member`, err.message);
      next(err);
    }
  });

memberRouter.delete("/removeMember/:memberId", async function (req, res, next) {
  let memberId = req.params.memberId;
  try {
    res.json(await removeMember(memberId));
  } catch (err) {
    console.error(`The server can not delete this member`, err.message);
    next(err);
  }
})  


memberRouter.post("/", async function (req, res, next) {
  try {
    res.json(await addMember(req.body));
  } catch (err) {
    console.error(`The server can not add this member`, err.message);
    next(err);
  }
});


memberRouter.put("/:memberId", async function (req, res, next) {
  try {
    res.json(await updateMember(req.body));
  } catch (err) {
    console.error(`The server can not add this member`, err.message);
    next(err);
  }
});

export {
    memberRouter
}

