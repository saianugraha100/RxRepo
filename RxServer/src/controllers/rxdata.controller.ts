/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "../models/index.js";
const rxDataModel = db.rxData;
const Op = db.Op;

// Create and Save a new rxDataModel
export const create = (req: any, res: any) => {
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

  // Save rxDataModel in the database
  rxDataModel.create(rxData)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rxDataModel."
      });
    });
};

// Retrieve all Tutorials from the database.
export const findAll = (req: any, res: any) => {
  const synopsis = req.query.synopsis;
  const condition = synopsis ? { synopsis: { [Op.iLike]: `%${synopsis}%` } } : null;

  rxDataModel.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single rxDataModel with an id
export const findOne = (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const id = req.params.id;

  rxDataModel.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving rxDataModel with id=" + id
      });
    });
};

// Update a rxDataModel by the id in the request
export const update = (req: { params: { id: any; }; body: any; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const id = req.params.id;

  rxDataModel.update(req.body, {
    where: { id: id }
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "rxDataModel was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rxDataModel with id=${id}. Maybe rxDataModel was not found or req.body is empty!`
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating rxDataModel with id=" + id
      });
    });
};

// Delete a rxDataModel with the specified id in the request
export const deleteRx = (req: { params: { id: any; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const id = req.params.id;

  rxDataModel.destroy({
    where: { id: id }
  })
    .then((num: number) => {
      if (num == 1) {
        res.send({
          message: "rxDataModel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rxDataModel with id=${id}. Maybe rxDataModel was not found!`
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete rxDataModel with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
export const deleteAll = (req: any, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  rxDataModel.destroy({
    where: {},
    truncate: false
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};