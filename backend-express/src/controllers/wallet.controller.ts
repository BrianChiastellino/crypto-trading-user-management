import { Request, Response, NextFunction } from "express";

import { BadRequestError } from "../errors/bad-request.error";


import { Wallet } from "../models/wallet.model";
import { WalletDTO } from "../dtos/wallet.dto";
import { walletRepository } from "../repositories/wallet.repository";

import walletService from "../services/wallet.service";


class WalletController {

    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const { id: userID } = req.userPayloadDTO;
            const walletDTO: WalletDTO = req.body;

            const walletExists = await walletService.getByUserID(userID)

            if (!!walletExists)
                throw new BadRequestError('Wallet already exists');

            const [walletCreated] = [walletRepository.create({
                ...walletDTO,
                userID: userID
            })].flat();

            console.log({ walletCreated });

            const wallet = await walletService.create(walletCreated);

            res.status(201).json(wallet);

        } catch (error) {
            next(error);
        };

    };

    async get(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;
            const wallet = await walletService.get(id);

            console.log({ wallet });

            if (!id || !wallet)
                throw new BadRequestError('Wallet not found');

            res.status(201).json(wallet);

        } catch (error) {
            next(error);
        };

    };

    async update(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;
            const wallet = await walletService.get(id);

            if (!id || !wallet)
                throw new BadRequestError('Wallet not found');

            const updatedFieldsWallet: Partial<Wallet> = {}

            // Asignamos los campos disintos a updatedFieldsUser
            Object.keys(req.body).forEach((key) => {
                const typedKey = key as keyof Wallet;                 // Convertimos a una clave válida de Wallet
                if (req.body[typedKey] !== wallet[typedKey]) {
                    updatedFieldsWallet[typedKey] = req.body[typedKey];
                }
            });

            // Si no se realizaron cambios, salimos de la funcion update y no llamamos a la base de datos
            if (Object.keys(updatedFieldsWallet).length === 0)
                return;

            await walletService.update(id, updatedFieldsWallet);

            const updatedWallet = await walletService.get(id);

            res.status(200).json(updatedWallet);

        } catch (error) {
            next(error);
        };

    };

    async delete(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;
            const wallet = await walletService.get(id);

            if (!id || !wallet)
                throw new BadRequestError('Wallet not found');

            await walletService.delete(id);

            res.status(200).json(`Wallet with id ${id} was eliminated succesful`);

        } catch (error) {
            next(error);
        };

    };

}


export default new WalletController();