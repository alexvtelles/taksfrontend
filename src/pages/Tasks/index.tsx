import React, { useState, useEffect } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import moment from "moment";
import "./index.css";

interface ITask {
  id: number;
  title: string;
  description: string;
  finishid: boolean;
  created_at: Date;
  update_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data);
  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`)
    loadTasks()
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`)
    loadTasks()
  }

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push("/tarefas_cadastro");
  }

  function editTask(id: number) {
    history.push(`/tarefas_cadastro/${id}`);
  }
  function viewTask(id: number) {
    history.push(`/tarefas/${id}`);
  }
  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tarefas </h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Add Tarefa
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formateDate(task.update_at)}</td>
              <td>
                <Badge variant={task.finishid ? "success" : "warning"}>
                  {task.finishid ? "FINALIZADO" : "PENDENTE"}
                </Badge>
              </td>
              <td>
                <Button size="sm" disabled={task.finishid} onClick={() => editTask(task.id)}>
                  Editar
                </Button>{" "}
                <Button size="sm" disabled={task.finishid} variant="success" 
                onClick={ () => finishedTask(task.id)}>
                  Finalizar
                </Button>{" "}
                <Button size="sm" variant="info" 
                onClick={() => viewTask(task.id)}>
                  Visualizar
                </Button>{" "}
                <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
