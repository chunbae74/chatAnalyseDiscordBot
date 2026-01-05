# chatAnalyseDiscordBot

간단한 소개
- chatAnalyseDiscordBot는 Discord 서버의 채팅 로그를 수집·분석하고, Gemini를 통해 통계/인사이트를 제공하는 봇 템플릿입니다.


주요 기능
- Discord 채팅 로그 수집 (서버, 채널별)
- Gemin API 호출, 채팅 내역 분석


요구사항
- Node.js 16 이상 (권장 최신 LTS)
- npm 또는 yarn
- Discord Bot 계정 (Bot Token)


설치 및 초기 설정
1. 리포지토리 클론
```bash
git clone https://github.com/chunbae74/chatAnalyseDiscordBot.git
cd chatAnalyseDiscordBot
```

2. 의존성 설치
```bash
npm install
# 또는
yarn
```

3. 환경 변수 설정  
프로젝트 루트에 `.env` 파일을 만들고 아래 예시를 참고하여 값을 채워 넣으세요.
```env
# .env 예시
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_bot_client_id_here
```

4. 봇 권한 및 인텐트 설정
- Discord 개발자 포털에서 Bot을 생성 후 Token을 발급받으세요.
- Privileged Gateway Intents (MESSAGE CONTENT Intent)는 메시지 내용을 수집하려면 활성화해야 합니다.
- 권한 범위: 메시지 읽기/쓰기, 메시지 기록 조회가 가능하도록 적절한 권한(예: Read Messages/View Channels, Send Messages, Read Message History 등)을 부여하세요.
- 봇 초대 URL 예시:
  https://discord.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot%20applications.commands&permissions=<PERMISSIONS_INTEGER>


실행
- 개발 모드 (핫 리로딩 설정되어 있으면)
```bash
npm run dev
```
- 빌드 후 프로덕션 실행
```bash
npm run build
npm start
```
