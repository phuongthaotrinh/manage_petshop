
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';



const servicesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    status: {
        type: Boolean,
        default: true
    },
    desc:{
        type: String,
    },

}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})


const ServicesModel = mongoose.model('Services', servicesSchema);
export default ServicesModel;
// servicesSchema.plugin(mongooseLeanVirtuals)
// servicesSchema.plugin(mongooseAutoPopulate);