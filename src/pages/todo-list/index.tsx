import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, usySpacing } from "@usy-ui/base";

import { getTodos, addTodo, updateTodo, deleteTodo } from "../../apis/todo";

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todosData,
  } = useQuery("get-todos", getTodos);

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  /**
   * Render
   */

  const renderNewTodoSection = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap={usySpacing.px32}>
          <Input
            label="New todo"
            value={newTodo}
            onChange={(value) => setNewTodo(value)}
          />
          <Button>Submit</Button>
        </Flex>
      </form>
    );
  };

  return "";
};
