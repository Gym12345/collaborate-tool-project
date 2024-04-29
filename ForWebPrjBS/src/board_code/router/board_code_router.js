const router = require("express").Router();
const codeCtrl = require("../controller/board_code_ctrl")
const multer = require("multer")


const stg = multer.diskStorage({
    destination : (req, file, cb) => {
        console.log("req :" , req.body)
        console.log("file:",file)
        console.log("cb :", cb)
        cb(null, "./code_file")
    },
    filename : (req, file, cb) =>{
        cb(null,file.originalname);
    }
})


const upLoad= //multer({storage : stg});
multer({storage : stg});
//code_form에 team목록 출력
router.get("/code_form", codeCtrl.codeView.renderCodeForm);//끝
//code목록 가져오는 랜딩
router.get("/code_title/:teamId", codeCtrl.prosess.getCodeList);//끝
router.get("/add_code", codeCtrl.codeView.complexity);//끝
//코드 추가 페이지
//router.post("/prosess", codeCtrl.prosess.proInt);
router.get("/boardDetail/:ID", codeCtrl.codeView.boardDetail);//끝
//router.post("/modify", codeCtrl.prosess.modify);
//file_router
router.post("/upload", upLoad.single("FILE_NAME"), codeCtrl.file_prosess.upload);//끝
router.get("/list", codeCtrl.codeView.list);//끝
router.get("/download/:fileName", codeCtrl.file_prosess.download);//끝
//delete 수정
router.get("/delete", codeCtrl.deleteM);//끝
//commend
router.post("/codeBoard_comments", codeCtrl.commend_prosess.commendInput);//끝
router.get("/getAllComments",codeCtrl.commend_prosess.getAllCo);//끝
router.get("/read-file/:fileN", codeCtrl.file_prosess.readFile);//끝
module.exports = router;