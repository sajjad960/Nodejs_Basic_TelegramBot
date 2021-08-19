const Telegraf = require("telegraf");

const bot = new Telegraf("1949627012:AAG7EXp1WTnoYHGXxtOpmoa8kkmNXFzINfo");

// Command
//        /start
bot.start((ctx) => {
  ctx.reply(
    ctx.from.first_name +
      " have entered the start command and it is a " +
      ctx.updateSubTypes[0]
  );
  //   console.log(ctx);
  //   console.log(ctx.from);
  //   console.log(ctx.chat);
  //   console.log(ctx.message);
  //   console.log(ctx.updateSubTypes);
});

bot.help((ctx) => {
  ctx.reply("You have entered the help command");
});

bot.settings((ctx) => {
  ctx.reply("You have entered the settings command");
});

bot.command(["test", "Test", "test1"], (ctx) => {
  ctx.reply("Hello world");
});

// Hears (work for /cat or cat)
// for allow bot to group command, Turn off group privacy form BOTFATHER
bot.hears("cat", (ctx) => {
  ctx.reply("Meow");
});

//On method
// checking command/file/stricker etc --we can also control chat members activity
bot.on("sticker", (ctx, next) => {
  ctx.state.apple = 5;
  ctx.reply("this is a sticker message");
  next(ctx);
});

//mention, phone, hashtag method
bot.mention("botfather", (ctx) => {
  ctx.reply("mention method");
});

bot.phone("+8801650103255", (ctx) => {
  ctx.reply("Phone method");
});
bot.hashtag("hash", (ctx) => {
  ctx.reply("hashtag method");
});

// everytime user use this bot ,and bot.use run
bot.use((ctx) => {
  ctx.reply(ctx.state.apple);
  next(ctx);
});

// //geting apple value
// bot.hears("apple", (ctx) => {
//   ctx.reply(ctx.state.apple);
// });

//NOTE
//1) For getting next middleware execution we need to call next on fist one
//2) If we do not use ctx on next, it work fine(two middleware execution) but after ctx changed we ar not geting the changed ctx.
//3) we can manage state with the help of ctx.state.apple = 5;
// 4) we can send message to specific ctx.chat.id (bot.telegram.sendMessage(ctx.chat.id, 'hello world')) --> we can also use extra parameters here, like sending message but {disable_notification: true}
// 5) if we want to use 4 on ctx.reply('helloworld', {parse_mode: 'Markdown', disable_notification: true})

bot.launch();
