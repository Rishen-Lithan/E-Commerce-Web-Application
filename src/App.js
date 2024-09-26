import "./App.css"
import Pages from "./components/pages/Pages"
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Pages />
    </Router>
  );
}

export default App
