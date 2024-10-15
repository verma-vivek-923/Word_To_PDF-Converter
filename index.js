import express from "express"
import multer  from'multer'
import docxtopdf from 'docx-pdf';
import path  from "path"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

dotenv.config();


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json())

const PORT=process.env.PORT || 4000;

//storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null,file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/home', upload.single('file'), (req, res, next) =>{
    try {

        if(!req.file){
            return res.status(400).json({
                message:"no file uploaded"
            });
        }

        //output path
        let outPath=path.join(__dirname,"files",`${req.file.originalname}.pdf`)

        docxtopdf(req.file.path,outPath,(err,result)=>{
            if(err){
              return res.status(500).json({
                message:"Error in convertion"
              })
             
            }
            res.download(outPath,()=>{
            })
          });
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
        
    }
  })

  //deployment
if(process.env.NODE_ENV === "production"){
  const dirPath=path.resolve();
  app.use(express.static("frontend/dist"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"frontend","dist","index.html"))
  })
}

app.listen(PORT, () => {
})