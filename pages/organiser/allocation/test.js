import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import type { Quote as QuoteType } from "../types";

//https://codesandbox.io/s/zqwz5n5p9x?file=/src/index.js

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };
  console.log('customid ' +custom.id);
  return custom;
});

const initialData = [
  {
    id: 'id-0',
  content: 'Booth 0' 
  },
  {
    id: 'id-1',
  content: 'Booth 1' 
  },
  {
    id: 'id-2',
  content: 'Booth 2' 
  },
  {
    id: 'id-3',
  content: 'Booth 3' 
  },
  {
    id: 'id-4',
  content: 'Booth 4' 
  },
  {
    id: 'id-5',
  content: 'Booth 5' 
  },
  {
    id: 'id-6',
  content: 'Booth 6' 
  },
  {
    id: 'id-7',
  content: 'Booth 7' 
  },
  {
    id: 'id-8',
  content: 'Booth 8' 
  }
  // 'Quote 1',
  // 'Quote 2',
  // 'Quote 3',
  // 'Quote 4',
  // 'Quote 5',
  // 'Quote 6',
  // 'Quote 7',
  // 'Quote 8',
];

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

function Quote({ quote, index, key }) {
  console.log('in quote function');
  console.log(quote.id);
  console.log(quote);

  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));
});

const QuoteApp = () => {
  const [state, setState] = useState({ quotes: initial });
  const [booths,setBooths] = useState(initialData);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <div>
    <DragDropContext
    onDragEnd={onDragEnd}
    >
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={booths} />
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
      
    </DragDropContext>
   </div>
  );
}

export default QuoteApp;