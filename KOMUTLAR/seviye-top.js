const Discord = require('discord.js');
const db = require("orio.db")

exports.run = async (client, message, args) => {
  
let sayi = 1;
let seviyetop = [...message.guild.members.cache.filter(mem => !mem.user.bot && db.has(`puancik_${mem.user.id + message.guild.id}`)).values()].sort((a, b) => {return ((db.get(`seviye_${b.user.id+message.guild.id}`) || 0) - (db.get(`seviye_${a.user.id+message.guild.id}`) || 0))})
let sira = seviyetop.findIndex(e => e.id === message.author.id)
seviyetop = seviyetop.slice(0, 10).map(member => {
return `\n\`${sayi++}.\` <@${member.user.id}> | **Level: \`${db.get(`seviye_${member.user.id+message.guild.id}`) || 0}\` XP: \`${db.get(`puancik_${member.user.id+message.guild.id}`)}\`**`});

message.channel.send({ embeds:[new Discord.MessageEmbed()
.setColor("BLUE")
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true}) })
.setDescription(`${message.guild.name} Level Top 10 (\`Your Turn: ${sira+1}\`)\n${seviyetop}`)
.setFooter({ text: `${client.user.username} Level Top System!`, iconURL: client.user.displayAvatarURL() })
]})
};

exports.conf = {
    aliases: []
  };
  
  exports.help = {
    name: 'level-top',
    description: 'Shows Level Top 10 List.',
    usage: 'seviye-top',
    category: 'seviye'
  };