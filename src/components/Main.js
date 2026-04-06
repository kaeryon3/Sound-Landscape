import { useState, useRef } from 'react';
import styles from './Main.module.css';

import green from '../data/sounds/green.mp3';
import blue from '../data/sounds/blue.mp3';
import yellow from '../data/sounds/yellow.mp3';
import grey from '../data/sounds/grey.mp3';
import white from '../data/sounds/white.mp3';
import purple from '../data/sounds/purple.mp3';
import cyan from '../data/sounds/cyan.mp3';
import lime from '../data/sounds/lime.mp3';
import red from '../data/sounds/red.mp3';
import brown from '../data/sounds/brown.mp3';
import orange from '../data/sounds/orange.mp3';
import lightblue from '../data/sounds/lightblue.mp3';
import pink from '../data/sounds/pink.mp3';
import darkslategrey from '../data/sounds/darkslategrey.mp3';

import Sidebar from './Sidebar';
import CanvasContainer from './CanvasContainer';
import AudioTrack from './AudioTrack';
import Rightbar from './Rightbar';

function Main() {
    const canvasRef = useRef(null);
    const colors = [
        'green',
        'blue',
        'yellow',
        'grey',
        'white',
        'purple',
        'cyan',
        'lime',
        'red',
        'brown',
        'orange',
        'lightblue',
        'pink',
        'darkslategrey',
    ];

    const sounds = { green, blue, yellow, grey, white, purple, cyan, lime, red, brown, orange, lightblue, pink, darkslategrey };
    const [isPlaying, setIsPlaying] = useState('▶');

    const [objects, setObjects] = useState([]);
    const queueObjects = objects.filter((obj) => obj.queue > 0);

    const [draggingId, setDraggingId] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [doubleClickedObjId, setDoubleClickedObjId] = useState('');

    const [clips, setClips] = useState([]);

    function playTrack() {
        const maxQueue = Math.max(...queueObjects.map((obj) => obj.queue));
        const clipsInTrack = Array.from({ length: maxQueue }, () => 'empty');

        queueObjects.map((obj) => (clipsInTrack[obj.queue - 1] = obj));

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const playTrack = async () => {
            if (isPlaying === '▶') {
                setIsPlaying('⏹');
                for (const clip of clipsInTrack) {
                    if (clip === 'empty') {
                        await delay(500);
                        continue;
                    }

                    const audio = new Audio(sounds[clip.color]);
                    audio.playbackRate = 0.025 * (clip.size - 60) + 0.5;

                    await new Promise((resolve) => {
                        audio.onended = resolve;
                        audio.play();
                    });
                }
                setIsPlaying('▶');
            }
        };

        playTrack();
    }

    function newObject() {
        const maxWidth = canvasRef.current.offsetWidth - 79;
        const maxHeight = canvasRef.current.offsetHeight - 79;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomRadius = Math.random() < 0.5;

        setObjects((prev) => [
            ...prev,
            {
                id: Date.now(),
                left: Math.floor(Math.random() * maxWidth),
                top: Math.floor(Math.random() * maxHeight),
                color: randomColor,
                radius: randomRadius ? '50%' : '5%',
                size: '80',
                queue: 0,
            },
        ]);
    }

    function startDragging(id, e) {
        setDraggingId(id);

        const rect = e.target.getBoundingClientRect();

        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }

    function dragging(e) {
        if (!draggingId) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();

        const draggingFigure = objects.find(
            (figure) => figure.id === draggingId,
        );
        const objectSize = draggingFigure.size;

        let newLeft = e.clientX - canvasRect.left - offset.x;
        let newTop = e.clientY - canvasRect.top - offset.y;

        newLeft = Math.max(0, Math.min(newLeft, canvasRect.width - objectSize));
        newTop = Math.max(0, Math.min(newTop, canvasRect.height - objectSize));

        setObjects((prev) =>
            prev.map((obj) =>
                obj.id === draggingId
                    ? { ...obj, left: newLeft, top: newTop }
                    : obj,
            ),
        );
    }

    function stopDragging() {
        setDraggingId(null);
    }

    return (
        <div className={styles.main}>
            <Sidebar
                doubleClickedObjId={doubleClickedObjId}
                setDoubleClickedObjId={setDoubleClickedObjId}
                setObjects={setObjects}
                objects={objects}
                clips={clips}
                setClips={setClips}
            ></Sidebar>
            <div className={styles.centerArea}>
                <CanvasContainer
                    canvasRef={canvasRef}
                    objects={objects}
                    startDragging={startDragging}
                    dragging={dragging}
                    stopDragging={stopDragging}
                    setDoubleClickedObjId={setDoubleClickedObjId}
                />
                <AudioTrack
                    objects={objects}
                    clips={clips}
                    setClips={setClips}
                />
            </div>
            <Rightbar
                newObject={newObject}
                playTrack={playTrack}
                isPlaying={isPlaying}
            ></Rightbar>
        </div>
    );
}

export default Main;
