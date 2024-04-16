import express from 'express'
import * as RoleAndPerController from "../controllers/roleNPermission.controller";
import {createPermissions, createRole, createRoleAndPer} from "../controllers/roleNPermission.controller";


const router = express.Router();

// router.get('/checkRoleAndPer',RoleAndPerController.createRoleAndPer)
router.post('/roles/createRole',RoleAndPerController.createRole);
router.delete('/roles/delete-role/:id',RoleAndPerController.deleteRole);
router.get('/roles/get-roles', RoleAndPerController.getRoles);
router.post('/permissions/create-permission', RoleAndPerController.createPermissions);
router.get('/permissions/get-permissions', RoleAndPerController.getPermissions)
export default router