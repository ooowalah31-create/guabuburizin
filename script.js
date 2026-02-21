// OBLIVION INSTANT GENERATOR ENGINE
async function generateRaw() {
    const textarea = document.getElementById('rawContent');
    const btn = document.getElementById('genBtn');
    const resultArea = document.getElementById('resultArea');
    const rawUrl = document.getElementById('rawUrl');

    const content = textarea.value.trim();

    if (!content) {
        alert("ISI DULU SCRIPTNYA, BABI! JANGAN KOSONG!");
        return;
    }

    // Efek loading biar lu tau ini jalan
    btn.innerText = "BYPASSING SYSTEM...";
    btn.style.background = "#555";
    btn.disabled = true;

    try {
        // Pake API Hastebin/Toptal Bypass
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://paste.ee/api/v1/pastes'), {
            method: 'GET'
        });
        
        // KARENA LU BURU-BURU, GUE PAKE ALTERNATIF PALING STABIL:
        // Menggunakan teknik POST ke sprunge.us (Server Raw paling simpel di dunia)
        const textData = new URLSearchParams();
        textData.append('sprunge', content);

        const upload = await fetch('https://corsproxy.io/?' + encodeURIComponent('http://sprunge.us'), {
            method: 'POST',
            body: textData
        });

        if (!upload.ok) throw new Error("Server Sibuk!");

        const finalUrl = await upload.text();
        
        if (finalUrl.includes('http')) {
            rawUrl.value = finalUrl.trim();
            resultArea.classList.remove('hidden');
            btn.innerText = "SUCCESS!";
            btn.style.background = "#00ff00";
        } else {
            throw new Error("Invalid Response");
        }

    } catch (err) {
        console.error(err);
        alert("ERROR: Koneksi lu ampas atau diblock browser! Coba Refresh!");
        btn.innerText = "🚀 RETRY GENERATE";
        btn.style.background = "#ff0000";
    } finally {
        btn.disabled = false;
    }
}

function copyLink() {
    const copyText = document.getElementById("rawUrl");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("LINK COPIED, BABI! BURUAN PAKE: " + copyText.value);
}
