import { useParams } from "react-router-dom";
import AnswerImag from "../assets/answer.svg";
import CheckImg from "../assets/check.svg";
import DeleteImg from "../assets/delete.svg";
import { Header } from "../components/Header";
import { Question } from "../components/Question";
import { UseRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/adminRoom.scss";

type RoomParamType = {
  roomId: string;
}

export function AdminRoom() {
  const param = useParams<RoomParamType>();
  const { question, title } = UseRoom(param.roomId);

  // ordena as questões por quantidade de likes, destacadas por primeiro e lida por último
  question.sort((questionA, questionB) => {
    const questionAIsHighlightedNumber = questionA.isHighlighted ? 0 : 1;
    const questionBIsHighlightedNumber = questionB.isHighlighted ? 0 : 1;

    const questionAIsAnsweredNumber = questionA.isAnswered ? 0 : 1;
    const questionBIsAnsweredNumber = questionB.isAnswered ? 0 : 1;

    return questionBIsAnsweredNumber - questionAIsAnsweredNumber
    || questionAIsHighlightedNumber - questionBIsHighlightedNumber
    || questionB.likeCount - questionA.likeCount;
  });

  async function HandleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`room/${param.roomId}/question/${questionId}`).remove();
    }
  }

  async function HandleToggleCheckQuestionAsAnswered(questionId: string) {
    const roomRef = await database.ref(`room/${param.roomId}/question/${questionId}`).get();
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isAnswered: !roomRef.val().isAnswered });
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isHighlighted: false });
  }

  async function HandleToggleHighlightQuestion(questionId: string) {
    const roomRef = await database.ref(`room/${param.roomId}/question/${questionId}`).get();
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isHighlighted: !roomRef.val().isHighlighted });
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isAnswered: false });
  }

  return (
    <div id="adminRoom">
      <Header roomId={param.roomId} pageAdmin />

      <main>
        <div className="roomTitle">
          <h1>{title}</h1>
          <span>{question.length} pergunta{question.length > 1 && "s"}</span>
        </div>

        <div className="questionList">
          {question.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              questionId={question.id}
              likeId={question.likeId}
              likeCount={question.likeCount}
              isAdmin
            >
              <button type="button" onClick={() => HandleToggleCheckQuestionAsAnswered(question.id)}>
                <img src={CheckImg} alt="Marcar pergunta como respondida" />
              </button>

              <button type="button" onClick={() => HandleToggleHighlightQuestion(question.id)}>
                <img src={AnswerImag} alt="Dar destaque a pergunta" />
              </button>

              <button type="button" onClick={() => HandleDeleteQuestion(question.id)}>
                <img src={DeleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
