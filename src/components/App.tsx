import React from "react";
import { useSelector } from "react-redux";
import { Flex, FloatButton } from "antd";
import Title from "antd/es/typography/Title";
import { setItems } from "../store/todos/slice";
import { RootState, useAppDispatch } from "../store";
import { Form } from "./Form";
import { Counter } from "./Counter";
import { TodoList } from "./TodoList";

const App: React.FC = () => {
  const items = useSelector((state: RootState) => state.todo.items);
  const dispatch = useAppDispatch();

  const removeTodo = (id: string): void => {
    dispatch(setItems(items.filter((item) => item.id !== id)));
  };

  const toggleTodo = (id: string): void => {
    dispatch(
      setItems(
        items.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            complete: !item.complete,
          };
        })
      )
    );
  };

  const saveTodo = (
    id: string,
    newTitle: string,
    newDescription: string
  ): void => {
    dispatch(
      setItems(
        items.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            title: newTitle,
            description: newDescription,
          };
        })
      )
    );
  };

  return (
    <Flex vertical gap={8}>
      <Title level={4}>Todo List</Title>
      <Form items={items} />
      <TodoList
        items={items}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        saveTodo={saveTodo}
      />

      <div style={{ display: "flex", height: 60 }}>
        <FloatButton.BackTop
          style={{
            right: 20,
            bottom: 20,
          }}
        />
        {items.length > 4 && <Counter items={items} />}
      </div>
    </Flex>
  );
};

export { App };
