import styles from './Sidebar.module.css'

import FigureEditor from './FigureEditor';

function Sidebar({
    doubleClickedObjId,
    setDoubleClickedObjId,
    objects,
    setObjects,
    clips,
    setClips,
}) {
    return (
        <aside className={styles.sidebar}>
            {doubleClickedObjId ? (
                <FigureEditor
                    doubleClickedObjId={doubleClickedObjId}
                    setDoubleClickedObjId={setDoubleClickedObjId}
                    objects={objects}
                    setObjects={setObjects}
                    clips={clips}
                    setClips={setClips}
                />
            ) : (
                <div className={styles.noneSelected}>
                    <p>Select an object to edit</p>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
