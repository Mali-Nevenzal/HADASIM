import express from "express";
import { memberRouter } from "./router/memberRouter.js"
import { covidRouter } from "./router/covidRouter.js"
import { vaccinatedRouter } from "./router/vaccinatedRouter.js";
import { vaccinationRouter } from "./router/vaccinationRouter.js";

import config from "./config.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
app.use('/members', memberRouter);
app.use('/member/covid', covidRouter);
app.use('/member/vaccinated', vaccinatedRouter);
app.use('/member/vaccination',vaccinationRouter)

app.listen(config.port, () => {
    console.log(`app in port ${config.port}`)
})