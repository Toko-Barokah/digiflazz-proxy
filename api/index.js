export default async function handler(req, res) {
  const ipRes = await fetch('https://api4.ipify.org?format=json');
  const data = await ipRes.json();
  res.status(200).json(data);
}

  // Jika POST (transaksi dari Flutter), teruskan ke Digiflazz
  const response = await fetch('https://api.digiflazz.com/v1/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(200).json(data);
}
