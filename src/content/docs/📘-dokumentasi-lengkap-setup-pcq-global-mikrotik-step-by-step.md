---
title: 📘 DOKUMENTASI LENGKAP SETUP PCQ GLOBAL MIKROTIK (STEP BY STEP)
description: Berikut dokumentasi yang operasional dan step-by-step dari nol jadi
  nanti kalau kamu buka lagi, kamu langsung tahu mulai dari mana tanpa mikir
  ulang.
pubDate: 2026-04-17T13:52:00.000+07:00
updatedDate: 2026-04-17T13:52:00.000+07:00
heroImage: /images/uploads/pcq-global.jpg
tags:
  - Network
  - Mikrotik
draft: false
---
## 🧩 1. KONDISI AWAL (MASALAH YANG TERJADI)

Jaringan digunakan oleh:

* ±100 device (PC + HP + laptop + magang)
* Internet: Indihome 150 Mbps (tidak stabil)

### ❗ Gejala yang muncul:

* Awalnya normal saat ±80 device
* Setelah tambah ±20 device → langsung terasa lemot
* Speed tidak konsisten
* Kadang:

  * buka web lambat
  * YouTube buffering
  * speedtest bahkan tidak jalan

## 🔍 ANALISIS MASALAH

### ❗ 1. Bandwidth tidak benar-benar 150 Mbps stabil

Hasil test:

* HP hanya dapat ±42 Mbps

Artinya:

* ISP fluktuatif (jam sibuk turun)
* kemungkinan bottleneck di WiFi / sharing

👉 Jadi **150 Mbps ≠ selalu tersedia**

### ❗ 2. Terlalu banyak Simple Queue per device

Sebelumnya:

* Setiap device dibatasi 5M – 8M

Masalahnya:

* Tidak fleksibel
* Router kerja berat
* Saat banyak user aktif → rebutan

👉 Sistem ini **tidak cocok untuk 100 device**

### ❗ 3. Tidak ada pembagian bandwidth yang adil

Yang terjadi:

* Beberapa user bisa makan bandwidth besar
* Yang lain jadi lemot

## 🎯 TUJUAN SOLUSI

* Semua device tetap bisa internet
* Tidak ada yang “nyedot sendiri”
* Jaringan stabil walaupun banyak user
* Tidak chaos saat jam sibuk

## 🚀 SOLUSI: MENGGUNAKAN PCQ (GLOBAL)

Pendekatan:

* 1 queue untuk semua device
* bandwidth dibagi otomatis
* setiap device ada batas maksimal

## 🧩 2. STEP BY STEP SETUP

### 🔹 STEP 1 — Tentukan Bandwidth Realistis

Berdasarkan test:

* Download aman: `100 Mbps`
* Upload estimasi: `20 Mbps`

👉 Ini sengaja diturunkan dari 150 Mbps
👉 agar tidak over-limit saat ISP drop

### 🔹 STEP 2 — Buat Queue Type (PCQ)

Masuk:
**Queues → Queue Types**

#### 📥 pcq-download

* Kind: `pcq`
* Rate: `3M`
* Classifier: `dst-address`

#### 📤 pcq-upload

* Kind: `pcq`
* Rate: `2M`
* Classifier: `src-address`

### 🔹 STEP 3 — Buat GLOBAL-PCQ

Masuk:
**Queues → Simple Queue → Add**

#### Tab General:

* Name: `GLOBAL-PCQ`
* Target: `192.168.45.0/24`
* Max Limit:

  * Download: `100M`
  * Upload: `20M`

#### Tab Advanced:

* Queue Type:

  * Upload: `pcq-upload`
  * Download: `pcq-download`
* Priority: `8`
* Parent: `none`

### 🔹 STEP 4 — Disable FastTrack (WAJIB)

Masuk:
**IP → Firewall → Filter Rules**

* Cari rule: `fasttrack connection`
* Disable

#### Kenapa?

FastTrack akan:

* melewati queue
* membuat PCQ tidak bekerja

### 🔹 STEP 5 — Aktifkan GLOBAL-PCQ

* Enable queue
* Pastikan tidak ada queue lama aktif

## 🎯 HASIL SETELAH IMPLEMENTASI

* Setiap device mendapat:

  * ±3 Mbps download
  * ±2 Mbps upload

### Perubahan yang terasa:

* Jaringan lebih stabil
* Tidak ada lemot parah
* Semua device tetap bisa akses internet



## 🧩 1. KONDISI AWAL (MASALAH YANG TERJADI)

Jaringan digunakan oleh:

* ±100 device (PC + HP + laptop + magang)
* Internet: Indihome 150 Mbps (tidak stabil)

### ❗ Gejala yang muncul:

* Awalnya normal saat ±80 device
* Setelah tambah ±20 device → langsung terasa lemot
* Speed tidak konsisten
* Kadang:

  * buka web lambat
  * YouTube buffering
  * speedtest bahkan tidak jalan

## 🔍 ANALISIS MASALAH

### ❗ 1. Bandwidth tidak benar-benar 150 Mbps stabil

Hasil test:

* HP hanya dapat ±42 Mbps

Artinya:

* ISP fluktuatif (jam sibuk turun)
* kemungkinan bottleneck di WiFi / sharing

👉 Jadi **150 Mbps ≠ selalu tersedia**

### ❗ 2. Terlalu banyak Simple Queue per device

Sebelumnya:

* Setiap device dibatasi 5M – 8M

Masalahnya:

* Tidak fleksibel
* Router kerja berat
* Saat banyak user aktif → rebutan

👉 Sistem ini **tidak cocok untuk 100 device**

### ❗ 3. Tidak ada pembagian bandwidth yang adil

Yang terjadi:

* Beberapa user bisa makan bandwidth besar
* Yang lain jadi lemot

## 🎯 TUJUAN SOLUSI

* Semua device tetap bisa internet
* Tidak ada yang “nyedot sendiri”
* Jaringan stabil walaupun banyak user
* Tidak chaos saat jam sibuk

## 🚀 SOLUSI: MENGGUNAKAN PCQ (GLOBAL)

Pendekatan:

* 1 queue untuk semua device
* bandwidth dibagi otomatis
* setiap device ada batas maksimal

## 🧩 2. STEP BY STEP SETUP

### 🔹 STEP 1 — Tentukan Bandwidth Realistis

Berdasarkan test:

* Download aman: `100 Mbps`
* Upload estimasi: `20 Mbps`

👉 Ini sengaja diturunkan dari 150 Mbps👉 agar tidak over-limit saat ISP drop

### 🔹 STEP 2 — Buat Queue Type (PCQ)

Masuk:**Queues → Queue Types**

#### 📥 pcq-download

* Kind: `pcq`
* Rate: `3M`
* Classifier: `dst-address`

#### 📤 pcq-upload

* Kind: `pcq`
* Rate: `2M`
* Classifier: `src-address`

### 🔹 STEP 3 — Buat GLOBAL-PCQ

Masuk:**Queues → Simple Queue → Add**

#### Tab General:

* Name: `GLOBAL-PCQ`
* Target: `192.168.45.0/24`
* Max Limit:

  * Download: `100M`
  * Upload: `20M`

#### Tab Advanced:

* Queue Type:

  * Upload: `pcq-upload`
  * Download: `pcq-download`
* Priority: `8`
* Parent: `none`

### 🔹 STEP 4 — Disable FastTrack (WAJIB)

Masuk:**IP → Firewall → Filter Rules**

* Cari rule: `fasttrack connection`
* Disable

#### Kenapa?

FastTrack akan:

* melewati queue
* membuat PCQ tidak bekerja

### 🔹 STEP 5 — Aktifkan GLOBAL-PCQ

* Enable queue
* Pastikan tidak ada queue lama aktif

## 🎯 HASIL SETELAH IMPLEMENTASI

* Setiap device mendapat:

  * ±3 Mbps download
  * ±2 Mbps upload

### Perubahan yang terasa:

* Jaringan lebih stabil
* Tidak ada lemot parah
* Semua device tetap bisa akses internet

## ⚠️ HAL YANG PERLU DIPAHAMI

### ❗ Kenapa tidak kencang?

Karena:

* 100 device berbagi bandwidth yang sama
* bandwidth real terbatas

👉 Ini bukan untuk “cepat”, tapi untuk “stabil”

### ❗ Kenapa dibatasi per device?

Agar:

* tidak ada 1 user menghabiskan bandwidth
* semua tetap kebagian

## 🧠 ANALOGI SEDERHANA

* Internet = jalan
* Device = mobil

Kalau:

* mobil banyak
* jalan sempit
* tidak diatur

👉 macet total

PCQ:👉 membagi jalur agar semua tetap jalan

## 🚀 PENGEMBANGAN SELANJUTNYA

Setelah ini stabil, bisa upgrade:

### 🔹 1. Prioritas User

* PC kantor → lebih cepat
* HP / magang → dibatasi

### 🔹 2. Pembatasan Aplikasi

* Limit YouTube / TikTok
* Prioritaskan Zoom / kerja

### 🔹 3. Segmentasi Jaringan

* VLAN
* Subnet terpisah

## 🎯 KESIMPULAN

Masalah utama:

* Banyak device
* Bandwidth terbatas & tidak stabil
* Manajemen sebelumnya tidak cocok

Solusi:

* Gunakan PCQ global
* Batasi per user
* Fokus ke stabilitas

## 🧠 PRINSIP UTAMA

> Lebih baik semua bisa internet (stabil)daripada beberapa cepat tapi yang lain mati

## ✅ STATUS

IMPLEMENTASI BERHASILJaringan sudah:

* Stabil
* Terdistribusi dengan baik
* Siap untuk 100+ device

![proses pcq global](/images/uploads/pcq-global-2-optimized.webp)

## ⚠️ HAL YANG PERLU DIPAHAMI

### ❗ Kenapa tidak kencang?

Karena:

* 100 device berbagi bandwidth yang sama
* bandwidth real terbatas

👉 Ini bukan untuk “cepat”, tapi untuk “stabil”

### ❗ Kenapa dibatasi per device?

Agar:

* tidak ada 1 user menghabiskan bandwidth
* semua tetap kebagian

## 🧠 ANALOGI SEDERHANA

* Internet = jalan
* Device = mobil

Kalau:

* mobil banyak
* jalan sempit
* tidak diatur

👉 macet total

PCQ:
👉 membagi jalur agar semua tetap jalan

## 🚀 PENGEMBANGAN SELANJUTNYA

Setelah ini stabil, bisa upgrade:

### 🔹 1. Prioritas User

* PC kantor → lebih cepat
* HP / magang → dibatasi

### 🔹 2. Pembatasan Aplikasi

* Limit YouTube / TikTok
* Prioritaskan Zoom / kerja

### 🔹 3. Segmentasi Jaringan

* VLAN
* Subnet terpisah

## 🎯 KESIMPULAN

Masalah utama:

* Banyak device
* Bandwidth terbatas & tidak stabil
* Manajemen sebelumnya tidak cocok

Solusi:

* Gunakan PCQ global
* Batasi per user
* Fokus ke stabilitas

## 🧠 PRINSIP UTAMA

> Lebih baik semua bisa internet (stabil)
> daripada beberapa cepat tapi yang lain mati

## ✅ STATUS

IMPLEMENTASI BERHASIL
Jaringan sudah:

* Stabil
* Terdistribusi dengan baik
* Siap untuk 100+ device
