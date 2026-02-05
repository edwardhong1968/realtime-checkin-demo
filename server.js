const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// 編號對照表
const employeeMap = {
  "123456": "周",
  "234567": "洪",
  "345678": "徐",
  "456789": "蔡",
  "567890": "李"
};

// 手機打卡 POST
app.post('/checkin', (req, res) => {
  let input = (req.body.qr || '').trim();
  let employeeName = employeeMap[input] || input || '未知員工';

  const message = `${employeeName} 打卡完成`;

  // 推送給電腦顯示
  io.emit('checkin', message);

  res.json({ success: true, message });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
