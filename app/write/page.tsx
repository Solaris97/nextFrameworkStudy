import type { NextPage } from "next"

const WritePage: NextPage = async () => {

    return (
        <div>
            <h4>글 작성</h4>
            <form action="/api/write" method="POST">
                <ul>
                    <li>
                        <label>글 제목</label>
                        <input className="border" name="title"></input>
                    </li>
                    <li>
                        <label>글 내용</label>
                        <input className="border" name="content"></input>
                    </li>
                </ul>
                <button type="submit">버튼</button>
            </form>
        </div>
    )

}

export default WritePage