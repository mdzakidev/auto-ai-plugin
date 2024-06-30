const axios = require('axios');
const moment = require('moment-timezone');
/*====================================================
Created By KiiCode
Instagram = @kiicodeit
Tiktok = @kiicodeproject
YouTube = @KiiCodeProject
Channel = https://whatsapp.com/channel/0029VaZSdai5Ui2TMoNsYo0J
Note: minimal follow sosmed admin dan jangan hapus cr rek
=====================================================*/
let handler = async (m, { conn, text }) => {
  conn.elxyz = conn.elxyz || {};

  if (!text) throw '*• Example:* .elxyz *[on/off]*';

  if (text === 'on') {
    conn.elxyz[m.chat] = { pesan: [] };
    m.reply('[ ✓ ] Success create session chat');
  } else if (text === 'off') {
    delete conn.elxyz[m.chat];
    m.reply('[ ✓ ] Success delete session chat');
  }
};

handler.before = async (m, { conn }) => {
  conn.elxyz = conn.elxyz || {};
  if (!m.quoted) return;
  const prompt = m.text;
  let aiStatus = {};

  if (!prompt || prompt.startsWith('/')) {
    if (!aiStatus[m.chat]) return;
  }

  console.log(`[${moment().format('HH:mm')}] from @${m.sender}: ${prompt}`);

  try {
    const now = moment().tz('Asia/Jakarta');
    const jam = now.format('HH:mm');
    const tgl = now.format('DD-MM-YYYY');
    const hari = now.format('dddd');

    let postData = {
      prompt: prompt,
      sessionId: `${m.sender}`,
      character: 'Kamu adalah elxyz, kamu adalah ai yang cerdas dan baik'
    };

    let response = await axios({
      url: 'https://elxyz.me/api/chat',
      method: 'POST',
      data: new URLSearchParams(Object.entries(postData)),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    conn.sendMessage(m.chat, { text: `${response.data.data.answer}` }, { quoted: m });
  } catch (error) {
    console.error('Error during chat request:', error);
    return 'An error occurred during the chat process.';
  }
};

handler.command = ['elxyz'];
handler.tags = ['ai'];
handler.help = ['elxyz'].map(a => a + ' *[on/off]*');

module.exports = handler;
