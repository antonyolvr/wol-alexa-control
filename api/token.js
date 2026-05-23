export default async function handler(req, res) {
  const { code, grant_type, refresh_token } = req.body;

  const params = new URLSearchParams();
  params.append('client_id', process.env.LWA_CLIENT_ID);
  params.append('client_secret', process.env.LWA_CLIENT_SECRET);

  if (grant_type === 'refresh_token') {
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);
  } else {
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', req.body.redirect_uri || '');
  }

  const response = await fetch('https://api.amazon.com/auth/o2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('LWA token error:', JSON.stringify(data));
    return res.status(400).json(data);
  }

  return res.status(200).json(data);
}