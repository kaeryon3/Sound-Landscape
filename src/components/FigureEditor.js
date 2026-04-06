import styles from './FigureEditor.module.css';

function FigureEditor({
    doubleClickedObjId,
    setDoubleClickedObjId,
    objects,
    setObjects,
    clips,
    setClips,
}) {
    function newColor(color) {
        setObjects(
            objects.map((el) =>
                el.id === doubleClickedObjId ? { ...el, color: color } : el,
            ),
        );
    }

    function newShape() {
        function doShape(radius) {
            setObjects(
                objects.map((el) =>
                    el.id === doubleClickedObjId
                        ? { ...el, radius: radius }
                        : el,
                ),
            );
        }
        if (selectedObject.radius === '50%') {
            doShape('5%');
        } else {
            doShape('50%');
        }
    }

    function deleteFigure() {
        setDoubleClickedObjId('');
        setObjects(objects.filter((el) => el.id !== doubleClickedObjId));
    }

    function decreaseQueue() {
        setObjects((prev) => {
            const prevQueueEl = prev.find(
                (el) => el.queue === selectedObject.queue - 1,
            );

            return prev.map((obj) => {
                if (obj.queue > 0) {
                    if (obj.queue > 0) {
                        if (prevQueueEl && prevQueueEl.id === obj.id) {
                            return {
                                ...prevQueueEl,
                                queue: prevQueueEl.queue + 1,
                            };
                        }
                    }

                    if (obj.id === selectedObject.id) {
                        return { ...obj, queue: obj.queue - 1 };
                    }
                }
                return obj;
            });
        });
    }

    function increaseQueue() {
        setObjects((prev) => {
            const next = prev.find(
                (el) => el.queue === selectedObject.queue + 1,
            );

            return prev.map((obj) => {
                if (obj.queue < 15) {
                    if (obj.id === selectedObject.id) {
                        return { ...obj, queue: obj.queue + 1 };
                    }

                    if (next && obj.id === next.id) {
                        return { ...obj, queue: obj.queue - 1 };
                    }
                }

                return obj;
            });
        });
    }

    const selectedObject = objects.find((el) => el.id === doubleClickedObjId);

    const buttons = [
        { class: 'colEditGreen', color: 'green' },
        { class: 'colEditBlue', color: 'blue' },
        { class: 'colEditYellow', color: 'yellow' },
        { class: 'colEditGrey', color: 'grey' },
        { class: 'colEditWhite', color: 'white' },
        { class: 'colEditPurple', color: 'purple' },
        { class: 'colEditCyan', color: 'cyan' },
        { class: 'colEditLime', color: 'lime' },
        { class: 'colEditRed', color: 'red' },
        { class: 'colEditBrown', color: 'brown' },
        { class: 'colEditOrange', color: 'orange' },
        { class: 'colEditLightBlue', color: 'lightblue' },
        { class: 'colEditPink', color: 'pink' },
        { class: 'colEditDarkStaleGrey', color: 'darkslategrey' },
    ];

    return (
        <div className={styles.editObj}>
            <h2>Figure editor</h2>
            <div className={styles.editColor}>
                <div className={styles.editColorButtons}>
                    {buttons.map((button) => (
                        <button
                            key={button.color}
                            className={styles[button.class]}
                            onClick={() => newColor(button.color)}
                        />
                    ))}
                </div>
                <p className={styles.objPropName}>
                    {selectedObject.color.charAt(0).toUpperCase() +
                        selectedObject.color.slice(1)}
                </p>
            </div>
            <div className={styles.editButtonForm}>
                <div className={styles.formEditorContainer}>
                    <button
                        className={styles.objForm}
                        onClick={newShape}
                        style={{
                            backgroundColor: selectedObject.color,
                            borderRadius: selectedObject.radius,
                            height: selectedObject.size,
                            width: selectedObject.size,
                        }}
                    />
                </div>
                <p className={styles.objPropName}>
                    {selectedObject.radius === '50%' ? 'Circle' : 'Square'}
                </p>
            </div>
            <div>
                <input
                    className={styles.sizeRange}
                    type="range"
                    min={60}
                    max={100}
                    step={5}
                    value={selectedObject.size}
                    onChange={(e) => {
                        const newSize = Number(e.target.value);
                        setObjects((prev) =>
                            prev.map((obj) =>
                                obj.id === selectedObject.id
                                    ? { ...obj, size: newSize }
                                    : obj,
                            ),
                        );
                    }}
                />
            </div>
            <div className={styles.queueContainer}>
                <button className={styles.arrowButton} onClick={decreaseQueue}>
                    {'<'}
                </button>
                <div className={styles.queueLabel}>
                    <p>Queue:</p>
                    <p>{selectedObject.queue}</p>
                </div>
                <button className={styles.arrowButton} onClick={increaseQueue}>
                    {'>'}
                </button>
            </div>
            <button className={styles.deleteFigure} onClick={deleteFigure}>
                Delete figure
            </button>
        </div>
    );
}

export default FigureEditor;
