import mongoose from 'mongoose';

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    required: true,
  },
});

module.exports = mongoose.model('Article', articleSchema);
