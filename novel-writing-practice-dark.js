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

function clearAll() {
    if (confirm('정말로 모든 내용을 지우시겠습니까?')) {
        for (let i = 0; i <= 4; i++) {
            document.getElementById(`section${i}`).value = '';
            updateCount(i);
        }
    }
}

function saveText() {
    // PC, mobile 구분
    const userAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(userAgent) {
        alert("핸드폰");
        return;
    } else {
        alert("PC");
        return;
    }

    let content = '';
    const titles = ['제목', '기 (起) - 서론', '승 (承) - 전개', '전 (轉) - 위기', '결 (結) - 결말'];

    for (let i = 0; i <= 4; i++) {
        const text = document.getElementById(`section${i}`).value;
        if (text.trim()) {
            content += `=== ${titles[i]} ===\n\n${text}\n\n\n`;
        }
    }

    if (!content.trim()) {
        alert('저장할 내용이 없습니다.');
        return;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const date = new Date();
    const filename = `소설_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.txt`;

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    alert('텍스트 파일이 저장되었습니다!');
}

// 각 섹션에 이벤트 리스너 추가
for (let i = 0; i <= 4; i++) {
    document.getElementById(`section${i}`).addEventListener('input', () => updateCount(i));
}

// 초기 카운트 업데이트
updateTotalCount();