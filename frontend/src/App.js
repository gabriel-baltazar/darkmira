import Home from "./pages/Home"
import Nav from "./components/Nav"
import Agendamento from "./pages/Agendamento"
import Adm from "./pages/Adm"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
function App (){
  return(
    <BrowserRouter>
    <Nav/>
    <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/agendamento" component={Agendamento} />
          <Route path="/adm" component={Adm} />
          <Route path='*' component={Home} />
      </Switch>
    </BrowserRouter>
    
    );
  

}
export default App