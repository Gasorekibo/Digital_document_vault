import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

const FileModel = mongoose.model('File', fileSchema);

export default FileModel;
