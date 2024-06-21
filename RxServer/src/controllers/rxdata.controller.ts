/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as rxService from "../services/rx-service.js";

// Create and Save a new rxDataModel
export const create = async (req: any, res: any) => {
  // Validate request
  if (!req.body.synopsis) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rxDataModel
  const rxData = {
    synopsis: req.body.synopsis,
    description: req.body.description,
    dosage: req.body.dosage
  };
  try{
    const data = await rxService.create(rxData);
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};

// Retrieve all rx data from the database.
export const findAll = async (req: any, res: any) => {
  const synopsis = req.query.synopsis;
  try{
    const data = await rxService.findAll(synopsis);
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};

// Find a single rxDataModel with an id
export const findOne = async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
  const id = req.params.id;

  try{
    const data = await rxService.findOne(id);
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};

// Update a rxDataModel by the id in the request
export const update = async (req: { params: { id: any; }; body: any; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
  const id = req.params.id;

  try{
    const data: any = await rxService.update(id, req.body);
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};

// Delete a rxDataModel with the specified id in the request
export const deleteRx = async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
  const id = req.params.id;
  try{
    const data = await rxService.deleteRx(id);
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};

// Delete all rx data from the database.
export const deleteAll = async (req: any, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }) => {
  try{
    const data = await rxService.deleteAll();
    res.send(data);
  } catch(err) {
    res.status(500).send(err);
  }
};