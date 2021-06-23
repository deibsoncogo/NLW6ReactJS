import { useHistory } from "react-router-dom";
import GoogleIconImg from "../assets/google-icon.svg";
import IllustrationImg from "../assets/illustration.svg";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { UseAuth } from "../contexts/AuthContext";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = UseAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/room/new");
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
          <button onClick={handleCreateRoom} className="createRoom">
            <img src={GoogleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
