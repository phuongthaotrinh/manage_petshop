
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountSchema = new mongoose.Schema({
   code:{
       type: String,
       require:true
   },
    rule_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountRule',
    },
    is_dynamic: {
        type: Boolean
    },
    is_disable: {
        type: Boolean
    },
    starts_at:{
       type: Date
    },
    ends_at:{
       type: Date
    },
    usage_limit:{
       type: Number,
        require: true,
        default: 1
    },
    usage_count:{
        type: Number,
        default: 0
    },
    valid_duration:{
       type:String
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Discount = mongoose.model('Discount', discountSchema);
export default Discount;