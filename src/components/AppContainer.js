import Main from '../components/Main';
import styles from './AppContainer.module.css'

function AppContainer() {
    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <h1>🎵 Sound Landscape</h1>
            </header>
            <Main></Main>
        </div>
    );
}

export default AppContainer;
