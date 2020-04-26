const hostName = typeof window === 'undefined' ? 'localhost' : window.location.hostname
const isDeployed = hostName.includes('.com')
const gameServerPort = 8001
const storageDir = process.env.MEFOORSAMIM_STORAGE_DIR

module.exports = {
  hostName,
  dev: process.env.NODE_ENV !== 'production',
  serverPort: 8000,
  gameServerPort,
  clientGameServerPort: isDeployed ? 443 : gameServerPort,
  clientGameServerPrefix: isDeployed ? 'https://' : '',
  gameServerStorageDir: `${storageDir}/game`,
  lobbyStorageDir: `${storageDir}/lobby`,
  defaultNumberOfNamesToFill: 20,
}
