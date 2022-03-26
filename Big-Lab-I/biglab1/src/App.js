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
     <Container class='container-fluid'>
      <MyNavbar />
        <Row className='vheight-100 below-nav'>
          <Col sm={4} className='bg-light'>
            <FiltersSidebar />
          </Col>
          <Col>
            <TaskList />
          </Col>
        </Row>

     </Container>
  );
}

export default App;