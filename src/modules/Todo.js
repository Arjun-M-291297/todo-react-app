import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Box,
  Flex,
  Checkbox,
  Card,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import AddToDo from "../components/AddToDo";
import "./Todo.css";
import { DeleteIcon } from "@chakra-ui/icons";

// '1'-Pending '2'-Completed
let todoId = 0;
let deleteCount = 0;
const Todo = () => {
  const [todoList, updateList] = useState([]);
  const [delList, updateDelList] = useState([]);
  const addToDo = (todo) => {
    if(todo){
    const newRecord = { id: todoId, name: todo, status: '1' };
    updateList([newRecord, ...todoList]);
    todoId++;
    }
  };
  const filteredDoList = (status) => {
    if (status) return todoList.filter((item) => item.status === status);
    return todoList;
  };
  const deleteTodo = (todo) => {
    const updatedList = todoList.filter((item) => item.id !== todo.id);
    updateList(updatedList);
    updateDelList([...delList,todo])
    deleteCount++;
  };
  const doneTodo = (e, todo) => {
    const updatedList = todoList.map((item) => {
      if (item.id === todo.id) {
        return { ...item, status: e.target.checked ? '2' : '1' };
      }
      return item;
    });
    updateList(updatedList);
  };
  return (
    <div>
      <div className="app-container">
        <div>
          <AddToDo addToDoParent={addToDo} />
        </div>
        <div>
          <Flex justify="center">
            <Box w="600px" pt={10}>
              <Tabs>
                <TabList>
                  <Tab>All [{todoList.length + delList.length}]</Tab>
                  <Tab>Pending [{filteredDoList('1').length}]</Tab>
                  <Tab>Completed [{filteredDoList('2').length}]</Tab>
                  <Tab>Deleted [{deleteCount}]</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Card>
                      <CardBody>
                        {filteredDoList(0).length > 0 && (
                          <Stack divider={<StackDivider />} spacing="4">
                            {filteredDoList(0).map((todo) => (
                              <span key={todo.id}>
                                <Checkbox colorScheme="green" isChecked={todo.status === '2'} onChange={(e) => doneTodo(e, todo)} ></Checkbox>
                                <span className={todo.status === '2' ? 'checkbox strike':'checkbox'}>{todo.name}</span>
                                <DeleteIcon w={5} h={5} onClick={() => deleteTodo(todo)} color="red.500" />
                              </span>
                            ))}
                          </Stack>
                        )}
                        {filteredDoList(0).length === 0 && <span>No Tasks Added</span>}
                      </CardBody>
                    </Card>
                  </TabPanel>
                  <TabPanel>
                    <Card>
                      <CardBody>
                        {filteredDoList('1').length > 0 && (
                          <Stack divider={<StackDivider />} spacing="4">
                            {filteredDoList('1').map((todo) => (
                              <span key={todo.id}>{todo.name}</span>
                            ))}
                          </Stack>
                        )}
                        {filteredDoList('1').length === 0 && <span>No Pending Tasks</span>}
                      </CardBody>
                    </Card>
                  </TabPanel>
                  <TabPanel>
                    <Card>
                      <CardBody>
                        {filteredDoList('2').length > 0 && (
                          <Stack divider={<StackDivider />} spacing="4">
                            {filteredDoList('2').map((todo) => (
                              <span key={todo.id}>{todo.name}</span>
                            ))}
                          </Stack>
                        )}
                        {filteredDoList('2').length === 0 && <span>No Completed Tasks</span>}
                      </CardBody>
                    </Card>
                  </TabPanel>
                  <TabPanel>
                    <Card>
                      <CardBody>
                      {delList.length > 0 && (
                          <Stack divider={<StackDivider />} spacing="4">
                            {delList.map((todo) => (
                              <span key={todo.id}>{todo.name}</span>
                            ))}
                          </Stack>
                        )}
                        {delList.length === 0 && <span>No Deleted Tasks</span>}
                      </CardBody>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Todo;
