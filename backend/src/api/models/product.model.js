
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productSchema = new mongoose.Schema({
    title:{type: String, required: true, unique: true, trim:true},
    subtitle:{type: String},
    desc:{type: String},
    handle:{type:String, unique: true},
    status:{type:String, enum: Object.values(productStatus), default: productStatus.DRAFT},
    thumbnail: {type:String, required: true},
    material:{type: String},
    discountable:{type:Boolean, default: false},
    width:{type: String},
    height:{type: String},
    weight:{type: String},
    length:{type: String},
    metadata:{type: String},

}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Product = mongoose.model('Product', productSchema);
export default Product;