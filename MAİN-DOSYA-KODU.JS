
setInterval(() => {
client.guilds.cache.map(cs => {
const cdb = require("orio.db")
const data = cdb.get(cs.id+"ödüller")
if(data){
  data.map(csr => {
    const rol = cs.roles.cache.get(csr.roleID)
    if(!rol){
      cdb.unpush(cs.id+"ödüller", {roleID: csr.roleID})
    }
  })
}
})
}, 30000)


client.on("messageCreate", async msg => {
    const cdb = require("orio.db")
    
    if (!msg.guild) return
    if (msg.author.bot) return
    
    if (msg.content.length > 5) {
      cdb.add(`puancik_${msg.author.id + msg.guild.id}`, 2)
    }
    let lvll = cdb.get(`seviye_${msg.author.id + msg.guild.id}`) || 1
    lvll = lvll*100
    if (cdb.get(`puancik_${msg.author.id + msg.guild.id}`) > lvll) {
      cdb.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
      cdb.delete(`puancik_${msg.author.id + msg.guild.id}`)
      
      if (msg.content.length > 5) {
        cdb.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
      }
      
      const data = cdb.get(msg.guild.id+"ödüller");
      if(data){
        const roles = data.filter(cs => cdb.get(`seviye_${msg.author.id + msg.guild.id}`)+1 > cs.lv)
   if(roles){
     let ss
     roles.map(cs => {
       if(msg.guild.roles.cache.get(cs.roleID)){
         if(!msg.member.roles.cache.has(cs.roleID)){
        ss = true
       msg.member.roles.add(cs.roleID)
         }      
       }
     })
     if(ss){
        msg.reply("**🎉 Congratulations "+cdb.get(`seviye_${msg.author.id + msg.guild.id}`)+". You Leveled Up and Won Role as a Reward!**")
     } else {
       msg.reply("**🎉 Congratulations "+cdb.get(`seviye_${msg.author.id + msg.guild.id}`)+". You've Leveled Up!**")
     }
   }
    } else {
       msg.reply("**🎉 Congratulations "+cdb.get(`seviye_${msg.author.id + msg.guild.id}`)+". You've Leveled Up!**")
    }}
  });
  