import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, TrashBinIcon, usySpacing } from "@usy-ui/base";
import { Controller, useForm } from "react-hook-form";

import { getTodos, addTodo, deleteTodo } from "../../apis/todo";

import { StyledTable } from "./styled";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  dateTime: string;
};

type FormValue = { title: string };

export const TodoList = () => {
  const queryClient = useQueryClient();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      title: "",
    },
  });

  const getTodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit = ({ title }: FormValue) => {
    addTodoMutation.mutate({
      title,
      completed: false,
      dateTime: new Date().toISOString(),
    });
  };

  /**
   * Render
   */

  const renderAddTodo = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="row"
          alignItems="flex-end"
          gap={usySpacing.px20}
          widthProps={{ width: "400px" }}
          marginProps={{ margin: "80px auto" }}
        >
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="New todo"
                description={errors?.title?.message}
                hasError={!!errors?.title?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="primary"
            loading={addTodoMutation.isPending}
          >
            Submit
          </Button>
        </Flex>
      </form>
    );
  };

  const renderListOfTodos = () => {
    return (
      <Flex
        widthProps={{ width: "600px" }}
        marginProps={{ margin: "30px auto" }}
      >
        <StyledTable<Todo>
          rowKey="id"
          columns={[
            { key: "id", title: "Id" },
            { key: "title", title: "Title" },
            {
              key: "completed",
              title: "Completed",
              renderRow: ({ completed }) => (completed ? "Done" : "Pending"),
            },
            { key: "dateTime", title: "Datetime" },
            {
              key: "action-1",
              widthProps: {
                width: "60px",
              },
              renderRow: (todo) => (
                <TrashBinIcon
                  onClick={() => {
                    console.log(todo);
                    deleteTodoMutation.mutate(todo);
                  }}
                />
              ),
            },
          ]}
          dataRows={getTodosQuery.data || []}
        />
      </Flex>
    );
  };

  return (
    <>
      {renderAddTodo()}
      {renderListOfTodos()}
    </>
  );
};
