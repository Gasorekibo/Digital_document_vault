import expressAsyncHandler from 'express-async-handler';
import fs from 'fs';
import cloudinaryUploadPhoto from '../utils/cloudinary.js';
import FileModel from '../models/file.js';
// -------------- UPLOAD ------------

const uploadDocsController = expressAsyncHandler(async (req, res) => {
  const { _id } = req.session.user;
  const localPath = `public/images/document/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadPhoto(localPath);
  try {
    const file = await FileModel.create({
      ...req.body,
      user: _id,
      file: imgUploaded?.url,
    });

    // Remove saved uploaded image from local file
    res.status(200).json(file);
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

export { uploadDocsController };
