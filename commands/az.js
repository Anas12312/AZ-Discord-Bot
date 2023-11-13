const { SlashCommandBuilder, EmbedBuilder, EmbedAssertions } = require("@discordjs/builders")
const { Player } = require("discord-player");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior, getVoiceConnection, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName("az")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("1")
				.setDescription("Searches for a song and plays it")
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("2")
				.setDescription("Plays a playlist from YT")
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("3")
				.setDescription("Plays a single song from YT")
		),
	execute: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");
        const voiceConnection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

		const player = createAudioPlayer();

        const connection = getVoiceConnection(interaction.guildId)

        let sound;
		if (interaction.options.getSubcommand() === "1") {
            sound = createAudioResource('E:\AZ\DiscordBot\anas.mp3', {
                metadata: {
                    title: 'A good song!',
                },
            })
		}
        else if (interaction.options.getSubcommand() === "2") {
            sound = createAudioResource('/anas.mp3')
		} 
        else if (interaction.options.getSubcommand() === "3") {
            sound = createAudioResource('/anas.mp3')
		}
        try {
            await entersState(voiceConnection, VoiceConnectionStatus.Ready, 5000);
            console.log("Connected: " + interaction.member.voice.channel.guild.name);
        } catch (error) {
            console.log("Voice Connection not ready within 5s.", error);
            return null;
        }
            
        connection.subscribe(player);
        
        player.play(sound);
        
        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        await interaction.reply("anas")
	},
}
