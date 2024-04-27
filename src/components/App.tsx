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

  let newItems = items;
  const data = sessionStorage.getItem("items");
  if (data) {
    newItems = JSON.parse(data);
  }

  const removeTodo = (id: string): void => {
    function remove(items: ITodo[]) {
      return items.filter((item) => item.id !== id);
    }

    dispatch(setItems(remove(items)));
    sessionStorage.setItem("items", JSON.stringify(remove(newItems)));
  };

  const toggleTodo = (id: string): void => {
    function toggle(items: ITodo[]) {
      return items.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          complete: !item.complete,
        };
      });
    }

    dispatch(setItems(toggle(items)));
    sessionStorage.setItem("items", JSON.stringify(toggle(newItems)));
  };

  const saveTodo = (
    id: string,
    newTitle: string,
    newDescription: string
  ): void => {
    function save(items: ITodo[]) {
      return items.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          title: newTitle,
          description: newDescription,
        };
      });
    }

    dispatch(setItems(save(items)));
    sessionStorage.setItem("items", JSON.stringify(save(newItems)));
  };

  return (
    <Flex
      vertical
      gap={8}
      style={{
        padding: 8,
        maxWidth: 560,
        margin: "0 auto",
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
        {newItems.length > 4 && <Counter items={newItems} />}
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
