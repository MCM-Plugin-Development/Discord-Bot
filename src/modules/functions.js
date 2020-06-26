module.exports = (client) => {
  client.permLevel = async (client, message) => {
    const permLevels = client.config.permLevels.sort((a, b) => b.level - a.level)
    return new Promise(async (resolve, reject) => {
      for (const permLevel of permLevels) {
        await permLevel.check(client, message).then(check => {
          if (check) {
            resolve(permLevel.level)
          }
        }).catch((e) => {
          reject(permLevel.level)
        })
      }
    })
  }
}
