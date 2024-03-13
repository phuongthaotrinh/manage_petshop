
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountConditionProductSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    condition_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountCondition',
    }
}, {
    collection: 'discount_condition_product',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DiscountConditionGroup = mongoose.model('DiscountConditionGroup', discountConditionProductSchema);
export default DiscountConditionGroup;