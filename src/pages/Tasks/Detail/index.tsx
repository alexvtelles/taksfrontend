import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap';
import api from '../../../services/api';
import moment from 'moment';

interface ITask {
  id: number;
  title: string;
  description: string;
  finishid: boolean;
  created_at: Date;
  update_at: Date;
}

const Detail: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<ITask>()

  useEffect(() => {
    findTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function back() {
    history.goBack()
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`)
    console.log(response)

    setTask(response.data)
  }
  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }
  return (

    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes da tarefa </h1>
        <Button variant="dark" size="sm" onClick={back} >
          voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>

          <Card.Text>
            {task?.description}
            <br/>
            <Badge variant={ task?.finishid ? "success" : "warning"}>
            { task?.finishid ? "FINALIZADO" : "PENDENTE"}
            </Badge>
            <br/>
            <strong>Data de cadastro</strong>
            <Badge variant="info">
            { formateDate (task?.created_at)}
            </Badge>
            <br/>
            <strong>Data de atualização</strong>
            <Badge variant="info">
            { formateDate (task?.update_at)}
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )


}

export default Detail;