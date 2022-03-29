import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { PersonCircle, CheckAll } from 'react-bootstrap-icons';
import FormGroup from 'react-bootstrap/esm/FormGroup';

function MyNavbar(){
    return (
      <Navbar bg="light" fixed='top'>
        <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href='#'>ToDo Bitch</Navbar.Brand>

            <FormGroup>
              <Form.Control placeholder='Search'></Form.Control>
            </FormGroup>
            
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link href="#">
                  <PersonCircle size="30" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
        </Container>
      </Navbar>

  );
}




export default MyNavbar;