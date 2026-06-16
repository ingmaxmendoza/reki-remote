# Reki — LAN Media & Text Remote — Design Spec

Date: 2026-06-16

## Purpose

A browser-based remote control app, "Reki," that lets a phone on the same LAN
control media playback on a Windows PC and type text into the PC's
currently focused window, without installing any phone app.

## Architecture

- **Server**: Node.js + Express, running on the Windows PC, started manually
  by the user (e.g. `npm start`).
  - Listens on port `5757` on all LAN interfaces.
  - On startup, prints the PC's LAN IP and the URL to open
    (e.g. `http://192.168.1.42:5757`) to the console.
- **Frontend**: a single static HTML/CSS/JS page (no framework), served by
  the same Express server, mobile-friendly (large touch targets).
- **Input simulation**: `@nut-tree/nut-js` library, used server-side to:
  - Send OS-level media key codes (play/pause, next track, previous track,
    volume up, volume down, mute).
  - Type arbitrary UTF-8 text strings into whatever window currently has
    focus on the PC.
- No authentication, no discovery mechanism (QR/mDNS), no background
  service/tray icon — all explicitly out of scope.

## API

| Method | Path                 | Body              | Effect                                  |
|--------|----------------------|-------------------|------------------------------------------|
| POST   | `/media/play-pause`  | —                 | Sends OS media play/pause key            |
| POST   | `/media/next`        | —                 | Sends OS media next-track key            |
| POST   | `/media/prev`        | —                 | Sends OS media previous-track key        |
| POST   | `/media/volume-up`   | —                 | Sends OS volume-up key                   |
| POST   | `/media/volume-down` | —                 | Sends OS volume-down key                 |
| POST   | `/media/mute`        | —                 | Sends OS mute key                        |
| POST   | `/type`              | `{ "text": "…" }` | Types the given text into focused window |

All endpoints return `200 OK` on success, `500` with an error message body
if nut-js throws (e.g. simulation failure).

## Frontend

Single page (`/`) with:
- Six buttons: Play/Pause, Next, Prev, Vol Up, Vol Down, Mute — each does a
  `fetch('/media/<action>', { method: 'POST' })`.
- A text input + "Send" button that POSTs `{ text }` to `/type`, then
  clears the input on success.
- A small toast/inline message area showing errors if a request fails
  (network error or 500 response).

## Data Flow

Phone taps a button or submits text → `fetch` POST to server → server
calls nut-js to simulate the key press or type the string → server
responds 200/500 → frontend updates UI (no-op on success, toast on error).

Stateless, one-shot HTTP requests — no websocket/persistent connection
needed since there's no live state to sync between phone and PC.

## Error Handling

- nut-js throws → server catches, responds `500` with `{ error: message }`.
- Frontend fetch failure (network/500) → shows a brief inline error message,
  auto-dismissing after a few seconds.
- No retries, no offline queueing — matches the simple, manually-started,
  LAN-trusted scope.

## Out of Scope

- QR-code pairing / auto-discovery (mDNS, etc.)
- Authentication / PIN protection
- Running as a background service or system-tray app
- App-specific control (e.g. Spotify Web API, VLC HTTP interface) — only
  OS-level media keys are used, so Reki works with whatever app currently
  owns the OS media session.
- Full live virtual keyboard (individual keystroke streaming) — text is
  sent as a complete string on submit, not key-by-key.

## Tech Stack

- Node.js, Express
- `@nut-tree/nut-js` (or current maintained fork, e.g. `@nut-tree-fork/nut-js`
  if the original package is unmaintained at implementation time — verify
  npm availability before installing)
- Plain HTML/CSS/JS frontend, no build step
