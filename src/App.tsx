import { BrowserRouter,Route, Switch } from "react-router-dom";
import {AuthContextPovider} from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom";
import Home from "./pages/Home";

import NewRoom from './pages/NewRoom'
import { Room } from "./pages/Room";

function App() {


  return (
    <BrowserRouter>
      <AuthContextPovider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/newroom" exact component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
        </AuthContextPovider>
    </BrowserRouter>
  );
}


export default App;
