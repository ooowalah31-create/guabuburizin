async function generateRaw() {
    const content = document.getElementById('rawContent').value;
    const btn = document.getElementById('genBtn');
    const resultArea = document.getElementById('resultArea');
    const rawUrl = document.getElementById('rawUrl');

    if (!content) return alert("ISI DULU COK, JANGAN KOSONG!");

    btn.innerText = "PROCESSING...";
    btn.disabled = true;

    try {
        // Kita kirim data sebagai file .txt
        const formData = new FormData();
        const blob = new Blob([content], { type: 'text/plain' });
        formData.append('file', blob, 'raw_script.txt');

        const response = await fetch('https://file.io', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Kita dapet link, tapi kita arahkan ke link download langsung
            rawUrl.value = data.link;
            resultArea.classList.remove('hidden');
            btn.innerText = "SUCCESS!";
        } else {
            alert("Gagal Generate!");
        }
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "🚀 GENERATE RAW LINK";
    }
}

function copyLink() {
    const copyText = document.getElementById("rawUrl");
    copyText.select();
    document.execCommand("copy");
    alert("Link copied: " + copyText.value);
}
