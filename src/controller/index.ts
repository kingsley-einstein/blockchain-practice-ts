import express from "express";
import { v4 as uuid } from "uuid";
import { BlockChain } from "../helpers";
import { CustomError } from "../custom";

const chain = new BlockChain();

export class MainController {
 static async generateUserId(req: express.Request, res: express.Response) {
  try {
   const id = uuid();
   res.status(201).json({
    code: 201,
    response: id
   });
  } catch (error) {
   res.status(500).json({
    code: 500,
    response: error.message
   });
  }
 }

 static async createBlock(req: express.Request, res: express.Response) {
  try {
   const { body } = req;
   const block = await chain.addBlock({
    owner: body.owner,
    transactions: [{
     sender: body.owner,
     receiver: body.receiver,
     amount: body.amount
    }]
   });
   const isValidChain = await chain.chainIsValid();
   if (!isValidChain) {
    throw new CustomError(400, "Chain is not valid");
   }
   res.status(201).json({
    code: 201,
    response: block
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }

 static async getBlocks(req: express.Request, res: express.Response) {
  try {
   const response = await chain.getBlocks();
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(500).json({
    code: 500,
    response: error.message
   });
  }
 }

 static async findBlockById(req: express.Request, res: express.Response) {
  try {
   const { id } = req.params;
   const response = await chain.findBlockById(id);
   if (!response) throw new CustomError(404, "Block not found");
   res.status(200).json({
    code: 200,
    response
   });
  } catch (error) {
   res.status(error.code || 500).json({
    code: error.code || 500,
    response: error.message
   });
  }
 }
}
