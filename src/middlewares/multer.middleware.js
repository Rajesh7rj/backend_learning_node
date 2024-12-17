import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) /
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname) // this is not a good way because user can have same file name but we can use uniqesuffix and file name like above code 
}
  })
  
  
 export const upload = multer({ 
    storage
 });