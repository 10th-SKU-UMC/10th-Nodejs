const express = require('express');

const app = express();
const PORT = 3000;

// 기본 라우터
app.get('/', (req, res) => {
    res.send('서버 실행 성공 🚀');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});