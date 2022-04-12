import ListGroup from 'react-bootstrap/ListGroup';

function FiltersSidebar(props){
    const {filters, selectedKey, onSelection} = props;

    return (
        <ListGroup defaultActiveKey={selectedKey}>
            {
                Object.entries(filters).map(([key, {description}]) => {

                        return (<ListGroup.Item key={key} action active={key === selectedKey}
                            onClick={() => onSelection(key)}>{description}</ListGroup.Item>);
                })
            }
        </ListGroup>  
    );
}

export default FiltersSidebar;