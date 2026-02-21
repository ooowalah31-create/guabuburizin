async function generateRaw() {
    const content = document.getElementById('rawContent').value;
    const btn = document.getElementById('genBtn');
    const resultArea = document.getElementById('resultArea');
    const rawUrl = document.getElementById('rawUrl');

    if (!content) return alert("ISI DULU COK, JANGAN KOSONG!");

    btn.innerText = "BYPASSING...";
    btn.disabled = true;

    try {
        // Pake API AnonymPaste (Lebih stabil buat Client-side fetch)
        const response = await fetch('https://api.anonympaste.com/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: content,
                title: "Oblivion Raw",
                expire: "1" // Berlalu dalam 1 hari
            })
        });

        if (!response.ok) throw new Error("Server ampas atau diblock!");

        const data = await response.json();

        if (data.status === "success") {
            // Langsung dapet link RAW
            rawUrl.value = data.raw_url;
            resultArea.classList.remove('hidden');
            btn.innerText = "SUCCESS!";
        } else {
            throw new Error("API Failure");
        }
    } catch (err) {
        console.error(err);
        // EMERGENCY FALLBACK: Pake Paste.ee kalau Anonym gagal
        alert("Fetch Error! Coba matikan VPN atau ganti koneksi, babi!");
    } finally {
        btn.disabled = false;
        btn.innerText = "🚀 GENERATE RAW LINK";
    }
}

function copyLink() {
    const copyText = document.getElementById("rawUrl");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    alert("Copied: " + copyText.value);
}
