import type { NextApiRequest, NextApiResponse } from "next";

import { connectDB } from "../../app/utils/database.tsx";
import { ObjectId } from "mongodb";

import { Db } from "mongodb";

//글 수정 API
//API 폴더의 위치는 app/api/{API명칭}(앱 라우팅) Next 13버전 이후로 지원
//root/pages/api 위치로 잡을 수 있는데 app 폴더 하위에 생성 시 form Data 조회 시 문제가 발생하는 에러가 있어
//안정성을 위해 root 경로 아래 위치 시킴

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDB;

  //forum DB 연결
  const db: Db = client.db("forum");
  //POST Method로 form Data 받음
  if (req.method == "POST") {
    //정상 처리시 201 / 에러 발생시 400
    if (
      req.body.content == "" ||
      req.body.content == undefined ||
      req.body.content == null
    ) {
      res.status(400).json({ message: "content Error" });
    }
    try {
      await db.collection("post").updateOne(
        {
          _id: new ObjectId(req.body._id)
        },
        { $set: { content: req.body.content } }
      );
    } catch {
      res.status(400).json({ message: "update Error" });
    }
    // res.status(200).json({ message: "update Completed" });
    res.redirect(302, "/list");
  }
};

export default handler;
