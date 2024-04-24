import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Flex, Button, Input } from "antd";
import { AppstoreAddOutlined, ClearOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../store";
import { ITodo } from "../store/todos/types";
import { setItems } from "../store/todos/slice";
import { Counter } from "./Counter";

interface IFormProps {
  items: ITodo[];
}

const Form: React.FC<IFormProps> = ({ items }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const dispatch = useAppDispatch();

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleChangeDescription: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleClickClearForm = () => {
    setTitle("");
    setDescription("");
  };

  const addTodo = () => {
    if (title && description) {
      dispatch(
        setItems([
          ...items,
          {
            id: uuidv4(),
            title: title,
            description: description,
            complete: false,
          },
        ])
      );
      sessionStorage.setItem(
        "items",
        JSON.stringify([
          ...items,
          {
            id: uuidv4(),
            title: title,
            description: description,
            complete: false,
          },
        ])
      );
      setTitle("");
      setDescription("");
    }
  };
  return (
    <Flex vertical gap={8}>
      <Input
        name="title"
        type="text"
        value={title}
        maxLength={20}
        onChange={handleChangeTitle}
        placeholder="Title..."
      />
      <Input.TextArea
        value={description}
        name="description"
        maxLength={100}
        onChange={handleChangeDescription}
        placeholder="Description..."
      />
      <Flex justify="space-between" wrap="wrap" gap={8}>
        <Flex gap={8}>
          <Button
            type="primary"
            icon={<AppstoreAddOutlined />}
            disabled={!title || !description}
            onClick={addTodo}
          >
            Add todo
          </Button>
          <Button
            danger
            icon={<ClearOutlined />}
            disabled={!title && !description}
            onClick={handleClickClearForm}
          />
        </Flex>
        <Counter items={items} />
      </Flex>
    </Flex>
  );
};

export { Form };
