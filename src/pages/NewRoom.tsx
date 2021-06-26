import { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import IllustrationImg from "../assets/illustration.svg";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = UseAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // trim remove os espaços em branco no começo e no final
    if (newRoom.trim() === "") {
      return;
    }

    // cria uma referencia/grupo no banco de dados
    const roomRef = database.ref("room");

    // salva os dados no banco de dados
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    // redireciona o usuário
    history.push(`/room/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
