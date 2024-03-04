
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';


const newsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  images: {
    type: Array
  },
  tags: {
    type: Array
  },
  preview: {
    type: String
  },
  content: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    lowercase: true,
  },


}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})
newsSchema.plugin(mongooseLeanVirtuals)
newsSchema.plugin(mongooseAutoPopulate);

const NewsModel = mongoose.model('News', newsSchema);
// NewsModel.createIndexes()
export default NewsModel