import { Request, Response } from "express";
export declare const createCategory: (req: Request, res: Response) => Promise<any>;
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const getCategoryById: (req: Request, res: Response) => Promise<any>;
export declare const updateCategory: (req: Request, res: Response) => Promise<any>;
export declare const deleteCategory: (req: Request, res: Response) => Promise<any>;
