const Downloader = require('../../utils/downloader');
const { yts } = new Downloader();

module.exports = {
    name: 'yts',
    alias: ['ytsearch'],
    category: 'downloader',
    desc: 'Search on YouTube.',
    async exec(msg, sock, args) {
        if (args.length < 1) return await msg.reply('No query given to search.');
        const r = await yts(args.join(' '), 'long')
        let txt = `YouTube Search\n   ~> Query: ${args.join(' ')}\n`
        for (let i = 0; i < r.length; i++) {
            txt += `\n📙 Title: ${r[i].title}\n📎 Url: ${r[i].url}\n🚀 Upload: ${r[i].uploadedAt}\n`
        }
        await sock.sendMessage(msg.from, { image: { url: `https://i.ytimg.com/vi/${r[0].id}/0.jpg` }, caption: txt }, { quoted: msg })
    }
}