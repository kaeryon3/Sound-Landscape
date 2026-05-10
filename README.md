🎧 Sound Landscape

An interactive React-based audio-visual playground where users can create, manipulate, and sequence visual objects that generate sound.

## Overview

Sound Landscape is a creative web application that combines visual editing with sound sequencing. Users can create geometric shapes, position them on a canvas, customize their properties, and arrange them into a playback sequence that generates an evolving audio track.

This project was built as an experimental learning exercise focused on:

- interactive UI design
- drag-and-drop mechanics
- state management in React
- audio playback timing and sequencing

## Features

### Visual editor
- Create draggable geometric objects on a canvas
- Randomized color and shape generation
- Resize objects dynamically
- Switch between circle and square shapes
- Delete objects

### Drag & drop system
- Custom drag implementation without external libraries
- Smooth movement inside bounded canvas area
- Offset-based positioning for natural interaction

### Audio sequencing
- Each object is assigned a sound based on its color
- Objects can be arranged into a playback queue (1–15)
- Sequential audio playback system
- Playback speed depends on object size

### Object editor panel
- Change object color via palette
- Adjust size using slider
- Modify shape (circle/square)
- Control playback order (queue system)

## Key Concepts Used

- React functional components
- React Hooks (useState, useRef)
- State management patterns
- Immutable array manipulation
- Mouse event handling
- HTML5 Audio API
- CSS Modules
- Keyframe animations

## Tech Stack

- React
- JavaScript (ES6+)
- CSS Modules
- HTML5 Audio API
