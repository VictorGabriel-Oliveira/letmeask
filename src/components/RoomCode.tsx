import CopyImg from '../assets/images/copy.svg'
import '../styles/roomCode.scss'

type RoomCodeProps ={
    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button  className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={CopyImg} alt=" copy room code" />
            </div>
            <span>sala #{props.code}</span>
        </button>
    )
}