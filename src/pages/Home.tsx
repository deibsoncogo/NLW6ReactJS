import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleIconImg from "../assets/google-icon.svg";
import IllustrationImg from "../assets/illustration.svg";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";
import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = UseAuth();
  const [roomCode, setRoomCode] = useState("");

  async function HandleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/room/new");
  }

  async function HandleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`room/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Sala não existe!");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Sala fechada!");
      return;
    }

    history.push(`/room/${roomCode}`);
  }

  return (
    <div id="pageAuth">
      <aside>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="mainContent">
          <img src={LogoImg} alt="Letmeask" />
          <button onClick={HandleCreateRoom} className="createRoom">
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={HandleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
