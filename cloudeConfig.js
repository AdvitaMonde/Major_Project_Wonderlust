const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//variable any for cloude name,key,secret are by default (cloud_name), (api_key), (api_secret)
cloudinary.config({
  cloud_name : process.env.CLOUDE_NAME,
  api_key : process.env.CLOUDE_API_KEY,
  api_secret : process.env.CLOUDE_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderlust_DEV',
      allowerdFormats: ['png','jpg','jpeg'],
     
    },
  });

  module.exports={
    cloudinary,storage
  }