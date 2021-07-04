import { ReactNode } from "react";
import cx from "classnames";
import "../styles/question.scss";

type QuestionType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({ content, author, isAnswered = false, isHighLighted = false, children }: QuestionType) {
  return (
    <div className={cx("question", { answered: isAnswered }, { highlighted: isHighLighted && !isAnswered })}>
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
