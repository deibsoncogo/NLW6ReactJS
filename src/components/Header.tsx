import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CopyImg from "../assets/copy.svg";
import LogoImg from "../assets/logo.svg";
import { UseAuth } from "../contexts/AuthContext";
import { database } from "../services/firebase";
import "../styles/header.scss";

type HeaderType = {
  roomId: string;
  pageAdmin?: boolean;
}

type ParamsType = {
  roomId: string;
}

export function Header({ roomId, pageAdmin }: HeaderType) {
  const { user } = UseAuth();
  const history = useHistory();
  const param = useParams<ParamsType>();
  const [endRoom, setEndRoom] = useState(Boolean);

  function HandleCopyRoomCode() {
    navigator.clipboard.writeText(roomId);
  }

  function HandleSendPageHome() {
    history.push("/");
  }

  async function HandleToggleStatusRoom() {
    const roomRef = await database.ref(`room/${param.roomId}`).get();

    if (roomRef.val().authorId !== user?.id) {
      alert("Você não é administrador desta sala!");
      return;
    }

    if (roomRef.val().endedAt) {
      await database.ref(`room/${param.roomId}/endedAt`).remove();
    } else {
      await database.ref(`room/${param.roomId}`).update({ endedAt: new Date() });
    }

    setEndRoom(!endRoom);
  }

  useEffect(() => {
    (async () => {
      const roomRef = await database.ref(`room/${param.roomId}`).get();
      setEndRoom(roomRef.val().endedAt);
    })();
  }, [param.roomId]);

  return (
    <div id="header">
      <button className="logoLetmeask" type="button" onClick={HandleSendPageHome}>
        <img src={LogoImg} alt="Letmeask" />
      </button>

      <div>
        <button className="roomCode" type="button" onClick={HandleCopyRoomCode}>
          <div>
            <img src={CopyImg} alt="Copiar código da sala" />
          </div>

          <span>ID #{roomId}</span>
        </button>

        {pageAdmin && (
        <button className="closeRoom" onClick={HandleToggleStatusRoom}>
          {endRoom ? "Reabrir" : "Encerrar"} sala
        </button>
        )}
      </div>
    </div>
  );
}
