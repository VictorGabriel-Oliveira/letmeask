
import { FormEvent, useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'

import imageLogo from '../assets/images/logo.svg'
import Button from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { AuthContext } from '../contexts/AuthContext'
import { data } from '../services/firebase'
 

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string ,{
    author:{
        name:string,
        avatar:string,
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
}>
type Questions = {
    id:string,
    author:{
        name:string,
        avatar:string,
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
}
export function Room(){

    const  user = useContext(AuthContext)

    const params = useParams<RoomParams>()
    const roomId = params.id

    const [newQuestion, setNewQuestion]= useState('')
    const [questions, setQuestions]= useState<Questions[]>([])
    const [title, setTitle]=useState('')

    useEffect(()=>{
        const roomRef = data.ref(`rooms/${roomId}`)


        roomRef.on('value', room => {

            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions 
            const parsedQuestions = Object.entries(firebaseQuestions ?? {}  ).map(([key,value])=>{
                return {
                    id:key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })


    },[roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('you must logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name : user.user?.name,
                avatar: user.user?.avatar
            },
            isHighlighted: false,
            isAnswered: false,

        }

        await data.ref(`rooms/${roomId}/questions`).push(question)
        setNewQuestion('')
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={imageLogo} alt="logo" />
                    <RoomCode code={roomId}/>
                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {
                        questions.length > 0 && <span> {questions.length} pergunta(s)</span>
                    }
                    
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="oque vc quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.user?.avatar} alt={user.user?.name} />
                                <span>{user.user?.name}</span>
                            </div>
                        ):(
                            <span>para enviar uma pergunta, <button>faça seu loguin</button>.</span>
                        )}
                        
                        <Button disabled={!user} type="submit">Enviar pergunta</Button>
                    </div>
                </form>

                <span> {JSON.stringify(questions)}</span>
            </main>
        </div>
    )
}