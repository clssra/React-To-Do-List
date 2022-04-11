import { Button, Col, Form, Row, Container} from 'react-bootstrap';
import { PencilSquare, TrashFill, PersonSquare, PlusCircleFill } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isYesterday).extend(isToday).extend(isTomorrow).extend(isBetween);

/* TASKLIST
 { id - description - important - private - deadline }
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

function TaskList(props){

    // const tasks = props.tasks;
    // const deleteTask = props.deleteTask;

    const {tasks, deleteTask, updateTask, onEdit} = props;


    return(
        <Container fluid>

            {tasks.map(task => 
                <TaskRow 
                    key={task.id} 
                    task={task} 
                    deleteTask={deleteTask} 
                    updateTask={updateTask}
                    onEdit = {onEdit}
                    />)}
                   
            {/* <PlusCircleFill size={30} className='addButton'/> */}
                     
        </Container>
    );
}

function TaskRow(props){


    return(
        <Row className='justify-content-between task'>
            <TaskInfo 
                task={props.task}/>
            <TaskControl 
                task={props.task} 
                deleteTask={props.deleteTask} 
                updateTask={props.updateTask}
                onEdit = {props.onEdit}
                />
        </Row>
    );

}

function TaskInfo(props){
    
    const task = props.task;

    return(
        <>
            <Col>
                <Form>
                    <Form.Check type='checkbox' id={'btncheck'+ task.id} label={task.description}
                        className={task.important ? 'important' : ''}>
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
                <Button onClick={() => {
                    props.onEdit(props.task);
                    }}><PencilSquare size='15' /></Button>
            </Col>
            <Col sm={1}>
                <Button onClick={() => props.deleteTask(props.task)}><TrashFill size='15' /></Button>
            </Col>
        </>
    );

}

export default TaskList;