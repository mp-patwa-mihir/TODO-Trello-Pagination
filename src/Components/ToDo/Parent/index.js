import React from 'react';
import './style.css';
import { Button, Form, Input } from 'antd';
import { setTodo, setCompletedTodo } from '../../../Redux/ToDo/todoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ToDo = () => {
  const dispatch = useDispatch();
  const { todo, completedTodo } = useSelector((s) => s.todoSlice);

  const taskStatus = {
    List: {
      name: 'TODO List',
      items: todo,
    },
    Completed: {
      name: 'Completed',
      items: completedTodo,
    },
  };

  const handleClick = (e) => {
    const newData = todo?.filter((todo) => todo?.id !== e);
    dispatch(setTodo(newData));
  };

  const handleDragEnd = (e) => {
    const { destination, source } = e;
    if (!destination) return;
    if (destination?.droppableId === source?.droppableId) {
      const dispatcher =
        destination?.droppableId === 'Completed' ? setCompletedTodo : setTodo;
      const data =
        destination?.droppableId === 'Completed' ? completedTodo : todo;
      const d = [...data];
      const c = d[source?.index];
      d[source?.index] = d[destination?.index];
      d[destination?.index] = c;
      dispatch(dispatcher(d));
    }
    if (
      destination?.droppableId === 'Completed' &&
      source?.droppableId === 'List'
    ) {
      const detinationArr = [...completedTodo];
      const sourceArr = [...todo];
      detinationArr?.splice(destination?.index, 0, sourceArr[source?.index]);
      dispatch(setCompletedTodo(detinationArr));
      const newSrcArr = sourceArr?.filter((el) => el?.id !== e?.draggableId);
      dispatch(setTodo(newSrcArr));
    }
    if (
      destination?.droppableId === 'List' &&
      source?.droppableId === 'Completed'
    ) {
      const detinationArr = [...todo];
      const sourceArr = [...completedTodo];
      detinationArr?.splice(destination?.index, 0, sourceArr[source?.index]);
      dispatch(setTodo(detinationArr));
      const newSrcArr = sourceArr?.filter((el) => el?.id !== e?.draggableId);
      dispatch(setCompletedTodo(newSrcArr));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {Object.entries(taskStatus).map(([columnId, column]) => (
        <div className="main_div">
          <div className="text">{column?.name}</div>
          {column?.name === 'TODO List' ? <FormComponent /> : null}
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {column?.items?.map((i, idx) => (
                  <Draggable key={i?.id} draggableId={i?.id} index={idx}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{i?.value}</p>
                        <Button type="link" onClick={() => handleClick(i?.id)}>
                          Delete
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
};

export default ToDo;

const FormComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { todo } = useSelector((s) => s.todoSlice);

  const handleSubmit = (values) => {
    if (values.todo) {
      dispatch(setTodo([...todo, { id: nanoid(), value: values.todo }]));
      form.resetFields();
    }
  };

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="" name="todo">
          <Input placeholder="Add New TODO" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </>
  );
};
