const { SlashCommandBuilder } = require('@discordjs/builders');

const { generateDependencyReport, getVoiceConnection, AudioPlayerStatus, entersState, joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');

const { ChannelType } = require('discord.js');

module.exports = {

data: new SlashCommandBuilder()

.setName('join')

.setDescription('Joins a specified voice channel')

,

execute: async ({client, interaction}) => {

    await interaction.reply({

     content: 'ok',
    
    });
const voiceChannel = interaction.member.voice.channel

const voiceConnection = joinVoiceChannel({

channelId: voiceChannel.id,

guildId: interaction.guildId,

adapterCreator: interaction.guild.voiceAdapterCreator,

})

const connection = getVoiceConnection(interaction.guildId);

const player = createAudioPlayer();

const resource = createAudioResource('E:\AZ\DiscordBot\anas.mp3');

try {

await entersState(voiceConnection, VoiceConnectionStatus.Ready, 5000);

console.log("Connected: " + voiceChannel.guild.name);

} catch (error) {

console.log("Voice Connection not ready within 5s.", error);

return null;

}

connection.subscribe(player);

player.play(resource);

player.on('error', error => {

console.error("a7a");

})



},

};