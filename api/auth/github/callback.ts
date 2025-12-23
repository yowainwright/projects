interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { code } = await req.json();

  if (!code) {
    return new Response(JSON.stringify({ error: 'Missing code' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  if (!tokenResponse.ok) {
    return new Response(JSON.stringify({ error: 'Failed to exchange code' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const tokenData: GitHubTokenResponse = await tokenResponse.json();

  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${tokenData.access_token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!userResponse.ok) {
    return new Response(JSON.stringify({ error: 'Failed to get user info' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user: GitHubUser = await userResponse.json();

  return new Response(
    JSON.stringify({
      token: tokenData.access_token,
      user: {
        login: user.login,
        avatar_url: user.avatar_url,
        name: user.name,
        email: user.email,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
