import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";
//import AWS from "aws-sdk";
import multers3 from "multer-s3";

//const SpaceEndPoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');
/*const S3 = new AWS.S3({
    endpoint: SpaceEndPoint
})*/

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname,'../','../','tmp','uploads'),
        filename: (req, file, cb) => {
          crypto.randomBytes(16, (err, res) => {
              if(err) return cb(err);

              return cb(null, res.toString('hex') + extname(file.originalname));
          })
        },
    }),



    /*storage: multers3({
        S3 : S3,
        bucket: 'agendaai-space',
        acl: 'public-read',
        key: function (req, file, cb){
            cb(null, res.toString('hex') + extname(file.originalname));
        }
    })*/

}