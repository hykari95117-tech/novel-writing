type HTMLElementType = HTMLElement | null | undefined;
type HTMLInputElementType = HTMLInputElement | null | undefined;

function toggleDarkMode() :void {
    document.body.classList.toggle('dark-mode');
    const modeText: HTMLElementType = document.getElementById('modeText');
    if(!modeText) {
        return;
    }
    if (document.body.classList.contains('dark-mode')) {
        modeText.textContent = '☀️ 라이트모드';
    } else {
        modeText.textContent = '🌙 다크모드';
    }
}

function updateCount(sectionNum: Number) :void {
    const element: HTMLInputElementType = document.getElementById(`section${sectionNum}`);
    const countElement: HTMLElementType = document.getElementById(`count${sectionNum}`);
    if (element && countElement) {
        const count = element.value.length;
        countElement.textContent = `${count}자`;
    }
}