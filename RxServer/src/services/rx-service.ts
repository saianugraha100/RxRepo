/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "../models/index.js";
const rxDataModel = db.rxData;
const Op = db.Op;

// Create and Save a new rxDataModel
export const create = (rxData: any) => {
  return new Promise((resolve, reject) => {
    // Save rxDataModel in the database
    rxDataModel.create(rxData)
        .then((data: any) => {
            resolve(data);
        })
        .catch((err: { message: any; }) => {
            reject({
                message:
                err.message || "Some error occurred while creating the rxDataModel."
            });
    });
  });
};

// Retrieve all rx data from the database.
export const findAll = (synopsis: any) => {
  const condition = synopsis ? { synopsis: { [Op.iLike]: `%${synopsis}%` } } : null;

  return new Promise((resolve, reject) => {
    rxDataModel.findAll({ where: condition })
        .then((data: any) => {
            resolve(data);
        })
        .catch((err: { message: any; }) => {
            reject({
                message:
                err.message || "Some error occurred while retrieving rx data."
            });
        });
  });
};

// Find a single rxDataModel with an id
export const findOne = (id: any) => {
  return new Promise((resolve, reject) => {
    rxDataModel.findByPk(id)
        .then((data: any) => {
            resolve(data);
        })
        .catch((err: any) => {
        console.log(err);
            reject({
                message: "Error retrieving rxDataModel with id=" + id
            });
        });
    });
};

// Update a rxDataModel by the id in the request
export const update = (id: any, rxData: any) => {
  return new Promise((resolve, reject) => {
    rxDataModel.update(rxData, {
        where: { id: id }
    })
    .then((num: number) => {
        if (num == 1) {
            resolve({
                message: "rxDataModel was updated successfully."
            });
        } else {
            resolve({
                message: `Cannot update rxDataModel with id=${id}. Maybe rxDataModel was not found or req.body is empty!`
            });
        }
    })
    .catch((err: any) => {
        console.log(err);
        reject({
            message: "Error updating rxDataModel with id=" + id
        });
    });
  });
};

// Delete a rxDataModel with the specified id in the request
export const deleteRx = (id: any) => {
  return new Promise((resolve, reject) => {
    rxDataModel.destroy({
        where: { id: id }
    })
        .then((num: number) => {
        if (num == 1) {
            resolve({
                message: "rxDataModel was deleted successfully!"
            });
        } else {
            resolve({
                message: `Cannot delete rxDataModel with id=${id}. Maybe rxDataModel was not found!`
            });
        }
        })
        .catch((err: any) => {
            console.log(err);
            reject({
                message: "Could not delete rxDataModel with id=" + id
            });
        });
  });
};

// Delete all rx data from the database.
export const deleteAll = () => {
  return new Promise((resolve, reject) => {
    rxDataModel.destroy({
        where: {},
        truncate: false
    })
    .then((nums: any) => {
        resolve({ message: `${nums} rx data deleted successfully!` });
    })
    .catch((err: { message: any; }) => {
        reject({
            message:
            err.message || "Some error occurred while removing rx data."
        });
    });
  });
};