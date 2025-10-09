import { Response, Request } from "express";
import Contract from "../models/Contract.model.js";

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.create(req.body);
    res.json({ data: contract });
  } catch (error) {
    console.log(error);
  }
};

export const getContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await Contract.findAll();
    res.json({ data: contracts });
  } catch (error) {
    console.log(error);
  }
};
export const getContractById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.json({ data: contract });

  } catch (error) {
    console.log(error);
  }
};
export const updateContract = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contract = await Contract.findByPk(id);
  if (!contract) {
    return res.status(404).json({ message: "Contrato no encontrado" });
  }
    //update contract
    await contract.update(req.body);
    await contract.save();
    res.json({ data: contract });
};

export const deleteContract = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contract = await Contract.findByPk(id);
  if (!contract) {
    return res.status(404).json({ message: "Contrato no encontrado" });
  }
  await contract.destroy();
  res.json({ message: "Contrato eliminado" });
}