import createHttpError from 'http-errors';

import RoleModel from "../models/roles.model";
import PermissionsModel from "../models/permissions.model";
import UserModel from "../models/user.model"
import slugify from "slugify";


// export const createRoleAndPer = async() => {
//     try {
//         const checkRole = await Roles.countDocuments();
//         const checkPermissions = await Permissions.countDocuments();
//         return checkRole
//     }catch (err){
//         console.log("Create Permission fail", err)
//     }
// }

export const createPermissions = async(payload) => {
    // const checkExist = await PermissionsModel.exists({name:payload.name});
    // if(checkExist) throw createHttpError.BadRequest("Permission exist");
    const data = await PermissionsModel.create(payload);
    return data
}
export const getPermissions = async() => {
    // const checkExist = await PermissionsModel.exists({name:payload.name});
    // if(checkExist) throw createHttpError.BadRequest("Permission exist");
    const data = await PermissionsModel.find();
    return data
}

export const getRoles = async() => {
    const data = await RoleModel.find();
    return data
}


export const createRole= async (payload) => {
    try {
        const existRole = await RoleModel.exists({name: payload.name});
        if(existRole) {
            throw createHttpError.BadRequest('Cannot duplicate role');
        }

       return await RoleModel.create({...payload, value: slugify(payload.name)})
    }catch (e) {
        console.log("fail", e);
        throw  e
    }
}


export const updateRole = async(payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if(!existRole) {
        console.log('not found role.')
    }
    return payload
}


export const deleteRole = async(payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if (!existRole) throw createHttpError.NotFound('Cannot find role to delete');
    return await RoleModel.deleteOne({_id: payload.id})
}


export const getRolesDetail = async(payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if (!existRole) throw createHttpError.NotFound('Cannot find role');

    const detail = await RoleModel.findOne({_id: payload.id});

}