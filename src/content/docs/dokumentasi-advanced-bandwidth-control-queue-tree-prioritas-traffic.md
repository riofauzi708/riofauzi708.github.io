---
title: DOKUMENTASI ADVANCED BANDWIDTH CONTROL (QUEUE TREE + PRIORITAS TRAFFIC)
description: >-
  Sekarang kamu sudah masuk ke level yang biasanya dipakai di kantor yang
  benar-benar serius ngatur jaringan.

  Kalau kamu lanjut ke ini, aku sarankan: implement bertahap (jangan langsung full)
pubDate: 2026-04-17T14:41:00.000+07:00
updatedDate: 2026-04-17T14:41:00.000+07:00
heroImage: /images/uploads/pcq-tree.jpg
draft: false
---
## TUJUAN

* Mengontrol bandwidth lebih presisi dibanding Simple Queue
* Memisahkan jalur download dan upload secara jelas
* Memberikan prioritas ke aplikasi penting (meeting, kerja)
* Membatasi aplikasi berat tanpa memblokir total

## KONSEP

Sebelumnya:

* Menggunakan Simple Queue + PCQ (sudah stabil)

Sekarang:

* Menggunakan Queue Tree (lebih advanced)
* Kontrol berdasarkan:

  * arah traffic (download/upload)
  * jenis traffic (kerja vs hiburan)

## KAPAN PERLU LEVEL INI

Gunakan jika:

* Sudah pakai GLOBAL-PCQ dan stabil
* Tapi masih ada kasus:

  * YouTube / TikTok bikin lemot
  * Meeting kadang patah-patah
  * Upload ganggu download

## STEP 1 — PASTIKAN KONDISI AWAL

* GLOBAL-PCQ sudah berjalan stabil
* FastTrack sudah disable
* Tidak ada Simple Queue lain aktif (kecuali priority sebelumnya jika dipakai)

## STEP 2 — MARK CONNECTION (MANGLE)

Masuk:
IP → Firewall → Mangle

Tambahkan rule berikut:

### 1. Mark Download

* Chain: forward
* In Interface: WAN
* Action: mark-connection
* New Connection Mark: conn-download
* Passthrough: yes

### 2. Mark Upload

* Chain: forward
* Out Interface: WAN
* Action: mark-connection
* New Connection Mark: conn-upload
* Passthrough: yes

### 3. Mark Packet Download

* Chain: forward
* Connection Mark: conn-download
* Action: mark-packet
* New Packet Mark: pkt-download

### 4. Mark Packet Upload

* Chain: forward
* Connection Mark: conn-upload
* Action: mark-packet
* New Packet Mark: pkt-upload

## STEP 3 — BUAT QUEUE TREE

Masuk:
Queues → Queue Tree

### ROOT DOWNLOAD

* Name: DOWNLOAD
* Parent: global
* Max Limit: 100M

### ROOT UPLOAD

* Name: UPLOAD
* Parent: global
* Max Limit: 20M

## STEP 4 — CHILD QUEUE (PEMBAGIAN)

### DOWNLOAD GENERAL

* Name: DOWNLOAD-GENERAL
* Parent: DOWNLOAD
* Packet Mark: pkt-download
* Queue Type: pcq-download

### UPLOAD GENERAL

* Name: UPLOAD-GENERAL
* Parent: UPLOAD
* Packet Mark: pkt-upload
* Queue Type: pcq-upload

## STEP 5 — PRIORITAS TRAFFIC PENTING

Tambahkan rule mangle baru:

### Mark Meeting Traffic (Zoom / Meet)

* Chain: forward
* Protocol: tcp/udp
* Port: 443, 3478-3481
* Action: mark-packet
* New Packet Mark: pkt-priority

Lalu di Queue Tree:

### PRIORITY TRAFFIC

* Name: PRIORITY
* Parent: DOWNLOAD
* Packet Mark: pkt-priority
* Priority: 1 (paling tinggi)
* Max Limit: 30M

## HASIL YANG DIDAPAT

* Download dan upload terpisah jelas
* Meeting lebih stabil
* Traffic penting tidak terganggu
* Traffic berat tetap jalan tapi terkontrol

## PERBEDAAN DENGAN SEBELUMNYA

## CATATAN PENTING

* Jangan aktifkan Queue Tree bersamaan dengan Simple Queue tanpa perhitungan
* Semua marking harus benar, jika salah → traffic bisa tidak terbaca
* Pastikan router tidak overload (cek CPU)

## KESIMPULAN

Dengan Queue Tree:

* Kamu punya kontrol penuh atas bandwidth
* Bisa mengatur prioritas traffic secara detail
* Cocok untuk kantor dengan banyak user dan kebutuhan kompleks

## STATUS

SIAP IMPLEMENTASI LEVEL LANJUT

SistemKontrolStabilitasKompleksitasSimple QueueRendahCukupMudahPCQ GlobalSedangStabilMenengahQueue TreeTinggiSangat stabilLebih kompleks
