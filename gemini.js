async function getResponse(messages) {
    try {
        let prompt = "너는 채팅 내용을 받아서 그 내용을 분석해주고 간단하게 정리해주는 역할을 하는 사람이야. 아래의 input데이터는 디스코드에서의 대화 내용이야. 해당 데이터는 [[userName: 대화1//대화2//대화3]] 구조로 되어있어. 메시지 하나 하나는 '//'로 구분되어 있어. 맨 처음에는 전체 대화 내용을 분석해주고,핵심 내용을 요약해줘. 그 다음에는 각 userName별로 대화한 내용들을 핵심 내용만 추려서 간략하게 요약해 줘. 모든 결과에 대한 설명을 간략하게 적어주고, 사용자가 보기 쉽도록 이모지나 bold체, 들여쓰기 등을 적극 활용해줘. 대화 분석은 무조건 아래에 주어진 input으로만 진행하고, 만약 input값이 없으면 대화 내용이 적어 분석이 어렵다고 답변해. 절대 내용을 지어내지마.\noutput의 경우, 대화 내용 분석한 값만 출력해줘. 너의 자기소개나, 사용자의 다음 채팅을 유도하는 말을 붙이지 마. \noutput은 다음 예시의 구조에 맞춰 작성해줘. 답변을 생성할 때, 절대 output의 내용을 참고하지 마. 구조만 참고하라는거야. 내용은 input만 참고해. n\noutput 예시: 다음은 채팅을 분석한 결과입니다. 전반적인 내용은 AI 활용 공모전에 관한 내용이며, 아래와 같은 내용들이 오고갔습니다. -주제는 노션과 디스코드에서의 AI활용법을 소개하는 것입니다. -11.13일에 도서관에서 미팅이 예정되어 있습니다 - 자료조사 시에 논문을 참고해 각 LLM모델의 성능을 비교하기로 했습니다.\n\n이어서 각 유저별 대화 내용을 분석한 결과입니다.\nuser1: user1님의 대화 내용으로는 프로젝트 주제 선정 및 AI연구 조사에 관한 내용입니다.\nuser2: user2님의 대화 내용은 ppt제작이 있습니다. 또한 11월 13일에 도서관에서 만날 것을 계획하고 있습니다.";
        prompt += "\n\ninput: " + messages;

        const input = {
            "data" : prompt
        };

        const res = await fetch("http://kaan.dothome.co.kr/AI/chatAnalyse.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })

        if (!res.ok) {
            throw new Error('[gemini.js] Gemini API 호출 실패: ' + response.status);
        }

        const data = await res.json();

        if (!data.success) {
            throw new Error('[gemini.js] Gemini.php 코드 내 오류 발생: ' + JSON.stringify(data, null, 2));
        }

        console.log('[gemini.js] Gemini API 호출 성공.');
        return data['response_text'];

    } catch(error) {
        console.log("[gemini.js] Gemini 호출 오류:", error);
        return null;
    }
}

module.exports = {
    getResponse
};