
import mongoose, { connection } from "mongoose";


export async function connect() {

    try {

        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MongooDB connected");

            connection.on('error',(err)=>{
                console.log("Mongodb connection error please make sure db is up and running:" + err)
                process.exit()
            })

        })
    }catch(error){
        console.log("something went wrong in connecting to db",error)

   
    }
    
}