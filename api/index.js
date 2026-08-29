import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Proxy Webshare Anda
const proxyUrl = 'http://ikxxozql:rqmjuzeaeebe@31.59.20.176:6754';
const agent = new HttpsProxyAgent(proxyUrl);

export default async function handler(req, res) {
  // Set CORS Header agar Google Apps Script/Client bisa mengakses tanpa kendala
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 🌟 1. Jika GET: Tampilkan IP Proxy Webshare (bukan IP Vercel lagi)
  if (req.method === 'GET') {
    try {
      const ipRes = await axios.get('https://ipv4.webshare.io/', {
        httpsAgent: agent,
        proxy: false
      });
      return res.status(200).json({ ip_proxy_webshare: ipRes.data.trim() });
    } catch (err) {
      return res.status(500).json({ error: 'Gagal mengecek IP Proxy', details: err.message });
    }
  }

  // 🌟 2. Jika POST: Teruskan transaksi ke Digiflazz LEWAT Proxy Webshare
  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://api.digiflazz.com/v1/transaction', req.body, {
        httpsAgent: agent,
        proxy: false,
        headers: { 'Content-Type': 'application/json' }
      });

      return res.status(response.status).json(response.data);
    } catch (err) {
      // Menangkap respon error dari API Digiflazz (misal saldo kurang / IP ditolak)
      const errorData = err.response?.data || { error: err.message };
      const statusCode = err.response?.status || 500;
      return res.status(statusCode).json(errorData);
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
