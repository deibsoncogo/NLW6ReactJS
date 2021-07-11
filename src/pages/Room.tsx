import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Question } from "../components/Question";
import { UseAuth } from "../contexts/AuthContext";
import { UseRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";

type RoomParamType = {
  roomId: string;
}

export function Room() {
  const { user, SignInWithGoogle } = UseAuth();
  const param = useParams<RoomParamType>();
  const [newQuestion, setNewQuestion] = useState("");
  const { question, title } = UseRoom(param.roomId);
  const [endRoom, setEndRoom] = useState(Boolean);

  // ordena as questões por quantidade de likes, destacadas por primeiro e lida por último
  question.sort((questionA, questionB) => {
    const questionAIsHighlightedNumber = questionA.isHighlighted ? 0 : 1;
    const questionBIsHighlightedNumber = questionB.isHighlighted ? 0 : 1;

    const questionAIsAnsweredNumber = questionA.isAnswered ? 0 : 1;
    const questionBIsAnsweredNumber = questionB.isAnswered ? 0 : 1;

    return questionBIsAnsweredNumber - questionAIsAnsweredNumber
    || questionAIsHighlightedNumber - questionBIsHighlightedNumber;
  });

  async function HandleSignIn() {
    if (!user) {
      await SignInWithGoogle();
    }
  }

  async function HandleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      alert("Você não está logado!");
      return;
    }

    const roomRefEndedAt = await database.ref(`room/${param.roomId}/endedAt`).get();

    if (roomRefEndedAt) {
      alert("O administrador encerrou a sala!");
      return;
    }

    const questionSend = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`room/${param.roomId}/question`).push(questionSend);

    setNewQuestion("");
  }

  useEffect(() => {
    (async () => {
      const roomRef = await database.ref(`room/${param.roomId}`).get();
      setEndRoom(roomRef.val().endedAt);
    })();
  }, [param.roomId]);

  return (
    <div id="room">
      <Header roomId={param.roomId} />

      <main>
        <div className="roomTitle">
          <h1>{title}</h1>
          <span>{question.length} pergunta{question.length > 1 && "s"}</span>
        </div>

        <form onSubmit={HandleSendQuestion}>
          <textarea
            placeholder={!endRoom ? "O que você quer pergunta?" : "A sala foi encerrada pelo administrador!"}
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
            disabled={endRoom}
          />

          <div className="formFooter">
            { user ? (
              <div className="userInfo">
                <img src={user.avatar} alt="Foto do usuário" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button onClick={HandleSignIn}>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user || endRoom}>Enviar pergunta</Button>
          </div>
        </form>

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
            />
          ))}
        </div>
      </main>
    </div>
  );
}
