import type { NextPage } from "next";

import Link from "next/link";

import { connectDB } from "../utils/database.tsx";

import { Db, Document } from "mongodb";

const ListPage: NextPage = async () => {
  const client = await connectDB;

  //글목록 배열 선언
  let listArray!: Document[];

  //forum DB 연결
  const db: Db = client.db("forum");
  try {
    //post 컬렉션에서 데이터 조회
    listArray = await db.collection("post").find().toArray();
  } catch (err) {
    //실패시 에러 출력
    console.log(err);
  }

  return (
    <div className="bg-slate-200 w-full h-auto p-4">
      {/* 조회된 글의 갯수만큼 출력 */}
      {listArray.map((title: Document, index: number) => (
        <div className="w-60 h-32 p-6 mb-2 rounded-md bg-white shadow-md">
          {/* 영역 선택시 고유키로 동적 라우팅 */}
          <Link
            href={{
              pathname: `/detail/${listArray[index]._id}`,
            }}
          >
            <h1 className="text-3xl font-bold">{listArray[index].title}</h1>
          </Link>
          <Link
            href={{
              pathname: `/edit/${listArray[index]._id}`,
            }}
          >수정</Link>
          <p className="mt-1 text-1xl text-gray-500">1월 1일</p>
        </div>
      ))}
    </div>
  );
};

export default ListPage;
