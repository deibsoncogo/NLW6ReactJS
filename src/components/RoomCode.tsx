import CopyImg from "../assets/copy.svg";

import "../styles/roomCode.scss";

type RoomCodeType = {
  code: string;
}

export function RoomCode(props: RoomCodeType) {
  function handleCopyRoomCode() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="roomCode" onClick={handleCopyRoomCode}>
      <div>
        <img src={CopyImg} alt="Copiar código da sala" />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}
