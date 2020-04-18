const hostName = typeof window === 'undefined' ? 'localhost' : window.location.hostname
const isDeployed = hostName.includes('.com')

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  serverPort: 8000,
  gameServerPort: 8001,
  clientGameServerPort: isDeployed ? 443 : 8001,
  clientGameServerScheme: isDeployed ? 'https' : 'http'
}
