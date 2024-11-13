import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/signup" exact component={RegistrationPage} />
        <ProtectedRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
