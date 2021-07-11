import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleIconImg from "../assets/google-icon.svg";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Side } from "../components/Side";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";
import "../styles/home.scss";

export function Home() {
  const history = useHistory();
  const { user, SignInWithGoogle } = UseAuth();
  const [roomCode, setRoomCode] = useState("");

  async function HandleCreateRoom() {
    if (!user) {
      await SignInWithGoogle();
    }

    history.push("/room/new");
  }

  async function HandleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      alert("Digite o código de uma sala válida!");
      return;
    }

    const roomRef = await database.ref(`room/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Não existe uma sala com esté código!");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Está sala foi encerrada pelo administrador!");
      return;
    }

    if (roomRef.val().authorId === user?.id) {
      history.push(`/admin/room/${roomCode}`);
    } else {
      history.push(`/room/${roomCode}`);
    }
  }

  return (
    <div id="home">
      <Side />

      <main>
        <div className="mainContent">
          <img className="logoLetmeask" src={LogoImg} alt="Letmeask" />

          <button className="createRoom" onClick={HandleCreateRoom}>
            <img src={GoogleIconImg} alt="Logo do Google" />
            Acesso administrador com o Google
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
