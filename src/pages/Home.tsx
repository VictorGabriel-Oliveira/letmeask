
import { useContext } from "react"
import { useHistory } from "react-router-dom"

import { AuthContext } from '../contexts/AuthContext'
import IlustrationImg from "../assets/images/illustration.svg"
import Logo from "../assets/images/logo.svg"
import GoogleIcon from '../assets/images/google-icon.svg'
import Button from "../components/Button"



import '../styles/auth.scss'

export default function Home (){
    const history = useHistory()
    const {user, singInWithGoogle } = useContext(AuthContext)

    async function handleCreateRoom(){
            if(!user){
                await singInWithGoogle() 
                }

            history.push('/rooms/newroom')
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={GoogleIcon} alt="logo do google" />
                        crie sua sala com o google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form >
                        <input 
                            type="text"
                            placeholder="Digite o codigo da sala"
                         />
                         <Button type="submit">
                             Entrar na sala
                         </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}