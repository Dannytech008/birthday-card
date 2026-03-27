const book = document.querySelector('#cardBook');
const sheets = Array.from(document.querySelectorAll('.sheet'));

function applyStacking() {
    sheets.forEach((sheet, index) => {
        const isFlipped = sheet.classList.contains('flipped');
        sheet.style.zIndex = isFlipped ? String(index + 1) : String(100 - index);
    });
}

sheets.forEach((sheet, index) => {
    sheet.addEventListener('click', (event) => {
        event.stopPropagation();
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
    });
});

document.addEventListener('click', () => {
    sheets.forEach((sheet) => sheet.classList.remove('flipped'));
    applyStacking();
});

book.addEventListener('click', (event) => {
    event.stopPropagation();
});

applyStacking();
