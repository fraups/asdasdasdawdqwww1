const Discord = require("discord.js")
const db = require("orio.db")
exports.run= async(client, msg, args) => {
  
const data = db.get(msg.guild.id+"ödüller")
if(data){
let sayı = 1
const cse = new Discord.MessageEmbed()
.setTitle("AWARDS")
.setColor("BLUE")
.setDescription(data.map(cs => `**${sayı++} | <@&${cs.roleID}> - \`${cs.lv}.\` Level Required.**`).slice(0, 10).join("\n"))
.setTimestamp()
msg.channel.send({embeds: [cse]})
  
} else {
  msg.reply("**No Roles Set As Rewards!**")
}}

exports.conf = {
aliases: []
}

exports.help = {
name: "level-awards",
description: "Shows Award List.",
usage: "seviye-ödüller",
category: "seviye"

} 