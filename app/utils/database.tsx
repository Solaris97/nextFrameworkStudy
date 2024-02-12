import { MongoClient } from "mongodb"

//특수문자 인코딩
const username: string = encodeURIComponent(process.env.NEXT_PUBLIC_USER_NAME);
const password: string = encodeURIComponent(process.env.NEXT_PUBLIC_USER_PASSWORD);

const url: string = `mongodb+srv://${username}:${password}@cluster0.lbcrocu.mongodb.net/?retryWrites=true&w=majority`

let connectDB: Promise<MongoClient>;
connectDB = new MongoClient(url).connect()

export { connectDB }
