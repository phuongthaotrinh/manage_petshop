import express from 'express'
import {createNewAccount, getAllCustomers}  from '../controllers/customers.controller'
const router = express.Router();


router.post('/customers/new-account',createNewAccount)
router.get('/customers/get-all',getAllCustomers)

export default router