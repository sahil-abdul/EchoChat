import mongoose from "mongoose"

async function main(){
    try {
        const data = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.APP_NAME}`)
        console.log("databse connected succeessfully");
    } catch (error) {
        console.log("error in db connectivity : ",error)
    }
}

export default main;