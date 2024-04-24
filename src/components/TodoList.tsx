import React from "react";
import { Flex } from "antd";
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

  return (
    <Flex vertical gap={4}>
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          saveTodo={saveTodo}
          {...todo}
        />
      ))}
    </Flex>
  );
};

export { TodoList };
