import { Link, useHistory } from "react-router-dom"

import { FormEvent , useState, useContext} from "react"
import { data } from "../services/firebase"
import { AuthContext } from "../contexts/AuthContext"

import IlustrationImg from "../assets/images/illustration.svg"
import Logo from "../assets/images/logo.svg"
import Button from "../components/Button"


import '../styles/auth.scss'



export default function Home (){
    const history = useHistory()

    const user = useContext(AuthContext)
    const [newRoom, setNewRoom] = useState('')

    
    async function handleCreateRoom(event : FormEvent){
        event.preventDefault()
        if(newRoom.trim() === ''){
            return;
        }

        const roomsRef = data.ref('rooms')

        const firebaseRoom = await roomsRef.push(
            {
                roomName: newRoom,
                authorID : user.user?.id
            }
        )

        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={IlustrationImg} alt="ilustration simbolizando perguntas e respostas"/>
                <strong>
                    Criar salas de Q&amp;A ao-vivo
                </strong>
                <p>
                    Tire as duvidas da sua audiencia em tempo real
                </p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={Logo} alt=" let me ask" />
                    <h2>Criar sala com o google</h2>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event =>{
                                setNewRoom(event.target.value)
                            }}
                            value={newRoom}
                         />
                         <Button type="submit">
                             Criar sala
                         </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala ja existente ? <Link to="/">clique aqui!</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}