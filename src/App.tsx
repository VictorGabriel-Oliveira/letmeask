import { BrowserRouter,Route } from "react-router-dom";
import {AuthContextPovider} from './contexts/AuthContext'
import Home from "./pages/Home";

import NewRoom from './pages/NewRoom'

function App() {


  return (
    <BrowserRouter>
      <AuthContextPovider>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/newroom" component={NewRoom}/>
        </AuthContextPovider>
    </BrowserRouter>
  );
}


export default App;
