const studentCreate = require('../services/studentservice');

const  studentcontroller = async (req , res) => {
    try {
        const {name , email , mobile } = req.body;
    if(!name || ! email || !mobile){
             return "All field are required"
        }
        const studentdata = await studentCreate(name , email , mobile);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}