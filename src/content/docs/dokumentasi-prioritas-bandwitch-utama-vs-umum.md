---
title: Dokumentasi Prioritas Bandwitch (Utama vs Umum)
description: Berikut ini adalah dokumentasi mengatur pcq global secara
  terstruktur dengan konsep prioritas dan pembagian secara umum
pubDate: 2026-04-17T14:22:00.000+07:00
updatedDate: 2026-04-17T14:22:00.000+07:00
heroImage: /images/uploads/prioritis-pcq-2-optimized.webp
draft: false
---
## TUJUAN

* Komputer kerja (desktop/laptop kantor) mendapatkan prioritas bandwidth
* Device lain (HP, magang) tetap bisa digunakan tanpa mengganggu
* Sistem tetap stabil untuk 100+ device

## KONSEP

Tetap menggunakan [GLOBAL PCQ](https://rio-fauzi.netlify.app/docs/-dokumentasi-lengkap-setup-pcq-global-mikrotik-step-by-step/) sebagai dasar, lalu ditambahkan pembagian:

1. PRIORITAS (PC kantor)
2. GENERAL (semua device lain)

Bukan kembali ke simple queue per device.

## STEP 1 — IDENTIFIKASI DEVICE PRIORITAS

Masuk:
IP → DHCP Server → Leases

* Cari device dengan nama seperti:

  * DESKTOP-xxxx
  * atau PC kantor lainnya
* Pastikan IP tidak berubah (disarankan set static lease)

Opsional:

* Tambahkan comment: PRIORITY

## STEP 2 — BUAT ADDRESS LIST

Masuk:
IP → Firewall → Address Lists

Tambahkan satu per satu:

* Name: priority-users
* Address: IP dari PC kantor
* Comment: bebas

Contoh:

* 192.168.45.10
* 192.168.45.11
* 192.168.45.12

## STEP 3 — BUAT QUEUE PRIORITAS

Masuk:
Queues → Simple Queue → Add

General:

* Name: PRIORITY-PCQ
* Target: priority-users
* Max Limit:

  * Download: 60M
  * Upload: 10M

Advanced:

* Queue Type:

  * Upload: pcq-upload
  * Download: pcq-download
* Priority: 8
* Parent: none

## STEP 4 — EDIT GLOBAL-PCQ

Ubah konfigurasi GLOBAL-PCQ menjadi:

* Target: 192.168.45.0/24
* Max Limit:

  * Download: 40M
  * Upload: 10M

Queue Type tetap:

* pcq-upload
* pcq-download

## STEP 5 — ATUR URUTAN QUEUE

Di menu Queues:

Pastikan urutan:

1. PRIORITY-PCQ (di atas)
2. GLOBAL-PCQ (di bawah)

Alasan:
MikroTik membaca dari atas ke bawah. Rule di atas akan diproses lebih dulu.



![proses pcq prioritas](/images/uploads/prioritis-pcq-optimized.webp)

## HASIL YANG DIDAPAT

### PC Karyawan

* Mendapat bandwidth lebih besar
* Lebih stabil untuk kerja
* Tidak terganggu oleh device lain

### Device Umum (HP / Magang)

* Tetap bisa internet
* Bandwidth lebih terbatas
* Tidak mengganggu karyawan

## ILUSTRASI PEMBAGIAN

Total bandwidth (contoh):

* 100 Mbps download

Pembagian:

* 60 Mbps untuk PRIORITAS
* 40 Mbps untuk GENERAL

## CATATAN PENTING

* Jangan kembali ke simple queue per device
* Tetap gunakan PCQ
* Pastikan FastTrack tetap dalam kondisi disable
* Gunakan static DHCP untuk device penting agar IP tidak berubah

## PENGEMBANGAN LANJUTAN

Setelah ini, sistem bisa ditingkatkan dengan:

1. Prioritas aplikasi kerja (Zoom, Google Meet)
2. Pembatasan aplikasi berat (YouTube, TikTok)
3. Segmentasi jaringan (VLAN atau subnet terpisah)

## KESIMPULAN

Dengan konfigurasi ini:

* Jaringan tetap stabil
* Bandwidth terbagi dengan strategi, bukan sekadar adil
* Device penting mendapatkan performa lebih baik

Sistem siap digunakan untuk skala 100+ device dengan kontrol yang lebih terarah
