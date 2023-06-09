const File = require('../model/file.model');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads')
    }
    ,
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: (req, file, cb) =>{
        const types = /csv|xlsx|doc|docx|pdf/;
        const extName = types.test(path.extname(file.originalname).toLowerCase());
        const mimeType = types.test(file.mimetype);
        if(extName && mimeType){
            cb(null, true)
        }else{
            cb(new Error('Only support csv, xlsx, doc, docx, pdf file'))
        }
    }
}).single('file');


const fileController = {
    //upload
    uploadFile: async (req, res) => {
        try {
          upload(req, res, async (err) => {
            if (err) {
              return res.status(400).json({ msg: err.message });
            }
            //GET FILE INFO FROM REQ.FILE
            const fileName = req.file.originalname;
            const fileCode = req.file.filename;
            const fileType = req.file.mimetype;
            const fileSize = req.file.size;


            const fileUrl = req.file.path;
            const newFile = new File({
              fileName,
              fileCode,
              fileUrl,
              fileType,
              fileSize,
            });
            File.findOne({ fileName: fileName }, (err, file) => {
                if (err) {
                    return res.status(400).json({ msg: err.message });
                }
                if (file) {
                    return res.status(400).json({ msg: 'File already exists',
                    file: file });
                }else{
                    newFile.save()

                    return res.json({ msg: 'Upload file success' });
                }
            });
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
    
    
    //get all file
    getAllFile: async (req, res) =>{
        try{
            const files = await File.find();
            res.json(files)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    //delete file
    deleteFile: async (req, res) =>{
        try{
            await File.findByIdAndDelete(req.params.id);
            res.json({msg: 'Delete file success'})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    downloadFile(req, res, next){
        File.findById(req.params.id, (err, file) =>{
            if(err){
                return res.status(400).json({msg: err.message})
            }
            if(!file){
                return res.status(400).json({msg: 'File not found'})
            }
            res.download(file.fileUrl, file.fileName)
        })
    },
    getFileInfo(req, res, next){
        File.findById(req.params.id, (err, file) =>{
            if(err){
                return res.status(400).json({msg: err.message})
            }
            if(!file){
                return res.status(400).json({msg: 'File not found'})
            }
            res.json(file)
        })
    }
 
};


module.exports = fileController;