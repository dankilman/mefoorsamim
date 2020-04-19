async function request(endpoint, type, body) {
  const response = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type,
      ...body,
    })
  })
  return await response.json()
}

async function lobby(type, body) {
  return await request('lobby', type, body)
}

async function manage(type, body) {
  return await request('manage', type, body)
}

export default {lobby, manage}
