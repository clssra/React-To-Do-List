import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from './components/MyNavbar';
import FiltersSidebar from './components/FiltersSidebar';
import TaskList from './components/TaskList';
import TASKS from './tasks';
import { useState } from 'react';
import {Tasks } from './components/CreateContext';
import dayjs from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isYesterday).extend(isToday).extend(isTomorrow).extend(isBetween);


function App() {

  const filtersList = [
    {filterName: 'all-filter', selected: false, filterFunction : filterAll},
    {filterName: 'important-filter', selected: false, filterFunction : filterByImportant},
    {filterName: 'today-filter', selected: false, filterFunction : filterByToday},
    {filterName: 'next7-filter', selected: false, filterFunction : filterByNextWeek},
    {filterName: 'private-filter', selected: false, filterFunction : filterByPrivate}
  ]

  const [tasks, setTasks] = useState(TASKS);
  const [filters, setFilters] = useState(filtersList);

  function filterAll(tasks){
    return tasks.filter(()=>true);
  }

  function filterByImportant(tasks){
    return tasks.filter((t) => t.important);
  }


  function filterByPrivate(tasks){
    return tasks.filter((t) => t.private);
  }

  function filterByToday(tasks){
    return tasks.filter((t) => t.deadline && t.deadline.isToday());
  }

  function filterByNextWeek(tasks){
    return tasks.filter((t) => {
        const tomorrow = dayjs().add(1, 'day');
        const nextWeek = dayjs().add(7, 'day');
        return t.deadline && t.deadline.isBetween(tomorrow, nextWeek, 'day', '[]');
    });
  }


  return (
     <Container fluid>
      <MyNavbar />
        <Row className='vheight-100 '>
          <Tasks.Provider value={tasks}>
            <TaskManager/>
          </Tasks.Provider>
        </Row>

     </Container>
  );
}

function TaskManager(props){


    return (
      <>
        <Col sm={4} className='filters-sidebar below-nav bg-light'>
          <FiltersSidebar className='below-nav'/>
        </Col>
      
        <Col className='below-nav'>
          <Title filterName={'pd'}/>
          <TaskList/>
        </Col>
      </>
    )
}

function Title(props){
  const filterName = props.filterName;

  return <h1>Filter: {filterName}</h1>;
}

export default App;