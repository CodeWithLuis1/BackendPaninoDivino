import { Request, Response } from "express";
export declare const createUser: (req: Request, res: Response) => Promise<any>;
export declare const getUser: (req: Request, res: Response) => Promise<void>;
export declare const getUserById: (req: Request, res: Response) => Promise<any>;
export declare const updateUser: (req: Request, res: Response) => Promise<any>;
export declare const deleteUser: (req: Request, res: Response) => Promise<any>;
