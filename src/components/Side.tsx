import IllustrationImg from "../assets/illustration.svg";
import { UseAuth } from "../contexts/AuthContext";
import "../styles/side.scss";

export function Side() {
  const { user } = UseAuth();

  function HandleLogoffUser() {
    console.log(45);
  }

  return (
    <div id="side">
      <main>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />

        <strong>Crie salas de perguntas para eventos on-line</strong>
        <p>As perguntas poderão ser respondidas conforme a quantidade de likes</p>
      </main>

      {/* { user && <button type="button" onClick={HandleLogoffUser}>Fazer logoff</button>} */}
    </div>

  );
}
