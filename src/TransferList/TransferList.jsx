import { useState } from "react";
import "./TransferList.scss";

const POSITION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

function TransferList() {
  const [items, setItems] = useState([
    { name: "JS", position: POSITION.LEFT, isChecked: false },
    { name: "HTML", position: POSITION.LEFT, isChecked: false },
    { name: "CSS", position: POSITION.LEFT, isChecked: false },
    { name: "TS", position: POSITION.LEFT, isChecked: false },
    { name: "React", position: POSITION.RIGHT, isChecked: false },
    { name: "Angular", position: POSITION.RIGHT, isChecked: false },
    { name: "Vue", position: POSITION.RIGHT, isChecked: false },
    { name: "Svelte", position: POSITION.RIGHT, isChecked: false },
  ]);

  const canAllItemsBeMovedLeft = items.some(
    (item) => item.position === POSITION.RIGHT
  );
  const canAllItemsBeMovedRight = items.some(
    (item) => item.position === POSITION.LEFT
  );

  const canItemsBeMovedLeft = items.some(
    (item) => item.position === POSITION.RIGHT && item.isChecked
  );
  const canItemsBeMovedRight = items.some(
    (item) => item.position === POSITION.LEFT && item.isChecked
  );

  const moveAllItems = (position) => {
    setItems(items.map((item) => ({ ...item, position: POSITION[position] })));
  };

  const moveItems = (position) => {
    setItems(
      items.map((item) => {
        if (item.isChecked) {
          return { ...item, position: POSITION[position], isChecked: false };
        }
        return item;
      })
    );
  };

  const onChange = (name) => {
    setItems(
      items.map((i) => {
        if (i.name === name) {
          return { ...i, isChecked: !i.isChecked };
        }
        return i;
      })
    );
  };

  const renderItem = (item, index) => (
    <div
      key={item.name + index}
      className="Item"
      onClick={() => onChange(item.name)}
    >
      <input type="checkbox" checked={item.isChecked} />
      <div>{item.name}</div>
    </div>
  );

  return (
    <div className="TransferList">
      <div className="Column Column1">
        <div className="ColumnContainer">
          {items.map(
            (item, index) =>
              item.position === POSITION.LEFT && renderItem(item, index)
          )}
        </div>
      </div>

      <div className="ColumnControls">
        <button
          className="ButtonControl"
          disabled={!canAllItemsBeMovedLeft}
          onClick={() => moveAllItems(POSITION.LEFT)}
        >
          {"<<"}
        </button>
        <button
          className="ButtonControl"
          onClick={() => moveItems(POSITION.LEFT)}
          disabled={!canItemsBeMovedLeft}
        >
          {"<"}
        </button>
        <button
          className="ButtonControl"
          onClick={() => moveItems(POSITION.RIGHT)}
          disabled={!canItemsBeMovedRight}
        >
          {">"}
        </button>
        <button
          className="ButtonControl"
          disabled={!canAllItemsBeMovedRight}
          onClick={() => moveAllItems(POSITION.RIGHT)}
        >
          {">>"}
        </button>
      </div>
      <div className="Column Column2">
        <div className="ColumnContainer">
          {items.map(
            (item, index) =>
              item.position === POSITION.RIGHT && renderItem(item, index)
          )}
        </div>
      </div>
    </div>
  );
}

export default TransferList;
