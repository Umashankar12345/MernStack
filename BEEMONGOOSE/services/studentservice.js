const student = require('../models/user');

const studentCreate = async (name , email , mobile) => {

    //const data = async(name , email , mobile) => {
        const studentData = await new student({name , email , mobile});
        return  studentData;
}
    module.exports = {studentCreate, data}