import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import io from 'socket.io-client';
import './styles.css'; // Importeer het aangepaste CSS-bestand

const socket = io('http://localhost:5000');

function App() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const [brightness, setBrightness] = useState(100);
  const [isOn, setIsOn] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleColorChange = (newColor) => {
    setColor(newColor.rgb);
    sendColor(newColor.rgb, brightness, isOn);
    showSnackbar('Kleur bijgewerkt');
  };

  const handleBrightnessChange = (event) => {
    const newBrightness = event.target.value;
    setBrightness(newBrightness);
    sendColor(color, newBrightness, isOn);
  };

  const handleOnOffToggle = () => {
    setIsOn(!isOn);
    socket.emit('set-power', { isOn: !isOn });
    showSnackbar(isOn ? 'LED-strip uitgeschakeld' : 'LED-strip ingeschakeld');
  };

  const sendColor = (color, brightness, isOn) => {
    socket.emit('set-color', { color, brightness, isOn });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000); // Snackbar verdwijnt na 3 seconden
  };

  return (
    <div className="container">
      <h1>Arduino LED Strip Controller</h1>

      <div className="color-picker">
        <SketchPicker color={color} onChangeComplete={handleColorChange} disableAlpha />
      </div>

      <div className="slider-container">
        <h2>Helderheid</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={handleBrightnessChange}
        />
        <p>{brightness}%</p>
      </div>

      <button
        onClick={handleOnOffToggle}
        className={`toggle-button ${isOn ? 'on' : ''}`}
      >
        {isOn ? 'Schakel Uit' : 'Schakel Aan'}
      </button>

      {snackbarOpen && (
        <div className="snackbar show">{snackbarMessage}</div>
      )}
    </div>
  );
}

export default App;
