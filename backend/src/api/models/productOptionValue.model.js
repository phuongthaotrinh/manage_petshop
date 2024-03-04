
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productOptionValueSchema = new mongoose.Schema({
    title: { tye: String  },
   option_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'ProductOption',
   },
    variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
    }

}, {
    collection: 'product_option_value',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductOptionValue = mongoose.model('ProductOptionValue', productOptionValueSchema);
export default ProductOptionValue;