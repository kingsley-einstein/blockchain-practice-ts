import express from "express";
import router from "../router";
import logger from "morgan";

export default (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({
  extended: false
 }));
 app.use(logger("dev"));
 app.use("/api/v1", router);
};
