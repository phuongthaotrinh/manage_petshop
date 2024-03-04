
import 'dotenv/config'
import mongoose from 'mongoose'
import slugify from "slugify";
import {toSentenceCase} from "../../helpers/toSentenceCase";
const productAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        capitalize: true
    },
    status:{
        type: Boolean,
        default: true
    },

    attributes: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            atbStt:{
                type: Boolean,
                default: false
            },
            slug:{
                type: String,
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductAttribute = mongoose.model('ProductAttribute', productAttributeSchema);
export default ProductAttribute;