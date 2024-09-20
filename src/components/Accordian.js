import { useState } from "react";
import data from "./data";
import styles from "./accordian.module.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null); // Single-selection state
  const [multiSelectionEnabled, setMultiSelectionEnabled] = useState(false); // Toggle between single/multi
  const [multiple, setMultiple] = useState([]); // Multi-selection state

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId); // Add the ID if not already selected
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1); // Remove the ID if already selected
    }
    setMultiple(cpyMultiple);
  }

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          setMultiSelectionEnabled(!multiSelectionEnabled);

          if (!multiSelectionEnabled) {
            // single to multi: keep current selection
            setMultiple(selected ? [selected] : []);
            setSelected(null); // Clear single selection when entering multi mode
          } else {
            // Multi to single: set last selected item from mutilpe to single selection
            setSelected(multiple.length > 0 ? multiple[0] : null);
            setMultiple([]); // Clear multi-selection when entering single mode
          }
        }}
      >
        {multiSelectionEnabled
          ? "Disable Multi Selection"
          : "Enable Multi Selection"}
      </button>

      <div className={styles.accordian}>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              className={`${styles.item} ${
                multiSelectionEnabled
                  ? multiple.indexOf(dataItem.id) !== -1 && styles.active
                  : selected === dataItem.id && styles.active
              }`}
              key={dataItem.id}
            >
              <div
                onClick={
                  multiSelectionEnabled
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className={styles.title}
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {multiSelectionEnabled
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className={styles.content}>{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className={styles.content}>{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
