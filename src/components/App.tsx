import React from "react";
import { useSelector } from "react-redux";
import { Flex, FloatButton } from "antd";
import Title from "antd/es/typography/Title";
import { setItems } from "../store/todos/slice";
import { RootState, useAppDispatch } from "../store";
import { Form } from "./Form";
import { Counter } from "./Counter";
import { TodoList } from "./TodoList";
import { ITodo } from "../store/todos/types";

const App: React.FC = () => {
  const items = useSelector((state: RootState) => state.todo.items);
  const dispatch = useAppDispatch();

  const newItems = JSON.parse(sessionStorage.getItem("items")!);

  const removeTodo = (id: string): void => {
    dispatch(setItems(items.filter((item) => item.id !== id)));
    sessionStorage.setItem(
      "items",
      JSON.stringify(newItems.filter((newItem: ITodo) => newItem.id !== id))
    );
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
    sessionStorage.setItem(
      "items",
      JSON.stringify(
        newItems.map((newItem: ITodo) => {
          if (newItem.id !== id) return newItem;

          return {
            ...newItem,
            complete: !newItem.complete,
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
    sessionStorage.setItem(
      "items",
      JSON.stringify(
        newItems.map((newItem: ITodo) => {
          if (newItem.id !== id) return newItem;

          return {
            ...newItem,
            title: newTitle,
            description: newDescription,
          };
        })
      )
    );
  };

  return (
    <Flex
      vertical
      gap={8}
      style={{
        padding: 8,
      }}
    >
      <Title level={4}>Todo List</Title>
      <Form items={newItems} />
      <TodoList
        items={newItems}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        saveTodo={saveTodo}
      />

      <Flex
        justify="space-between"
        style={{
          padding: 16,
        }}
      >
        {items.length > 4 && <Counter items={items} />}
        <FloatButton.BackTop
          style={{
            right: 24,
            bottom: 24,
          }}
        />
      </Flex>
    </Flex>
  );
};

export { App };
