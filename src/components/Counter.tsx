import React from "react";
import { ITodo } from "../store/todos/types";
import { Badge, Flex, Typography } from "antd";

interface ICounterProps {
  items: ITodo[];
}

const Counter: React.FC<ICounterProps> = ({ items }) => {
  const allTodos = items.length;
  const completedTodos = items.filter((item) => item.complete === true).length;

  return (
    <Flex align={"center"} gap={8}>
      <Typography.Text type="warning">All:</Typography.Text>
      <Badge count={allTodos} color="#faad14" />
      <Typography.Text type="success">Done:</Typography.Text>
      <Badge count={completedTodos} color="#52c41a" />
    </Flex>
  );
};

export { Counter };
