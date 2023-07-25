import React, { useState } from "react";
import {Input, Button } from "@chakra-ui/react";
import "../modules/Todo.css";

const AddToDo = ({addToDoParent}) => {
  const [todo, setTodo] = useState("");
  const handleToDoUpdate = (e) => {
    setTodo(e.target.value);
  };
  const addToDo = () =>{
    addToDoParent(todo)
    setTodo('');
  }
  return (
    <div className="input-container">
      <Input placeholder="Add a new task" size="sm" value={todo} onChange={handleToDoUpdate} />
      <Button colorScheme="blue" onClick={addToDo}>
        +
      </Button>
    </div>
  );
};

export default AddToDo;
