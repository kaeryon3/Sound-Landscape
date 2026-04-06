import styles from './Rightbar.module.css'

function Rightbar( {newObject, playTrack, isPlaying} ) {
    return (
        <aside className={styles.rightAside}>
            <button className={styles.createObject} onClick={newObject}>Add figure</button>
            <button className={styles.runTrack} onClick={playTrack}>{isPlaying}</button>
        </aside>
    )
}

export default Rightbar