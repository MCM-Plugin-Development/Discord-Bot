exports.run = async (client, message, args) => {
    //TODO
    //ticket <new | create | open | make> <name>
}

exports.conf = {
  enabled: true,
  aliases: ['t'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'ticket',
  usage: '<new> <name>',
  description: 'Create a new ticket'
}