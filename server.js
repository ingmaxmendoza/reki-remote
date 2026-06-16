// server.js
const os = require('os');
const path = require('path');
const express = require('express');
const mediaRouter = require('./routes/media');
const typeRouter = require('./routes/type');

const PORT = 5757;

function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/media', mediaRouter);
app.use('/type', typeRouter);

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLanIp();
  console.log(`Reki running. Open this on your phone: http://${ip}:${PORT}`);
});
