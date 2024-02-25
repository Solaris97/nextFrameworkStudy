import type { NextPage } from "next";

import { connectDB } from "../../utils/database.tsx";

import { Db, Document, ObjectId } from "mongodb";

//인터페이스 정의
interface EditPageProps {
  params: Params;
}

interface Params {
  id: string;
}

const EditPage: NextPage<EditPageProps> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const client = await connectDB;

  //조회된 결과 값을 불러오는 Document Type 변수 선언
  let edit!: Document;

  //forum DB 연결
  const db: Db = client.db("forum");

  //post 컬렉션에서 params으로 가져 온 고유키에 해당하는 값 조회
  try {
    //고유키로 object를 찾을 수 없다면 오류 처리
    if (
      (await db
        .collection("post")
        .findOne({ _id: new ObjectId(params.id) })) === null ||
      undefined
    ) {
      console.log("data missing");
    } else {
      edit = await db
        .collection("post")
        .findOne({ _id: new ObjectId(params.id) });
    }
  } catch (err) {
    //실패시 에러 출력
    console.log(err);
  }

  return (
    <div className="flex flex-col justify-center items-center h-[1200px] w-full">
      <h4>수정페이지</h4>
      <h4>{edit.title}</h4>
      <form
        action="/api/edit"
        method="POST"
        className="flex flex-col justify-center items-center h-[600px] w-[500px]"
      >
        <input type="hidden" name="_id" value={edit._id.toString()} />
        <input
          name="content"
          placeholder="내용"
          className="w-full h-[400px] border"
          defaultValue={edit.content}
        />
        <button type="submit"> 전송</button>
      </form>
    </div>
  );
};

export default EditPage;
