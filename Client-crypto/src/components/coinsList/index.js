import Coin from "~/components/coin";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Coinlist({ filteredCoins }) {
  const [array, setArray] = useState([]);
  useEffect(() => {
    setArray([]);
    filteredCoins.map((item) => {
      setArray((oldstate) => [
        ...oldstate,
        {
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          image: item.image,
          market_cap: item.market_cap,
          price_change_percentage_24h: item.price_change_percentage_24h,
          total_volume: item.total_volume,
        },
      ]);
    });
  }, [filteredCoins]);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // get new reorder array
    setArray((array) =>
      reorder(array, result.source.index, result.destination.index)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
              {array.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                         <Coin item={item} />
                        </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
