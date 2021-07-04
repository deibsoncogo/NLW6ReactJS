import { useHistory, useParams } from "react-router-dom";
import AnswerImag from "../assets/answer.svg";
import CheckImg from "../assets/check.svg";
import DeleteImg from "../assets/delete.svg";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { UseRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParamType = {
  roomId: string;
}

export function AdminRoom() {
  const history = useHistory();
  const param = useParams<RoomParamType>();
  const { question, title } = UseRoom(param.roomId);

  async function HandleEndRoom() {
    await database.ref(`room/${param.roomId}`).update({ endedAt: new Date() });
    history.push("/");
  }

  async function HandleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`room/${param.roomId}/question/${questionId}`).remove();
    }
  }

  async function HandleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isAnswered: true });
  }

  async function HandleHighLightQuestion(questionId: string) {
    await database.ref(`room/${param.roomId}/question/${questionId}`).update({ isHighLighted: true });
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />

          <div>
            <RoomCode code={param.roomId} />
            <Button isOutlined onClick={HandleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          <span>{question.length} pergunta{question.length > 1 && "s"}</span>
        </div>

        <div className="questionList">
          {question.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighLighted={question.isHighLighted}
            >
              {!question.isAnswered && (
                <>
                  <button type="button" onClick={() => HandleCheckQuestionAsAnswered(question.id)}>
                    <img src={CheckImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button type="button" onClick={() => HandleHighLightQuestion(question.id)}>
                    <img src={AnswerImag} alt="Dar destaque a pergunta" />
                  </button>
                </>
              )}

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
