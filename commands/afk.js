module.exports.run = async (bot, message, args, prefix, content) => {
        let afkmsg = args.join(" ");
        if (!afkmsg) afkmsg = "No reason provided.";
        bot.rateLimits.afk.push(message.author.id);
        message.reply(`You are now AFK!!!: \`${afkmsg}\`\nTo become un-AFK, just talk again.`).then(msg => msg.delete(5000)).catch(function() {});
        message.delete().catch(function() {});
}
module.exports.help = {
        name: "afk"
}
