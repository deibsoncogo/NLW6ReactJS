import { useEffect, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";

import "../styles/room.scss";

type FirebaseQuestionType = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}

type RoomParam = {
  roomId: string;
}

export function Room() {
  const { user } = UseAuth();
  const param = useParams<RoomParam>();
  const [newQuestion, setNewQuestion] = useState("");
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`room/${param.roomId}`);

    roomRef.once("value", (room) => {
      const databaseRom = room.val();
      const firebaseQuestion: FirebaseQuestionType = databaseRom.question ?? {};

      // converte um objeto em array
      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighLighted: value.isHighLighted,
        isAnswered: value.isAnswered,
      }));

      setTitle(databaseRom.title);
      setQuestion(parsedQuestion);
    });
  }, [param.roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("Você não está logado!");
    }

    const questionSend = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`room/${param.roomId}/question`).push(questionSend);

    setNewQuestion("");
  }

  return (
    <div id="pageRoom">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Letmeask" />
          <RoomCode code={param.roomId} />
        </div>
      </header>

      <main>
        <div className="roomTitle">
          <h1>Sala {title}</h1>
          <span>{question.length} pergunta{question.length > 1 && "s"}</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer pergunta?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="formFooter">
            { user ? (
              <div className="userInfo">
                <img src={user.avatar} alt="Foto do usuário" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        {JSON.stringify(question)}
      </main>
    </div>
  );
}
