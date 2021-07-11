import LogoImg from "../assets/logo.svg";
import { Side } from "../components/Side";
import { UseAuth } from "../contexts/AuthContext";
import "../styles/allRoom.scss";

export function AllRoom() {
  const { user } = UseAuth();

  return (
    <div id="allRoom">
      <Side />

      <main>
        <header>
          <div className="user">
            <img className="avatar" src={user?.avatar} alt="Foto do usuário" />
            <p>{user?.name}</p>
          </div>

          <img className="logoLetmeask" src={LogoImg} alt="Letmeask" />
        </header>

        <div className="mainContent">
          <h2>Estás são as salas que você administra!</h2>

        </div>
      </main>
    </div>
  );
}
