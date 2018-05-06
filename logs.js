const Discord = require("discord.js");

module.exports.run = async (bot) => {
	bot.on("messageDelete", (message) => {
		var messageAttachments = "";
		if (message.attachments.first() !== undefined) messageAttachments = `\n${message.attachments.first().url}`;
		if (message.content !== "" || messageAttachments !== "") {
			var logsDatabase = bot.channels.get("440238037201453056");
			logsDatabase.fetchMessages({ limit: 100 }).then(messages => {
				messages.forEach(msg => {
					var logChannel = bot.channels.get(msg.content.split(" ")[1]);
					if (logChannel == undefined) return msg.delete();
					var logGuild = logChannel.guild;
					if (logGuild == undefined) return msg.delete();
					if (logGuild.id === msg.guild.id) {
						const messageDeleteEmbed = new Discord.RichEmbed()
              .setTitle("Message Delete")
              .setColor("RED")
              .addField("Message Content", `Message ID: \`${message.id}\`\nMessage Author: ${message.author}\nMessage Channel: ${message.channel}\nCreated At: \`${message.createdAt}\`\nDeleted At: \`${Date.now()}\``)
              .setDescription(`\`\`\`${message.content}${messageAttachments}\`\`\``);
            logsDatabase.send({ embed: messageDeleteEmbed }).catch(function() {});
					}
				});
			});
		}
	});
	bot.on("messageUpdate", (oldMessage, newMessage) => {
		var oldmessage = oldMessage
		var newmessage = newMessage
		var omessageAttachments = "";
		var nmessageAttachments = "";
		if (oldmessage.attachments.first() !== undefined) omessageAttachments = `\n${oldmessage.attachments.first().url}`;
		if (oldmessage.content !== "" || omessageAttachments !== "") {
			var logsDatabase = bot.channels.get("440238037201453056");
			logsDatabase.fetchMessages({ limit: 100 }).then(messages => {
				messages.forEach(msg => {
					var logChannel = bot.channels.get(msg.content.split(" ")[1]);
					if (logChannel == undefined) return msg.delete();
					var logGuild = logChannel.guild;
					if (logGuild == undefined) return msg.delete();
					if (logGuild.id === msg.guild.id) {
						const messageDeleteEmbed = new Discord.RichEmbed()
              .setTitle("Message Edit")
              .setColor("RED")
              .addField("Message Information", `Message ID: \`${newmessage.id}\`\nMessage author: ${newmessage.author}\nMessage channel: ${newmessage.channel}\nCreated at: \`${newmessage.createdAt}\`\Edited At: \`${Date.now()}\``)
              .setDescription(`**Old Message:**\`\`\`${oldmessage.content}${omessageAttachments}\`\`\`\n**New Message:**\`\`\`${newmessage.content}${nmessageAttachments}\`\`\``);
            logsDatabase.send({ embed: messageDeleteEmbed }).catch(function() {});
					}
				});
			});
		}
	});
}
