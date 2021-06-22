import {createContext , useEffect ,useState, ReactNode} from 'react'
import { firebase , auth} from '../services/firebase'
type UserType = {
    id : string;
    name: string;
    avatar: string
}
  
type AuthContextType = {
    user : UserType | undefined;
    singInWithGoogle: () => Promise<void>;
} 

type AuthContextPoviderProps = {
    children:ReactNode,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextPovider(props:AuthContextPoviderProps){
    const [user,setUser] = useState<UserType>()

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user=>{
        if(user){
          const { displayName, photoURL, uid } = user 
          if(!displayName || !photoURL){
            throw new Error('missing information from google acount')
          }
          setUser(
            {
              id:uid,
              name:displayName,
              avatar:photoURL       
            }
          )
        }
      })
    
      return ()=>{
        unsubscribe()
      }
    },[])
  
    async function singInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
  
      const result = await auth.signInWithPopup(provider)
              
      if(result.user){
        const { displayName, photoURL, uid } = result.user    
        if(!displayName || !photoURL){
          throw new Error('missing information from google acount')
        }
        setUser(
          {
            id:uid,
            name:displayName,
            avatar:photoURL       
          }
        )
      }
         
  
    }
    return(
        <AuthContext.Provider value={{user, singInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    )
}