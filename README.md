# 🎙 Proximity Voice Chat

ระบบ Voice Chat แบบ Proximity สำหรับเว็บไซต์ — ยิ่งอยู่ใกล้กันบนแผนที่ยิ่งได้ยินเสียงชัด  
สร้างด้วย [PeerJS](https://peerjs.com/) + WebRTC ไม่ต้องติดตั้ง Server เพิ่มเติม

---

## ✨ ฟีเจอร์

- พูดคุยด้วยเสียงจริงผ่าน Browser
- ระดับเสียงปรับตามระยะห่างบนแผนที่อัตโนมัติ
- แชร์ลิงก์เชิญผู้เล่นด้วย URL `?join=PEER_ID`
- รองรับหลายคนพร้อมกัน
- Responsive — ใช้ได้ทั้ง PC และมือถือ

---

## 🚀 วิธี Deploy

### วิธีที่ 1 — GitHub Pages (ฟรี ง่ายสุด)

> ได้ URL: `https://USERNAME.github.io/REPO_NAME`

**ขั้นตอน:**

1. **สร้าง Repository ใหม่บน GitHub**
   - ไปที่ [github.com/new](https://github.com/new)
   - ตั้งชื่อ เช่น `proximity-voice-chat`
   - เลือก **Public**
   - กด **Create repository**

2. **อัปโหลดไฟล์**
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/proximity-voice-chat.git
   git push -u origin main
   ```
   หรืออัปโหลดไฟล์ตรงๆ ผ่านหน้าเว็บ GitHub (ลาก index.html วางได้เลย)

3. **เปิด GitHub Pages**
   - ไปที่ **Settings** → **Pages**
   - Source: เลือก `main` branch → `/ (root)`
   - กด **Save**
   - รอ 1–2 นาที จะได้ URL

> ⚠️ GitHub Pages รองรับ HTTPS อัตโนมัติ — ไมค์ใช้งานได้เลย

---

### วิธีที่ 2 — Render.com (Static Site ฟรี)

> ได้ URL: `https://YOUR-APP.onrender.com`

**ขั้นตอน:**

1. **Push โค้ดขึ้น GitHub ก่อน** (ทำตามขั้นตอนข้างบน)

2. **สมัคร/เข้าสู่ระบบ Render**
   - ไปที่ [render.com](https://render.com) → Sign up ด้วย GitHub

3. **สร้าง Static Site ใหม่**
   - กด **New +** → **Static Site**
   - เลือก Repository: `proximity-voice-chat`
   - กด **Connect**

4. **ตั้งค่า Deploy**

   | ฟิลด์ | ค่า |
   |---|---|
   | Name | `proximity-voice-chat` |
   | Branch | `main` |
   | Root Directory | _(เว้นว่าง)_ |
   | Build Command | _(เว้นว่าง)_ |
   | Publish Directory | `.` |

5. **กด Create Static Site** — รอ 1–2 นาที จะได้ URL

> ✅ Render ให้ HTTPS อัตโนมัติ — ไมค์ใช้งานได้ทันที

---

## 📱 วิธีใช้งาน

1. เปิดเว็บ → รอรับ **รหัสของฉัน** (Peer ID)
2. **คัดลอกลิงก์** แล้วส่งให้เพื่อน
3. เพื่อนเปิดลิงก์ → กด **เชื่อมต่อ** ในกล่อง popup
4. ทั้งคู่กด **เปิดไมค์** → อนุญาต Microphone
5. ลาก **"ME"** บนแผนที่ — ยิ่งใกล้กันยิ่งได้ยินเสียงชัดขึ้น

---

## 🔧 Tech Stack

- **PeerJS** — WebRTC wrapper สำหรับ P2P voice
- **Web Audio API** — ปรับ volume ตามระยะห่าง
- **HTML5 Canvas** — แผนที่ผู้เล่น
- ไม่ต้องการ Backend — ใช้ PeerJS Cloud Server ฟรี

---

## 📝 License

MIT
