# Reki

Control your PC's media and keyboard from any phone on the same Wi-Fi network — no app install required, just a browser.

---

## What is Reki?

Reki is a tiny server that runs on your Windows PC and exposes a mobile-friendly web page on your local network. Open the URL on your phone and you get:

- **Media controls** — play/pause, previous/next track, volume up/down
- **Text input** — type anything on your phone and it gets typed on the PC

No Bluetooth pairing. No app store. Just a browser.

---

## Quick Start — Windows (exe)

1. Download `reki-win.exe` from the [Releases](https://github.com/ingmaxmendoza/reki-remote/releases) page
2. Double-click `reki-win.exe`
3. A console window opens and prints a URL like:
   ```
   Reki running. Open this on your phone: http://192.168.x.x:5757
   ```
4. Open that URL on your phone (must be on the same Wi-Fi)
5. Use the on-screen controls

> **Firewall:** Windows may ask if you want to allow Reki through the firewall. Click **Allow** — this is required for your phone to reach the server.

> **First launch:** The exe unpacks some files to your `%TEMP%` folder on first run. This is normal and takes a second.

---

## Phone UI

| Section | What it does |
|---|---|
| **Media** | Play/Pause, Previous, Next, Volume Up, Volume Down |
| **Type** | Tap the text box, type something, hit Send — it gets typed on the PC |

---

## Running from Source

Requires **Node.js 18+**.

```bash
git clone https://github.com/ingmaxmendoza/reki-remote.git
cd reki-remote
npm install
npm start
```

Then open the printed URL on your phone.

---

## Requirements

- Windows 10 or 11 (64-bit)
- Phone and PC on the same Wi-Fi network
- No Node.js required when using the exe

---

## Building the exe yourself

```bash
npm install
npm run build
```

Output: `reki-win.exe` in the project root.
