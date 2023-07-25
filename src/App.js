import "./App.css";
import Todo from "./modules/Todo";
function App() {
  return (
    <div className="App">
      <div className="todo-head">
        <h1><span className="fc-yellow">Todo</span>App.</h1>
      </div>
      <Todo />
    </div>
  );
}

export default App;
