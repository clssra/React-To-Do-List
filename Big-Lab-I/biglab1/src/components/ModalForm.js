import dayjs from 'dayjs';
import { useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap/';

function ModalForm(props){
    // const {task, onSave, onClose} = props;
    const task = props.task;
    let onSave = props.onSave;
    const onClose = props.onClose;

    const [description, setDescription] = useState(task ? task.description : '');
    const [isPrivate, setIsPrivate] = useState(task ? task.private : false);
    const [isImportant, setIsImportant] = useState(task ? task.important : false);
    const [deadlineDate, setDeadlineDate] = useState((task && task.deadline) ? task.deadline.format('YYYY-MM-DD') : '');
    const [deadlineTime, setDeadlineTime] = useState((task && task.deadline) ? task.deadline.format('HH:mm') : '');

    const [validated, setValidated] = useState();

    const handleDeadlineDate = (event) => {
        setDeadlineDate(event.target.value);
        if(event.target.value !== ''){
            if(deadlineTime === '')
                setDeadlineTime("12:00");
        } else {
            setDeadlineTime('');
        }
    }

    const handleDeadlineTime = (event) => {
        setDeadlineTime(event.target.value);
        if(event.target.value !== ''){
            if(deadlineDate === '')
                setDeadlineDate(dayjs().format('YYYY-MM-DD'));
        } else 
            setDeadlineDate('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation(); 
    
        const form = event.currentTarget; 
        if (!form.checkValidity()) {
          setValidated(true);
        } else {
            let deadline;
            if((deadlineDate !== '') && (deadlineTime !== '')){
                deadline = dayjs(deadlineDate + 'T' + deadlineTime);
            } else if (deadlineTime === ''){
                deadline = dayjs(deadlineDate + 'T12:00');
            }

            const newTask = Object.assign({}, task, {description, important: isImportant, 
                                private: isPrivate, deadline });

            onSave(newTask);

        }
      };


    return(
        <Modal {...props} show centered size='md' onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new task!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>  
                    <Form.Group>
                        <Form.Label htmlFor='taskDescription'>Task description</Form.Label>
                        <Form.Control 
                            value={description} 
                            onChange={(event)=> setDescription(event.target.value)}
                            type='text'
                            id='taskDescription'
                            placeholder="ex. buy a beer"
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group id='checkboxes'>
                        <Form.Check
                            checked={isPrivate}
                            onChange={(event) => setIsPrivate(event.target.value)}
                            inline
                            label='private'
                            type='checkbox'
                            id='privateCheck'
                        />
                        <Form.Check
                            checked={isPrivate}
                            onChange={(event) => setIsImportant(event.target.value)}
                            inline
                            label='important'
                            type='checkbox'
                            id='importantCheck'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deadline date</Form.Label>
                        <Form.Control
                            type='date'
                            value={deadlineDate}
                            onChange={handleDeadlineDate}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deadline date</Form.Label>
                        <Form.Control
                            type='time'
                            value={deadlineTime}
                            onChange={handleDeadlineTime}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={onClose}>Close</Button> */}
                <Button type='submit'>Submit</Button>
            </Modal.Footer>

        </Modal>
    );

}

export {ModalForm};