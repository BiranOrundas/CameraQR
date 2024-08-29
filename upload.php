<?php
include 'db.php'; // Veritabanı bağlantısını içe aktar

// Hataları günlüğe yaz, ekrana yazdırma
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log'); // Hatalar loglanacak dosya

// HTTP cevabı JSON olarak ayarlanır
header('Content-Type: application/json');

// Bellek tamponunu temizle
ob_clean();
ob_start(); // Çıkışı tamponla

// Gelen dosya olup olmadığını kontrol et
if (isset($_POST['photo'])) {
    $data = $_POST['photo'];

    // Fotoğrafı base64 formatından çöz
    list($type, $data) = explode(';', $data);
    list(, $data) = explode(',', $data);
    $data = base64_decode($data);

    // Yükleme klasörü
    $upload_directory = 'uploads/';

    // Klasör yoksa oluştur
    if (!file_exists($upload_directory)) {
        mkdir($upload_directory, 0777, true);
    }

    // Benzersiz bir dosya adı oluştur
    $file_name = uniqid() . '.png';
    $file_path = $upload_directory . $file_name;

    // Dosyayı kaydet
    if (file_put_contents($file_path, $data)) {
        try {
            // Veritabanına kaydet
            $stmt = $pdo->prepare("INSERT INTO fotograf_yuklemeleri (url) VALUES (:url)");
            $stmt->execute(['url' => $file_path]);

            echo json_encode(["url" => $file_path]); // Başarılı yanıt
        } catch (PDOException $e) {
            echo json_encode(["error" => "Veritabanı hatası: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Dosya kaydedilemedi."]);
    }
} else {
    echo json_encode(["error" => "Fotoğraf bulunamadı."]);
}

ob_end_flush(); // Tamponlanmış içeriği gönder ve tamponu kapat
?>
