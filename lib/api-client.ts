async function lobby(type, body) {
  const response = await fetch('/api/lobby', {
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

export default {lobby}
