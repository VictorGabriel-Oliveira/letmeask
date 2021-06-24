
import { FormEvent, useContext } from 'react'

import { useState } from 'react'
import { useParams } from 'react-router'

import imageLogo from '../assets/images/logo.svg'
import imageDelete from '../assets/images/delete.svg'


import Button from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Questions } from '../components/Questions'
import { AuthContext } from '../contexts/AuthContext'
import { data } from '../services/firebase'
 

import '../styles/room.scss'
import { useRoom } from '../hooks/useRoom'
import { useHistory } from 'react-router-dom'

type RoomParams = {
    id: string;
}



export function AdminRoom(){

    const  user = useContext(AuthContext)

    const params = useParams<RoomParams>()
    const roomId = params.id

    const history = useHistory()
    const [newQuestion, setNewQuestion]= useState('')
    const{title, questions} = useRoom(roomId)
   
    

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('tem certeza que deseja remover essa pergunta')){
            await data.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
        

    }

    async function handleEndRoom(){
        await data.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }
   

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
                    <div>
                        <RoomCode code={roomId}/>
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                   
                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {
                        questions.length > 0 && <span> {questions.length} pergunta(s)</span>
                    }
                    
                </div>
                <div className="question-list">
                    {questions.map(question =>{
                        return (
                            
                            <Questions
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    onClick={()=>{
                                        handleDeleteQuestion(question.id)
                                    }}
                                    type="button"
                                    
                                >
                                    <img src={imageDelete} alt="remover perguntas" />
                                </button>
                            </Questions>
                            
                        )
                    })}
                </div>

                
            </main>
        </div>
    )
}