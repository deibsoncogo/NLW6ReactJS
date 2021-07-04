import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/room/new" component={NewRoom} exact />
          <Route path="/room/:roomId" component={Room} exact />
          <Route path="/admin/room/:roomId" component={AdminRoom} exact />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
