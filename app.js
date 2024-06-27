// Function to create gradient background
function createGradientBackground() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f0f8ff');
    gradient.addColorStop(1, '#add8e6');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', createGradientBackground);
window.addEventListener('load', createGradientBackground);

function recordTime() {
    let department = document.getElementById('department').value;
    const other_department = document.getElementById('other_department').value;
    if (other_department) {
        department = other_department;
    }

    let records = JSON.parse(localStorage.getItem('records')) || [];
    const dateTime = new Date().toLocaleString();
    records.push({ dateTime, department });
    localStorage.setItem('records', JSON.stringify(records));
    updateDisplays(records);
}

function clearRecords() {
    localStorage.setItem('records', JSON.stringify([]));
    updateDisplays([]);
}

function updateDisplays(records) {
    const records_display = document.getElementById('records_display');
    const count_display = document.getElementById('count_display');

    records_display.value = '';
    count_display.value = '';

    const counts = {};
    records.forEach(record => {
        records_display.value += `DateTime: ${record.dateTime}, Department: ${record.department}\n`;
        counts[record.department] = (counts[record.department] || 0) + 1;
    });

    for (const [department, count] of Object.entries(counts)) {
        count_display.value += `${department}: ${count} sessions\n`;
    }
}

window.onload = function() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    updateDisplays(records);
};