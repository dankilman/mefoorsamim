module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  serverPort: 8000,
  gameServerPort: 8001,
  clientGameServerPort: !!process.env.DEPLOYED ? 443 : 8001,
  clientGameServerScheme: !!process.env.DEPLOYED ? 'https' : 'http'
}
