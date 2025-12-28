// emailjs 초기 설정, 즉시 실행 함수 형태
(function(){
    emailjs.init({
    publicKey: "PUBLICKEY",
    blockHeadless: true,
    limitRate: { 
        throttle: 5000 // 5초에 한 번만 메일 발송 허용, 이메일 전송을 너무 자주 못 하게 막는다.
    }
    });
})();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeText = document.getElementById('modeText');
    if (document.body.classList.contains('dark-mode')) {
        modeText.textContent = '☀️ 라이트모드';
    } else {
        modeText.textContent = '🌙 다크모드';
    }
}

function updateCount(sectionNum) {
    const element = document.getElementById(`section${sectionNum}`);
    const countElement = document.getElementById(`count${sectionNum}`);
    const count = element.value.length;
    countElement.textContent = `${count}자`;
    updateTotalCount();
}

function updateTotalCount() {
    let total = 0;
    for (let i = 0; i <= 4; i++) {
        total += document.getElementById(`section${i}`).value.length;
    }

    const totalElement = document.getElementById('totalCount');
    totalElement.textContent = total;

    const totalCountDiv = totalElement.parentElement;
    const isDark = document.body.classList.contains('dark-mode');

    if (total >= 500 && total <= 1000) {
        totalCountDiv.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
    } else if (total > 1000) {
        totalCountDiv.style.background = 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
    } else {
        if (isDark) {
            totalCountDiv.style.background = 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)';
        } else {
            totalCountDiv.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
}

// 전체 지우기 버튼
function clearAll() {
    if (confirm('정말로 모든 내용을 지우시겠습니까?')) {
        for (let i = 0; i <= 4; i++) {
            document.getElementById(`section${i}`).value = '';
            updateCount(i);
        }
    }
}

// 임시 저장 버튼
function saveTextTmp() {
    alert("임시 저장, 로컬 스토리지? 핸드폰일 때는?")
}

// 텍스트 저장 버튼
function saveText() {
    let content = '';
    const titles = ['제목', '기 (起) - 서론', '승 (承) - 전개', '전 (轉) - 위기', '결 (結) - 결말'];

    for (let i = 0; i <= 4; i++) {
        const element = document.getElementById(`section${i}`);
        const text = element.value;
        if (text.trim()) {
            content += `=== ${titles[i]} ===\n\n${text}\n\n\n`;
        }
    }

    if (!content.trim()) {
        alert('저장할 내용이 없습니다.');
        return;
    }

    const date = new Date();
    const filename = `소설_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.txt`;
    // PC, mobile 구분
    const userAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(userAgent) {
        saveTextInMobile(content, filename);
    } else {
        saveTextInPc(content, filename);
    }
}

// mobile 환경에서 저장
function saveTextInMobile(content, filename) {
    /**
     * [docs 기준]
     * - emailjs.send(serviceID, templateID, templateParams, options);
     * - options는 emailjs.init에서 설정한 option을 뒤집어 쓰고 싶을 때 사용
     */
    const templateParams = {
        title : filename,
        message : content
    }
    // emailjs.send 함수는 Promise를 반환한다.
    // 반환되는 response '객체'에는 status, text가 들어있다.
    // 아래 코드는 emailjs의 docs에 나와있는 내용을 그대로 가져온 것이다.
    emailjs.send("serviceID", "templateID", templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );
}

// PC 환경에서 저장
function saveTextInPc(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    alert('저장 완료');
}

// 각 섹션에 이벤트 리스너 추가
for (let i = 0; i <= 4; i++) {
    document.getElementById(`section${i}`).addEventListener('input', () => updateCount(i));
}

// 초기 카운트 업데이트
updateTotalCount();