import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from './components/MyNavbar';
import FiltersSidebar from './components/FiltersSidebar';
import TaskList from './components/TaskList';


function App() {
  return (
     <Container fluid>
      <MyNavbar />
        <Row className='vheight-100 '>
          <Col sm={4} className='filters-sidebar below-nav bg-light'>
            <FiltersSidebar className='below-nav'/>
          </Col>
          <Col className='below-nav'>
            <TaskList />
          </Col>
        </Row>

     </Container>
  );
}

export default App;