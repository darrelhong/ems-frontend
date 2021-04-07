import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
// import getData from "./getData";
import List from "./List";
import styles from "./styles.module.css";

// import "./styles.css";
const columns = getData(1);
export default function App() {
    const [data, setData] = useState(columns[0]);
    const onDragEnd = result => {
        // return if item was dropped outside
        if (!result.destination) return;
        // return if the item was dropped in the same place
        if (
            result.source.droppableId === result.destination.droppableId &&
            result.source.index === result.destination.index
        )
            return;
        // get the items array
        const newItems = [...data.items];
        // get the draggedItems
        const draggedItem = newItems[result.source.index];
        // delete the item from source position and insert it to the destination positon
        newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, draggedItem);
        // create new data
        const newData = {
            ...data,
            items: newItems
        };
        // update state
        setData(newData);
    };
    return (
        <div className="App">
            <h1>You can drag & drop items in the below list</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <List data={data} />
            </DragDropContext>
        </div>
    );
}