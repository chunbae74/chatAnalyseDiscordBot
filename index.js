// 1. 주요 클래스 가져오기
const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

const { getResponse } = require('./gemini.js');

// 2. 클라이언트 객체 생성 (Guilds관련, 메시지관련 인텐트 추가)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel]
});

// 3. 봇이 준비됐을때 한번만(once) 표시할 메시지
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// 4. 누군가 ping을 작성하면 pong으로 답장한다.
client.on('messageCreate', async (message) => {
    // 봇이 보낸 메시지는 무시
    if (message.author.bot) return;

    if(message.content == '/ping'){
        message.reply('pong');
    }

    if(message.content == '/log') {
        try {
            let allMessages = {};
            let lastMessageId = null;
            
            while (true) {
                const options = { limit: 100 };
                if (lastMessageId) {
                    options.before = lastMessageId;
                }
                const messages = await message.channel.messages.fetch(options);
                
                if (messages.size == 0) break; // 더 이상 불러올 메시지 없음.
                
                messages.forEach(msg => {
                    if (!msg.content.startsWith("/") && !msg.author.bot && msg.type === 0 && msg.content.length  > 0) {
                        let userName = msg.author.username;
                        let content = msg.content;

                        if (allMessages[userName] == undefined) 
                            allMessages[userName] = [];
                        
                        allMessages[userName].push(content);
                    }
                })

                lastMessageId = messages.last().id;

                // 너무 빨리 요청하면 서버에서 벤 먹을수도 있음..
                await new Promise(res => setTimeout(res, 500));
            }

            console.log("대화내역 불러오기 성공");

            // 채팅 합치기
            let resultString = "";
            for (let user in allMessages) {
                // console.log(`\n\n=====${user}님의 채팅=====\n\n`);
                // console.log(allMessages[user].join("\n"));
                resultString += "[[" + user + ": ";
                resultString += allMessages[user].join('//');
                resultString += "]]\n\n";
            }

            console.log("Gemini API 호출");
            const resultOfGemini = await getResponse(resultString);

            await message.channel.send(resultOfGemini);

        } catch (err) {
            console.log("에러 발생: ", err);
            await message.reply("에러 발생: " + err);
        }
    }
});

// 5. 시크릿키(토큰)을 통해 봇 로그인 실행
client.login(token);