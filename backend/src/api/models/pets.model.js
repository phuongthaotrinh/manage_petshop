
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const petsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  status:{
    type: Boolean
  },
  icon:{
    type:String
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})
petsSchema.plugin(mongooseLeanVirtuals)
petsSchema.plugin(mongooseAutoPopulate);

const PetsModel = mongoose.model('Pet', petsSchema);
// PetsModel.createIndexes()
export default PetsModel