import styles from './AudioTrack.module.css';

function AudioTrack({ objects, clips, setClips }) {
    return (
        <div className={styles.audioTrack}>
            {Array.from({ length: 15 }, (_, i) => {
                const object = objects.find((o) => o.queue === i + 1);

                return (
                    <div
                        key={i}
                        className={styles.clip}
                        style={{
                            backgroundColor: object?.color,
                        }}
                    >
                        <div
                            className={styles.queue}
                            style={{
                                backgroundColor: object && '#1e1e1ebb',

                                borderRadius:
                                    object?.radius === '50%' ? '100%' : '5%',
                            }}
                        >
                            <p>{i + 1}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AudioTrack;
