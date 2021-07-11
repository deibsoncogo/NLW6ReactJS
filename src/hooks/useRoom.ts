import { useEffect, useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";

type FirebaseQuestionType = Record<string, {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  like: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function UseRoom(roomId: string) {
  const { user } = UseAuth();
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`room/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestionType = databaseRoom.question ?? {};

      // converte um objeto em array
      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.like ?? {}).length,
        likeId: Object.entries(value.like ?? {}).find(([, like]) => like.authorId === user?.id)?.[0],
      }));

      setTitle(databaseRoom.title);
      setQuestion(parsedQuestion);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { question, title };
}
