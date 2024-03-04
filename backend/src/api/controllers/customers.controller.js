import 'dotenv/config'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import { validateSigninData } from "../validation/customers.validation";
import * as UserService from '../services/customers.service'
import { customersGender, customersRole } from "../../constants/customers";
import { useCatchAsync } from "../../helpers/useCatchAsync"
import { HttpStatusCode } from '../../configs/statusCode.config'


// [POST] /api/customers/new-account
export  const createNewAccount = useCatchAsync(async (req, res) => {
    const { error } = validateSigninData(req.body);
    if (error) {
        throw createHttpError.BadRequest(error.message);
    }
    const newUser = await UserService.createNewAccount({ ...req.body, role: customersRole.CUSTOMERS });
    const token = jwt.sign({ auth: newUser.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    return res.status(HttpStatusCode.OK).json({
        data: newUser,
        token: token
    });
})


// [POST] /api/customers/new-account
export  const getAllCustomers = useCatchAsync(async (req, res) => {
    const data = await UserService.getAllCustomers();
    return res.status(HttpStatusCode.OK).json({
        data: data,
    });
})