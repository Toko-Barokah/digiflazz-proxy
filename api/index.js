export default async function handler(req, res) {
  // Jika diakses biasa (GET), tampilkan IP IPv4 milik Vercel
  if (req.method === 'GET') {
    const ipRes = await fetch('https://api4.ipify.org?format=json');
    const data = await ipRes.json();
    return res.status(200).json({ ip: data.ip });
  }

  // Jika POST (transaksi), diteruskan ke Digiflazz
  const response = await fetch('https://api.digiflazz.com/v1/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(200).json(data);
}
