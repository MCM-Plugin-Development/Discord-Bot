exports.create = (message, { title, desc, fields, thumbnail, image, color, files, code, inline = true }) => {
  if ((code != undefined || code) && fields != undefined) {
    for (field of fields) {
      if (field.code != undefined && !field.code) { continue }
      field.value = `\`\`\`${typeof code === 'string' ? code : ''}\n${field.value}\`\`\``
    }
  }

  if (inline && fields != undefined) {
    for (field of fields) {
      field.inline = true
    }
  }

  return {
    embed: {
      title: title,
      description: Array.isArray(desc) ? desc.join('\n') : desc,
      footer: {
        text: `${message.author.tag} (${message.author.id}) <${message.content.slice(0, 20)}${message.content.length > 20 ? '...' : ''}>`,
        icon_url: message.author.avatarURL()
      },
      thumbnail: {
        url: thumbnail
      },
      image: {
        url: image
      },
      color: color,
      timestamp: new Date(),
      fields: fields,
      files: files
    }
  }
}

exports.send = async (message, { title, desc, fields, thumbnail, image, color, files, code, inline }, react = true) => {
  return await message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color, files, code, inline }))
}

exports.edit = async (message, msg, { title, desc, fields, thumbnail, image, color, files, code, inline }) => {
  return await msg.edit(this.create(message, { title, desc, fields, thumbnail, image, color, files, code, inline }))
}

exports.debug = async (message, content) => {
  return await message.channel.send(this.create(message, {
    desc: `\`\`\`${content}\`\`\``
  }))
}

exports.error = async (message, error, content = '') => {
  return await message.channel.send(this.create(message, {
    desc: [content, '```js', `${error.name}: ${error.message}`, '```']
  }))
}
