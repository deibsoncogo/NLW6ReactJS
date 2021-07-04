import { ReactNode } from "react";
import "../styles/question.scss";

type QuestionType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}

export function Question({ content, author, children }: QuestionType) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="userInfo">
          <img src={author.avatar} alt="Foto do usuário" />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
}
