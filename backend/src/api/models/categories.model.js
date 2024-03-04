
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';


const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    images: {
        type: Array
    },
    status: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        lowercase: true,
    },
    desc: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})
categoriesSchema.plugin(mongooseLeanVirtuals)
categoriesSchema.plugin(mongooseAutoPopulate);

const CategoriesModel = mongoose.model('Categories', categoriesSchema);
export default CategoriesModel