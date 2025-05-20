import cloudinaryPackage from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = cloudinaryPackage.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
}

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
        if(result && result.secure_url) {
            return resolve(result.secure_url)
        }
        return reject({message: error.message})
    })
  });
};

export default uploadImage