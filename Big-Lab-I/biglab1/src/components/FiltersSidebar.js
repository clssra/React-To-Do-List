import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';


function FiltersSidebar(){

    return (
                <ListGroup as='ul' defaultActiveKey="#link1" variant='flush'>
                    <ListGroup.Item as='li' action href='#link1'>ALL</ListGroup.Item>
                    <ListGroup.Item as='li' action href='#link2'>IMPORTANT</ListGroup.Item>
                    <ListGroup.Item as='li' action href='#link3'>TODAY</ListGroup.Item>
                    <ListGroup.Item as='li' action href='#link4'>NEXT 7 DAYS</ListGroup.Item>
                    <ListGroup.Item as='li' action href='#link5'>PRIVATE</ListGroup.Item>
                </ListGroup>
            
    );
}

export default FiltersSidebar;