import styles from './CanvasContainer.module.css'

function CanvasContainer({
    canvasRef,
    objects,
    startDragging,
    dragging,
    stopDragging,
    setDoubleClickedObjId,
}) {
    function clientDoubleClicked(id) {
        setDoubleClickedObjId(id);
    }

    return (
        <div
            className={styles.canvasContainer}
            ref={canvasRef}
            onMouseMove={dragging}
            onMouseUp={stopDragging}
            style={{ position: 'relative' }}
        >
            {objects.map((obj) => (
                <div
                    key={obj.id}
                    className={styles.obj}
                    onMouseDown={(e) => {
                        startDragging(obj.id, e);
                        clientDoubleClicked(obj.id);
                    }}
                    style={{
                        position: 'absolute',
                        left: obj.left,
                        top: obj.top,
                        backgroundColor: obj.color,
                        borderRadius: obj.radius,
                        height: `${obj.size}px`,
                        width: `${obj.size}px`,
                    }}
                />
            ))}
        </div>
    );
}

export default CanvasContainer;
