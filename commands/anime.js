const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, args) => {
    request.get(`https://api.jikan.moe/v3/search/anime?q=${args.join(" ")}`,(error, response, body) => {
        console.log(args.join(" "));
        let thing = JSON.parse(body);
        let anime = thing.results[0].mal_id;

        request.get(`https://api.jikan.moe/v3/anime/${anime}`, (error, response, body) => {
            let thing = JSON.parse(body);

            

            let embed = new Discord.RichEmbed()
            .setTitle(`${thing.title} (${thing.type})`)
            .setURL(thing.url)
            .setDescription(thing.synopsis)
            .setFooter(`Number of episodes: ${thing.episodes}EP`)
            .setThumbnail(thing.image_url)
            .addField("Score", thing.score)
            .addField("Rating", thing.rating)
            .addField("Season", thing.premiered)
            .setColor(client.config.embedColor);

            message.channel.send(embed);
        });
    });
}

exports.help = {
    name: "anime",
    description: "TODO",
    usage: "TODO"
}
