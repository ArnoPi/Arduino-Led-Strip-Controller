const express = require('express');
const http = require('http');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const port = 5000;

app.use(cors());

const arduinoPort = new SerialPort({
  path: 'COM3', // Pas aan naar jouw seriële poort
  baudRate: 9600,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

arduinoPort.on('open', () => {
  console.log('Seriële poort geopend');
});

arduinoPort.on('error', (err) => {
  console.error('Seriële fout: ', err.message);
});

io.on('connection', (socket) => {
  console.log('Nieuwe client verbonden');

  socket.on('disconnect', () => {
    console.log('Client ontkoppeld');
  });

  socket.on('set-color', (data) => {
    const { color, brightness, isOn } = data;
    const command = {
      type: 'color',
      red: color.r,
      green: color.g,
      blue: color.b,
      brightness: brightness,
      isOn: isOn,
    };
    sendCommandToArduino(command);
  });

  socket.on('set-power', (data) => {
    const { isOn } = data;
    const command = {
      type: 'power',
      isOn: isOn,
    };
    sendCommandToArduino(command);
  });
});

function sendCommandToArduino(command) {
  const commandString = JSON.stringify(command) + '\n';
  arduinoPort.write(commandString, (err) => {
    if (err) {
      console.error('Error bij het verzenden naar Arduino: ', err);
    } else {
      console.log('Verzonden naar Arduino: ', commandString);
    }
  });
}

server.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
