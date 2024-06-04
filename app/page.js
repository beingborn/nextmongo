import { connectDB } from "./util/database.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth].js";

export const revaildate = 60; // 페이지 단위 캐싱 예약 변수

export default async function Home() {
  let session = await getServerSession(authOptions); // 서버 컴포넌트, 서버 기능 안에서 사용

  // 해당 날짜 출력
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  let currentDate = `${year}년 ${month}월 ${day}일`;

  // DB 연결
  let client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="inner">
      <div className="main-visual">
        <div className="main-bg">
          <img src="/main-visual.png"></img>
        </div>
        <div className="main-visual-txt">
          <p>WIDELY</p>
          <h2>READING</h2>
        </div>
        <div className="main-subtxt">
          <p>KOREA NO.1</p>
          <p>ARTICLE NEWSLETTER</p>
        </div>
        <div className="main-subtxt2">
          <p>* brocolli</p>
          <p>세상을 바라보는 눈을 브로콜리하다.</p>
        </div>
      </div>

      <div className="user-hello">
        <p style={{ color: "gray" }}>{currentDate}</p>

        <>
          {session ? (
            <p className="user-name">
              안녕하세요{" "}
              <span className="user-strong">{session.user.name}</span>님 좋은
              하루에요!
            </p>
          ) : (
            <p>안녕하세요 좋은 하루입니다!</p>
          )}
        </>
      </div>
      {result.slice(0, 3).map((item, i) => (
        <div className="list-item" key={i}>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.author}</p>
        </div>
      ))}
    </div>
  );
}
