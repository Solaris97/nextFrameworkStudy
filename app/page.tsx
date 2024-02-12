import type { NextPage } from "next"

import { connectDB } from "./utils/database.tsx"

import { Db, Document } from "mongodb"

const MainPage: NextPage = async () => {

  const client = await connectDB;

  //forum DB 연결
  const db: Db = client.db("forum");
  try {
    //post 컬렉션에서 데이터 조회
    let result: Document[] = await db.collection('post').find().toArray();
    console.log(result);

  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <h1>Main Page</h1>
    </div>
  )

}

export default MainPage