import React from "react";
import { ITodo } from "../store/todos/types";
import { Typography, Switch, Flex, Input, Button, message } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface ITodoItem extends ITodo {
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  saveTodo: (id: string, newTitle: string, newDescription: string) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { id, title, description, complete, removeTodo, toggleTodo, saveTodo } =
    props;

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: title,
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: title,
    });
  };

  const [show, setShow] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description);

  const handleChangeNewTitle: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.preventDefault();
    setNewTitle(e.target.value);
  };

  const handleChangeNewDescription: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    e.preventDefault();
    setNewDescription(e.target.value);
  };

  const onClickEditSave = (id: string) => {
    if (isEdit) {
      setIsEdit(false);
      saveTodo(id, newTitle, newDescription);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        padding: 8,
      }}
    >
      {contextHolder}
      <Flex justify={"space-between"} align={"center"} gap={8} wrap={"wrap"}>
        {isEdit ? (
          <Flex>
            <Input
              type="text"
              value={newTitle}
              maxLength={20}
              onChange={handleChangeNewTitle}
            />
          </Flex>
        ) : (
          <Typography.Text strong>{title}</Typography.Text>
        )}
        <Flex gap={8} align={"center"}>
          <Switch
            checked={complete}
            onChange={() => {
              complete === false ? success() : error();
              toggleTodo(id);
            }}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
          <Button
            shape="circle"
            type="text"
            icon={show ? <CaretDownOutlined /> : <CaretUpOutlined />}
            onClick={() => setShow((prev) => !prev)}
          />
        </Flex>
      </Flex>
      {show && (
        <Flex justify={"space-between"} align={"center"} gap={8} wrap={"wrap"}>
          {isEdit ? (
            <Flex>
              <Input.TextArea
                value={newDescription}
                maxLength={80}
                onChange={handleChangeNewDescription}
              />
            </Flex>
          ) : (
            <Typography.Text>{description}</Typography.Text>
          )}
          <Flex gap={8}>
            <Button
              type="primary"
              icon={isEdit ? <SaveOutlined /> : <EditOutlined />}
              onClick={() => onClickEditSave(id)}
            />
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => removeTodo(id)}
            />
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export { TodoItem };