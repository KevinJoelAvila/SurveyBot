//Crea la encuesta
function poll(args, message){

    var randomEmoji = require('./random-unicode-emoji');
    let options = arrayPoll(args);
    trimPoll(options);

    // Verifica si hay al menos 2 opciones
    if (options.length < 2 && options.length > 20) {
        message.reply('Debes proporcionar al menos 2 opciones y un maximo de 20 para esta votación');
        return;
    }

    //Array con los emojis para cada opcion
    var emojis = randomEmoji.random({count: options.length});

    // Crea un mensaje que muestra las opciones y reacciona con emojis
    let pollMessage = votingMessage(options, emojis);
    
    //Envia el mensaje
    sendMessage(pollMessage, emojis, message, options);
}

//Envia los emojis correspondientes a las opciones
function sendMessage(votingMessage, emojis, message, options){

    message.channel.send(votingMessage)
    .then(sentMessage => {
        // Reacciona con emojis a la votación
        for (let i = 0; i < options.length; i++) {
            const emoji = emojis[i];
            sentMessage.react(emoji);
        }
    })
    .catch(error => {
        console.error(error);
    });

}

// // Crea un mensaje que muestra las opciones y reacciona con emojis
function votingMessage(options, emojis){
    
    let votingMessage = `¡Nueva votación!\n\n`;
    
    
    for (let i = 0; i < options.length; i++) {
        const emoji = emojis[i];
        votingMessage += `${emoji}  ${options[i]}\n\n`;
    }
    
    return votingMessage += `¡Vota reaccionando con el emoji correspondiente a tu elección!`;
}

// Separa las opciones y almacena en un array
function arrayPoll(args){

    let array = args.join(' ').split(',');

    return array;
}

// Elimina los espacios vacíos al principio y al final de cada opción
function trimPoll(options){
    
    for (let i = 0; i < options.length; i++) {
        options[i] = options[i].trim();
    }

}

module.exports.poll = poll;
