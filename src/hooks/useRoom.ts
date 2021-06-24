
import { useState , useEffect, useContext} from "react"
import { AuthContext } from "../contexts/AuthContext"

import { data } from '../services/firebase'

type QuestionsType = {
    id:string,
    author:{
        name:string,
        avatar:string,
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
    likeCount:number,
    likeId:string | undefined,
}

type FirebaseQuestions = Record<string ,{
    author:{
        name:string,
        avatar:string,
    },
    content:string,
    isAnswered:boolean,
    isHighlighted:boolean,
    like:Record<string,{
        authorId:string,
    }>
}>

export function useRoom( roomId: string){

    const user = useContext(AuthContext)

    const [questions, setQuestions]= useState<QuestionsType[]>([])
    const [title, setTitle]=useState('')

    useEffect(()=>{
        const roomRef = data.ref(`rooms/${roomId}`)


        roomRef.on('value', room => {

            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions
            const parsedQuestions = Object.entries(firebaseQuestions ?? {}  ).map(([key,value])=>{
                return {
                    id:key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.like ?? {} ).length,
                    likeId: Object.entries(value.like ?? {} ).find(([key,like]) => like.authorId === user.user?.id)?.[0]
                }
            })
            setTitle(databaseRoom?.title)
            setQuestions(parsedQuestions)
        })

        return()=>{
            roomRef.off("value")
        }

    },[roomId,user.user?.id])

    return{
        questions,
        title
    }
}