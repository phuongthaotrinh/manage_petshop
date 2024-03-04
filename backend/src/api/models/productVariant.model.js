
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productVariantSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    title:{
        type:String,
        required: true
    }
}, {
    collection: 'product_variant',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);
export default ProductVariant;