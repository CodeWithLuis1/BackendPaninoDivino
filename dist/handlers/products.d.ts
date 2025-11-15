import { Request, Response } from "express";
export declare const createProduct: (req: Request, res: Response) => Promise<any>;
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<any>;
export declare const getProductFull: (req: Request, res: Response) => Promise<any>;
export declare const getProductIngredients: (req: Request, res: Response) => Promise<any>;
export declare const updateProduct: (req: Request, res: Response) => Promise<any>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<any>;
