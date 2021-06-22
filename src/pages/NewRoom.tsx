import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"


import IlustrationImg from "../assets/images/illustration.svg"
import Logo from "../assets/images/logo.svg"
import Button from "../components/Button"


import '../styles/auth.scss'


export default function Home (){

    const {user} = useContext(AuthContext)

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
                    <form >
                        <input 
                            type="text"
                            placeholder="Nome da sala"
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