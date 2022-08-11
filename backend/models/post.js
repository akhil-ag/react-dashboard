
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let postSchema = new Schema({
  post_id: {
    type: Number
  },
  meta_key: {
    type: String
  },
  meta_value: {
    type: String
  }
}, {
    collection: 'postmetas'
  })
  
  postSchema.set('versionKey', false);
module.exports = mongoose.model('postmetas', postSchema)