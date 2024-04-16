import RolesModel from "../models/roles.model";
import PermissionsModel from "../models/permissions.model";
import slugify from "slugify";
import UserModel from "../models/user.model";
import WeightsModel from "../models/weight.model";
import ServicesModel from "../models/services.model";
import {weights} from  "../../constants/weight";
import {services} from "../../constants/services"


export const createAdminServer = async (payload) => {
   try {
       const countPer = await PermissionsModel.countDocuments();
       const countRole = await RolesModel.countDocuments();
       const customerCount = await UserModel.countDocuments()

       if(countPer === 0 && countRole === 0 && customerCount === 0){
           const newPer =  await PermissionsModel.create({
               name: "PERMISSION.SYSTEM.ALL",
               status: true
           });

           const newRole = await RolesModel.create({
               name: "Super Admin",
               value: slugify("Super Admin"),
               permissions:[newPer._id]
           });
            await UserModel.create({
               email: payload.email,
               password:payload.password,
               username:payload.username,
               role: [newRole._id],
               isVerified:true
           });
            // await WeightsModel.insertMany(weights)
            // await ServicesModel.insertMany(services)
       }

       if(countPer === 1 && countRole ===1){
           const role = await RolesModel.findOne();
           return await UserModel.create({
               email: payload.email,
               password:payload.password,
               username:payload.username,
               role: [role._id],
               isVerified:true
           });

       }
       return  {message: "Your website is ready!!"}

   }catch (e) {
       console.log("fail", e)
   }
}

