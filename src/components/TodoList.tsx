import React from "react";
import { Flex, message } from "antd";
import { TodoItem } from "./TodoItem";
import { ITodo } from "../store/todos/types";

interface ItodoListProps {
  items: ITodo[];
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  saveTodo: (id: string, newTitle: string, newDescription: string) => void;
}

const TodoList: React.FC<ItodoListProps> = (props) => {
  const { items, toggleTodo, removeTodo, saveTodo } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const remove = () => {
    messageApi.open({
      type: "error",
      content: "Deleted",
    });
  };

  return (
    <Flex vertical gap={4}>
      {contextHolder}
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          saveTodo={saveTodo}
          remove={remove}
          {...todo}
        />
      ))}
    </Flex>
  );
};

export { TodoList };
