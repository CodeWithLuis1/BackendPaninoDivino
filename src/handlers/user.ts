import { Request, Response } from "express";
import User from "../models/User.model.js";


export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json({ data: user });
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json({ data: users });
    } catch (error) {
        console.log(error)
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        res.json({data: user})
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        //update user
        await user.update(req.body)
        await user.save()

        res.json({data: user})
};

export const deleteUser = async (req: Request, res: Response) => {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
        await user.destroy();
        res.json({message: 'Usuario eliminado'})
};