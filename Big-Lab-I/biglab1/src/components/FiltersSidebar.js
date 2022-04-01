import ListGroup from 'react-bootstrap/ListGroup';

function FiltersSidebar(props){
    // const filters = props.filters;
    // const selectedKey = props.selectedKey;
    // const setSelectedKey = props.setSelectedKey;

    const {filters, selectedKey, setSelectedKey} = props;

    return (
        <ListGroup defaultActiveKey={selectedKey}>
            {
                Object.entries(filters).map(([key, {description}]) => {

                        return (<ListGroup.Item key={key} action active={key === selectedKey}
                            onClick={() => setSelectedKey(key)}>{description}</ListGroup.Item>);
                })
            }
        </ListGroup>  
    );
}

export default FiltersSidebar;