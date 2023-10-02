const {Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const PREFIX = '!'; // Prefix to identify the bot commands
const pollFunctions = require("./pollFunctions.js");

const client = new Client({

    intents:[Object.keys(GatewayIntentBits)],
    
    partials:[Object.keys(Partials)]

});

client.on("messageCreate", message => {

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  
    let args = message.content.slice(PREFIX.length).trim().split(' ');
    let command = args.shift().toLowerCase();
  
    //Help Commands
    if (command === "help") message.reply("Que quieres payaso/a");

    if (command === "help2") message.reply("!hpoll : Ayuda con votacion de máximo 20 opciones\n\n" + 
        "!poll : Ayuda con la votacion personalizada");

    if(command === "poll" && args.length == 0 ) message.reply("Para crear una encuesta usa el comando:\n\n !poll <Opcion1>,<Opcion2>,<Opcion3>,......\n\n Los emojis para cada opcion seran aleatorios.");
    
    else pollFunctions.poll(args, message);

});

client.login(config.token).then(()=>{
    console.log("El bot esta online");
})

