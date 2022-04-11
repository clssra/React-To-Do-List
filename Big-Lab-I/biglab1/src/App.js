import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from './components/MyNavbar';
import FiltersSidebar from './components/FiltersSidebar';
import TaskList from './components/TaskList';
import TASKS from './tasks';
import { useState } from 'react';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import { ModalForm } from './components/ModalForm';
import { BrowserRouter as Router, Routes} from 'react-router-dom';

dayjs.extend(isYesterday).extend(isToday).extend(isTomorrow).extend(isBetween);


function App() {

  const [selectedKey, setSelectedKey] = useState('all');
  const [tasks, setTasks] = useState(TASKS);

  const MODAL = {CLOSED : -2, ADD : -1};

  const [selectedTask, setSelectedTask] = useState(MODAL.CLOSED);

  function findTask(id){
    return tasks.find(t => t.id === id);
  }

  // const updateTask = (task) => {
  //   setTasks((oldTasks) => oldTasks.map(t => t.id === task.id ? {...task} : t))
  // }

  const updateTask = (task) => {
    setTasks( oldTasks => oldTasks.map( t => t.id === task.id ? {...task} : t) );
  }

  const addTask = (task) => {
    const id = Math.max(...tasks.map( t => t.id )) + 1;
    setTasks((oldTasks) => [...oldTasks, { ...task, id: id }] );
  }

  const deleteTask = (task) => {
    setTasks(oldTasks =>  oldTasks.filter(t => t.id != task.id));
  }

  const handleSaveOrUpdate = (task) => {
    // if the task has an id it is an update
    if(task.id) 
      updateTask(task); 
    // otherwise it is a new task to add
    else 
      addTask(task);

    setSelectedTask(MODAL.CLOSED); 
  }

  function handleClose(){
    setSelectedTask(MODAL.CLOSED);
  }

  function onEdit(task){
    setSelectedTask(task.id);
  }

  return (
    <Router>
      <Container fluid>
        <MyNavbar />
          <Row className='vheight-100 '>
                <TaskManager 
                  tasks={tasks} 
                  setTasks={setTasks} 
                  selectedKey={selectedKey} 
                  setSelectedKey={setSelectedKey}
                  deleteTask={deleteTask}
                  updateTask={handleSaveOrUpdate}
                  onEdit = {onEdit}
                  />
                <Row>
                  <Col>
                <Button size="lg" className="fixed-right-bottom" onClick={() => setSelectedTask(MODAL.ADD)}>+</Button>
                {/* <ModalForm onClose={handleClose}/> */}
                </Col>
                </Row>
                {(selectedTask !== MODAL.CLOSED) && <ModalForm task={findTask(selectedTask)} onSave={handleSaveOrUpdate} onClose={handleClose}></ModalForm>}
                
          </Row>
      </Container>
    </Router>
  );
}

function TaskManager(props){


  const {tasks, selectedKey, setSelectedKey, updateTask, selectedTask, setSelectedTask, onEdit} = props;

  const isNextWeek = (t) => {
    const tomorrow = dayjs().add(1, 'day');
    const nextWeek = dayjs().add(7, 'day');
    
    return t.deadline && t.deadline.isBetween(tomorrow, nextWeek, 'day', '[]');
  }

  const filtersList = {
    'all' : {description: 'ALL', id : 'all', filterFn : () => true},
    'important' : {description: 'IMPORTANT', id : 'important', filterFn : t => t.important},
    'today' : {description: 'TODAY', id : 'today',  filterFn : t => t.deadline && t.deadline.isToday()},
    'next7' : { description: 'NEXT WEEK', id : 'next7',  filterFn : t => isNextWeek(t)},
    'private' : {description: 'PRIVATE', id : 'private',  filterFn : t => t.private}
  }

    return (
      <>
        <Col sm={4} className='filters-sidebar below-nav bg-light'>
          <FiltersSidebar className='below-nav' filters={filtersList} selectedKey={selectedKey} setSelectedKey={setSelectedKey}/>
        </Col>
        <Col className='below-nav'>
          <Title filterName={filtersList[selectedKey].description}/>
          <TaskList 
            tasks={tasks.filter(filtersList[selectedKey].filterFn)}
            deleteTask={props.deleteTask}
            updateTask={updateTask}
            onEdit = {onEdit}
            />
        </Col>
      </>
    )
}

function Title(props){
  const filterName = props.filterName;



  return <h1>Filter: {filterName}</h1>;
}

export default App;