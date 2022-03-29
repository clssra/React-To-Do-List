import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { PencilSquare, TrashFill, PersonSquare, PlusCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'

function TaskList(){
    return(
        <Container fluid>
            <h1>FILTER: filter-all</h1>
                    <Row className='justify-content-between task'>
                        <Col>
                        <Form>
                            <Form.Check type='checkbox' id='btncheck1' label='Complete Lab 2'>
                            </Form.Check>
                        </Form>
                        </Col>
                        <Col sm={4}>
                        <small> Monday 22 March 2021 at 14:30</small>
                        </Col>
                        <Col sm={1}>
                            <PencilSquare size='15' />
                        </Col>
                        <Col sm={1}>
                            <TrashFill size='15' />
                        </Col>
               
                    </Row>
                    <Row className='justify-content-between task'>
                        <Col >
                            <Form>
                                <Form.Check type='checkbox' id='btncheck2' label='Buy some groceries'>
                                </Form.Check>
                            </Form>
                        </Col>
                        <Col sm={1}>
                            <PersonSquare size="15" />
                        </Col>
                        <Col sm={4}>
                            <small> Today at 14:30</small>
                        </Col>
                        <Col sm={1}>
                            <PencilSquare size='15' />
                        </Col>
                        <Col sm={1}>
                            <TrashFill size='15' />
                        </Col>
                    </Row>

                    <Row className='justify-content-between task'>
                        <Col>
                            <Form>
                                <Form.Check type='checkbox' id='btncheck3' label='Read a good book!' className='important'>
                                </Form.Check>
                            </Form>
                        </Col>
                        <Col sm={4} md='center'>
                            <small>--o--</small>
                        </Col>
                        <Col sm={1}>
                            <PencilSquare size='15' />
                        </Col>
                        <Col sm={1}>
                            <TrashFill size='15' />
                        </Col>
                    </Row>

                   
                    <PlusCircleFill size={30} className='addButton' />
                    
             
        </Container>
    );
}

export default TaskList;