const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Testing"),
    execute:({client, interaction}) => {
        interaction.reply("pong")
    }
    
}