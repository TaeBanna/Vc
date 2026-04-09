/**
 * server.js  —  ProximityVoice Bridge Server
 *
 * หน้าที่:
 *  1. รับ POST /minecraft-data  จาก BP Addon (Socket.js)
 *  2. ให้ Web client ดึง GET /minecraft-data  ข้อมูลล่าสุด
 *  3. Serve index.html + static files
 *
 * Deploy: Render.com → Static Site ❌  ต้องใช้ Web Service
 *         node server.js  /  PORT จาก environment variable
 */

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── In-memory store ──────────────────────────────────────────
let latestMCData = {
  players: [],
  config:  { maxDistance: 10 },
  ts:      null,
};

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));

// CORS — อนุญาตทุก origin (เพราะ web client อาจ host ต่างที่)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ─── BP Addon → Server ────────────────────────────────────────
// Socket.js ใน BP addon ส่ง POST นี้ทุก ~1 วินาที
app.post('/minecraft-data', (req, res) => {
  const body = req.body;
  if (!body || !Array.isArray(body.players)) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  latestMCData = {
    players: body.players,
    config:  body.config ?? { maxDistance: 10 },
    ts:      Date.now(),
  };

  console.log(`[MC] ${body.players.length} players | dist=${body.config?.maxDistance}`);
  res.json({ ok: true });
});

// ─── Web Client ← Server ──────────────────────────────────────
app.get('/minecraft-data', (req, res) => {
  res.json(latestMCData);
});

// ─── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  const age = latestMCData.ts ? Math.round((Date.now() - latestMCData.ts) / 1000) : null;
  res.json({
    ok:      true,
    players: latestMCData.players.length,
    lastSeen: age !== null ? `${age}s ago` : 'never',
  });
});

// ─── Serve index.html ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`ProximityVoice server running on http://localhost:${PORT}`);
});
