import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { PencilSquare, TrashFill, PersonSquare, PlusCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import { PD, Tasks } from './CreateContext';

dayjs.extend(isYesterday).extend(isToday).extend(isTomorrow).extend(isBetween);

/* TASKLIST

 { id: 1, description: "Complete BigLab 1C", important: false, private: true, deadline: dayjs("2021-04-26T14:30:00") },

    id - description - important - private - deadline
*/

const formatDeadline = (d) => {
    if (!d) return '--o--';
    else if (d.isToday()) {
      return d.format('[Today at] HH:mm');
    } else if (d.isTomorrow()) {
      return d.format('[Tomorrow at] HH:mm');
    } else if (d.isYesterday()) {
      return d.format('[Yesterday at] HH:mm');
    } else {
      return d.format('dddd DD MMMM YYYY [at] HH:mm');
    }
}


//passo i task già filtrati a TaskList

function TaskList(props){

    const tasks = useContext(Tasks);
   
    return(
        <Container fluid>

            {tasks.map(task => <TaskRow key={task.id} task={task}/>)}
                   
            <PlusCircleFill size={30} className='addButton'/>
                     
        </Container>
    );
}

function TaskRow(props){

    return(
        <Row className='justify-content-between task'>
            <TaskInfo {...props}/>
            <TaskControl/>
        </Row>
    );

}

function TaskInfo(props){

    const { task } = props;

    return(
        <>
            <Col>
                <Form>
                    <Form.Check type='checkbox' id={'btncheck'+ task.id} label={task.description}>
                    </Form.Check>
                </Form>
            </Col>

            <Col sm={1}>
                <PersonSquare size="15" className={task.private ? 'invisible' : ''}/>
            </Col>

            <Col sm={4}>
                <small> {formatDeadline(task.deadline)} </small>
            </Col>
        </>
    );
}

function TaskControl(props){

    return(
        <>
            <Col sm={1}>
                <PencilSquare size='15' />
            </Col>
            <Col sm={1}>
                <TrashFill size='15' />
            </Col>
        </>
    );

}

export default TaskList;