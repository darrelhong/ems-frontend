import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
export default function List({ data }) {
    const { id, title, items } = data;
    return (
        <div className="list">
            <h1>{title}</h1>
            <Droppable droppableId={id}>
                {provided => (
                    <div
                        className="list-content"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map(item => (
                            <ListItem key={item.id} item={item} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}