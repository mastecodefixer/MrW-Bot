module.exports.run = async (bot, message) => {
	const uptime = bot.uptime;
	var days = ((uptime) - (uptime % 86400000)) / 86400000;
	var hours = (((uptime) - (uptime % 3600000)) / 3600000) - (days * 24);
	var minutes = ((uptime % 3600000) - (uptime % 3600000) % (60000)) / 60000;
	var seconds = ((uptime % 3600000) % 60000) - (((uptime % 3600000) % 60000) % 1000);
	var milliseconds = (((uptime % 3600000) % 60000) % 1000) - (((uptime % 3600000) % 60000) % 1);
	if (days > 1) {
		days = `\`${days}\` days, `;
	} else if (days === 1) {
		`\`${days}\` day, `;
	} else {
		days = "";
	}
	if (hours > 1) {
		hours = `\`${hours}\` hours, `;
	} else if (hours === 1) {
		`\`${hours}\` hour, `;
	} else {
		hours = "";
	}
	if (minutes > 1) {
		minutes = `\`${minutes}\` minutes, `;
	} else if (minutes === 1) {
		`\`${minutes}\` minute, `;
	} else {
		minutes = "";
	}
	if ((seconds / 1000) > 1) {
		seconds = `\`${seconds/1000}\` seconds, `;
	} else if ((seconds / 1000) === 1) {
		seconds = `\`${seconds/1000}\` second, `;
	} else {
		seconds = "";
	}
	milliseconds = `and \`${milliseconds}\` milliseconds.`;
	message
		.reply(`The bot has been online for ${days}${hours}${minutes}${seconds}${milliseconds}`)
		.catch(() => {
			message.author.send(`You attempted to run the \`uptime\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
		});
};
module.exports.help = {
	name: "uptime",
	description: "Sends you the bot's uptime",
	type: "Information"
};
