import React from "react";

const Tasks = React.createContext({
    tasks : {},
    setTasks : () => {}
});

const SelectedKey = React.createContext({
    selectedKey : '',
    setSelectedKey : () => {}
});

export {Tasks, SelectedKey};