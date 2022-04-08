import dayjs from 'dayjs';
import { useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap/';

function ModalForm(props){
    // const {task, onSave, onClose} = props;
    const task = props.task;
    let onSave = props.onSave;
    const onClose = props.onClose;

    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [validated, setValidated] = useState(false);

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
        console.log(form);

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
        <Modal show centered size='md' onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new task!</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId='form-description'>
                        <Form.Label>Task description</Form.Label>
                        <Form.Control 
                            required
                            value={description} 
                            onChange={(event)=> setDescription(event.target.value)}
                            type='text'
                            name='description'
                            placeholder="ex. buy a beer"
                            
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please provide a description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='checkboxes'>
                        <Form.Check
                            checked={isPrivate}
                            onChange={(event) => setIsPrivate(event.target.value)}
                            inline
                            label='private'
                            type='checkbox'
                            id='privateCheck'
                        />
                        <Form.Check
                            checked={isImportant}
                            onChange={(event) => setIsImportant(event.target.value)}
                            inline
                            label='important'
                            type='checkbox'
                            id='importantCheck'
                        />
                    </Form.Group>
                    <Form.Group controlId='deadline-date'>
                        <Form.Label>Deadline date</Form.Label>
                        <Form.Control
                            type='date'
                            value={deadlineDate}
                            onChange={handleDeadlineDate}
                        />
                    </Form.Group>
                    <Form.Group controlId='deadline-time'>
                        <Form.Label>Deadline time</Form.Label>
                        <Form.Control
                            type='time'
                            value={deadlineTime}
                            onChange={handleDeadlineTime}
                        />
                    </Form.Group>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
                <Button type='submit'>Save</Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );

}

export {ModalForm};