export default async function handler(req, res) {
  const { redirect_uri, state, scope } = req.query;
  if (!redirect_uri) return res.status(400).send('Missing redirect_uri');

  const params = new URLSearchParams({
    client_id: process.env.LWA_CLIENT_ID,
    scope: 'profile:user_id',
    response_type: 'code',
    redirect_uri: redirect_uri,
    state: state || ''
  });

  return res.redirect(`https://www.amazon.com/ap/oa?${params.toString()}`);
}