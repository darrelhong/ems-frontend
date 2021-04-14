import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Alert, Figure } from 'react-bootstrap';
import cx from 'classnames';

import ApplicationCard from './ApplicationCard';

import styles from './Allocation.module.css';
import ButtonWithLoading from 'components/custom/ButtonWithLoading';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `Application ${k + offset}`,
    bpName: `Business partner ${k}`,
    description: 'Lorem ipsum dolor sit amet',
    status: 'PENDING',
  }));

export default function Allocation() {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('allocations')) || [
      getItems(5),
      [],
      [],
      [],
      [],
    ]
  );
  const [{ loading, status }, setStatus] = useState({});

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  };

  const onSave = () => {
    localStorage.setItem('allocations', JSON.stringify(state));
    setStatus({ loading: true });
    setTimeout(() => setStatus({ loading: false, status: 'success' }), 900);
  };

  return (
    <>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <h5>Applications</h5>
            {
              <Droppable droppableId="0" key={0}>
                {(provided) => (
                  <div
                    className={cx(styles.droppable, styles.applications)}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {state[0].map((item, innerIndex) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={innerIndex}
                      >
                        {(provided) => (
                          <div
                            className={styles.item}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                          >
                            <ApplicationCard application={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            }
          </div>
          <div>
            {state.slice(1).map((list, i) => (
              <div key={i + 1}>
                <h5>Booth {i}</h5>
                <Droppable droppableId={`${i + 1}`} key={i + 1}>
                  {(provided) => (
                    <div
                      className={styles.droppable}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {list.map((item, innerIndex) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={innerIndex}
                        >
                          {(provided) => (
                            <div
                              className={cx(styles.item, styles.itemGreen)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <ApplicationCard application={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <ButtonWithLoading
          className="btn btn-fill-out btn-sm"
          onClick={onSave}
          isLoading={loading}
        >
          Save
        </ButtonWithLoading>
      </div>

      <div className="mt-2">
        {status == 'success' ? (
          <Alert variant="success">Allocations succesfully saved</Alert>
        ) : null}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <Figure>
          <Figure.Image src="https://www.ncwvhba.org/wp-content/uploads/2021-Home-Show-Packet-4.jpg" />
          <Figure.Caption className="text-dark">
            Floorplan layout
          </Figure.Caption>
        </Figure>
      </div>
    </>
  );
}
