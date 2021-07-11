import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Side } from "../components/Side";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";
import "../styles/newRoom.scss";

export function NewRoom() {
  const { user } = UseAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // trim remove os espaços em branco no começo e no final
    if (newRoom.trim() === "") {
      alert("Digite um nome para conseguir criar uma sala!");
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
    history.push(`/admin/room/${firebaseRoom.key}`);
  }

  return (
    <div id="newRoom">
      <Side />

      <main>
        <div className="mainContent">
          <img className="logoLetmeask" src={LogoImg} alt="Letmeask" />

          <h2>Olá {user?.name}, deseja criar uma nova sala?</h2>

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
            Para acessar uma sala,
            <Link to="/">clique aqui</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
