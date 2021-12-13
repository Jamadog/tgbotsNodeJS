// npm install telegraf && covid19-api

const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api');

const bot = new Telegraf('5048320539:AAEDRf7nfbcBXtPoKlc36oUBjRwnDt1XHro')
bot.start( ctx => ctx.reply(`
   Hello ${ctx.from.first_name}!
   Статистика по короновирусу? /on
   Введи страну на английском языке и получи статистику.
   Получить весь список стран можно по команде /help."
`))
bot.on('text', async (ctx) => {
   try {
       const userText = ctx.message.text
       const covidData = await covidApi.getReportsByCountries(userText)
       const countryData = covidData[0][0]
       const formatData = `
           Страна -> ${countryData.country},
           Случаи -> ${countryData.cases},
           Смерти -> ${countryData.deaths},
           Выздоровело -> ${countryData.recovered}`
       ctx.reply(formatData)
   } catch(e) {
       ctx.reply('Такой страны нет, введите заново!')
   }
})
bot.launch()
