document.getElementById('start-camera').addEventListener('click', async function () {
   
    const cam = document.getElementById('start-camera');
    const video = document.getElementById('camera');
    const takePhotoButton = document.getElementById('take-photo');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    video.style.visibility = 'visible';
    cam.style.display = 'none';
    takePhotoButton.style.display = 'inline';
});
document.getElementById('start-camera').addEventListener('touchstart', async function () {
    const video = document.getElementById('camera');
    const takePhotoButton = document.getElementById('take-photo');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    video.style.visibility = 'visible';
    takePhotoButton.style.display = 'inline';
});



document.getElementById('take-photo').addEventListener('click', function () {
    const takePhoto = document.getElementById('take-photo');
    const again = document.getElementById('try-again');
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('camera');
    const photo = document.getElementById('photo');
    const qrCodeDiv = document.getElementById('qrcode');
    const downloadButton = document.getElementById('download-qr');
    const qrinfo = document.getElementById('qrinfo');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Fotoğrafı göster
    const photoData = canvas.toDataURL('image/png');
    photo.src = photoData;

    // Fotoğrafı sunucuya yükle
    fetch('upload.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'photo=' + encodeURIComponent(photoData)
    })
    .then(response => response.text()) // JSON yerine text olarak yanıtı alın
    .then(text => {
        console.log("Gelen yanıt:", text); // Konsola dönen yanıtı yazdır
        try {
            const data = JSON.parse(text); // Yanıtı JSON'a çevir
            if (data.url) {
                // Fotoğrafın URL'sini kullanarak QR kodu oluştur
                const qr = new QRious({
                    value: window.location.origin + '/' + data.url,
                    size: 250
                });
                qrCodeDiv.innerHTML = ''; // QR kod div'ini temizle
                qrCodeDiv.appendChild(qr.canvas); // QR kodunu ekle
                downloadButton.style.display = 'inline'; // İndir butonunu göster
                again.style.display = 'inline'; // İndir butonunu göster

                // QR kodunu indir
                downloadButton.onclick = function () {
                    const link = document.createElement('a');
                    link.href = qr.toDataURL('image/png');
                    link.download = 'qr-code.png';
                    link.click();
                };
            } else {
                alert("Fotoğraf yüklenemedi. Hata: " + data.error);
            }
        } catch (error) {
            console.error("JSON çözümleme hatası:", error); // JSON hatasını göster
        }
    })
    .catch(error => {
        console.error("Fetch hatası:", error);
    });
    takePhoto.style.display = "none"
    photo.style.display = "block";
    video.style.display = "none";
    qrinfo.style.display = "block"

    document.getElementById('try-again').addEventListener('click', async function () {
        const video = document.getElementById('camera');
        const takePhotoButton = document.getElementById('take-photo');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.style.display = 'block';
        video.style.visibility = 'visible';
        takePhotoButton.style.display = 'inline';
    
        if(photo.style.display == "block"){
            photo.style.display = "none"     
            downloadButton.style.display = 'none'; // İndir butonunu göster
            again.style.display = 'none'; // İndir butonunu göster
            qrinfo.style.display = "none"
            qrCodeDiv.innerHTML = '';
   
        } else{
            console.log("fotograf belleği temizlendi.")
        }

    });
});

