const book = document.querySelector('#cardBook');
const sheets = Array.from(document.querySelectorAll('.sheet'));
let lastTurnTime = 0;
const TURN_GUARD_MS = 280;

function applyStacking() {
    sheets.forEach((sheet, index) => {
        const isFlipped = sheet.classList.contains('flipped');
        sheet.style.zIndex = isFlipped ? String(index + 1) : String(100 - index);
    });
}

function turnSheet(sheet) {
    const index = sheets.indexOf(sheet);
    if (index < 0) return;

    const isFlipped = sheet.classList.contains('flipped');

    // First sheet opens first, then second sheet. Closing works in reverse.
    if (!isFlipped) {
        const previousSheet = sheets[index - 1];
        if (!previousSheet || previousSheet.classList.contains('flipped')) {
            sheet.classList.add('flipped');
        }
    } else {
        const nextSheet = sheets[index + 1];
        if (!nextSheet || !nextSheet.classList.contains('flipped')) {
            sheet.classList.remove('flipped');
        }
    }

    applyStacking();
}

book.addEventListener('pointerup', (event) => {
    event.stopPropagation();

    // Ignore right/middle click for mouse pointers.
    if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
    }

    const now = Date.now();
    if (now - lastTurnTime < TURN_GUARD_MS) {
        return;
    }
    lastTurnTime = now;

    const sheet = event.target.closest('.sheet');
    if (!sheet) {
        return;
    }

    turnSheet(sheet);
});

document.addEventListener('pointerup', () => {
    sheets.forEach((sheet) => sheet.classList.remove('flipped'));
    applyStacking();
});

applyStacking();
