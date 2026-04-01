---
title: Panduan PCQ Step-by-Step (WinBox GUI)
description: Ini solusi PALING TEPAT untuk Network lebih stabil, Fair sharing
  otomatis, Tidak ada device serakah, Prioritas PC tetap terjaga. PCQ akan
  otomatis membagi bandwidth secara adil tanpa perlu queue per device.
pubDate: 2026-04-01T10:30:00.000+07:00
updatedDate: 2026-04-01T10:30:00.000+07:00
heroImage: /images/uploads/1775015164-optimized.webp
tags:
  - Network
  - Troubleshoot
  - Winbox
draft: false
---
# MIKROTIK PCQ SETUP - 90+ DEVICE KANTOR

## \
Prasyarat

* Safe Mode **AKTIF** (gembok hijau)
* Backup sudah dilakukan
* Sudah ada **Simple Queue Z-CATCHALL**
* Queue type PCQ akan dibuat (pcq-download & pcq-upload)

- - -

## \
STEP 1: BUAT QUEUE TYPE PCQ

### \
Buat Queue Type

1. Masuk ke: `Queues → Queue Types`
2. Klik `+`

**Download:**

* Name: `pcq-download`
* Kind: `pcq`
* PCQ Rate: `0` (unlimited)
* PCQ Classifier: `dst-address`

Klik **OK**

![image-pcq-download-setup](/images/uploads/pcq-download.png)



**Upload:**

* Klik `+` lagi
* Name: `pcq-upload`
* Kind: `pcq`
* PCQ Rate: `0`
* PCQ Classifier: `src-address`

Klik **OK**

![image-pcq-upload-setup](/images/uploads/pcq-upload.png)

- - -

## \
STEP 2: MANGLE RULES

### A. Tandai Download Traffic

1. Masuk ke: `IP → Firewall → Mangle`
2. Klik `+`

**General:**

* Chain: `forward`
* In. Interface: `ether1-wan`
* Dst. Address: `192.168.45.0/24`

**Action:**

* Action: `mark-packet`
* New Packet Mark: `download-pcq`

Klik **Apply → OK**



### B. Tandai Upload Traffic

1. Masih di menu Mangle
2. Klik `+`

**General:**

* Chain: `forward`
* Out. Interface: `ether1-wan`
* Src. Address: `192.168.45.0/24`

**Action:**

* Action: `mark-packet`
* New Packet Mark: `upload-pcq`

Klik **Apply → OK**

![](/images/uploads/mangel.png)

- - -

## \
STEP 3: QUEUE TREE PCQ

### \
Download Queue Tree

1. Masuk ke: `Queues → Queue Tree`
2. Klik `+`

**General:**

* Name: `PCQ-DOWNLOAD`
* Parent: `global-out` (atau `ether1-wan`)
* Packet Marks: `download-pcq`

**Limits:**

* Max Limit: `120M`
* Queue: `pcq-download`

Klik **Apply → OK**

![](/images/uploads/qtree-download.png)

### \
Upload Queue Tree

1. Klik `+` lagi

**General:**

* Name: `PCQ-UPLOAD`
* Parent: `global-in` (atau `ether1-wan`)
* Packet Marks: `upload-pcq`

**Limits:**

* Max Limit: `30M`
* Queue: `pcq-upload`

Klik **Apply → OK**

![](/images/uploads/qtree-upload.png)

- - -

## \
STEP 4: CATCH-ALL BACKUP (OPSIONAL)

1. Masuk ke: `Queues → Simple Queues`
2. Klik `+`

**General:**

* Name: `Z-CATCHALL-BACKUP`
* Target: `192.168.45.0/24`

**Max Limit:**

* Upload: `100M`
* Download: `100M`

**Advanced:**

* Priority: `8`

Klik **Apply → OK**

➡️ Pindahkan ke **PALING BAWAH**

![](/images/uploads/catchall.png)

![](/images/uploads/simple-q.png)

- - -

## \
VERIFIKASI

Pastikan:

* Mangle: 2 rules  

  * `download-pcq`
  * `upload-pcq`
* Queue Tree: 2 rules  

  * `PCQ-DOWNLOAD`
  * `PCQ-UPLOAD`
* Simple Queue:

  * Queue individu tetap ada
  * `Z-CATCHALL` di bawah
* System:

  * CPU < 70%
  * Memory > 30MB

- - -

## \
TESTING

1. PC tanpa queue → speedtest → **10–30 Mbps**
2. PC dengan queue → speedtest → **5–10 Mbps stabil**
3. Test 2–3 device bersamaan → bandwidth terbagi rata
4. Monitor Queue:

   * Klik kanan → Monitor
   * Bytes harus naik saat traffic

- - -

## \
MONITORING RUTIN

### Harian (±2 menit)

* `System → Resources` → cek CPU & RAM
* `Tools → Torch` → cek user paling berat

### Mingguan (±10 menit)

* Speed test 3 device acak
* Backup:

  * `System → Backup → Save`

- - -

## \
DOKUMENTASI CEPAT

* Router: RB2011UiAS-RM  
* ISP: IndiHome 150 Mbps  
* Total Device: 88  
* Individual Queue: 21 device @ 5–10 Mbps  
* PCQ Download: 120 Mbps  
* PCQ Upload: 30 Mbps  
* Catch-All: 100 Mbps (priority 8)

**Baseline:**

* Prioritas: 5–10 Mbps  
* Umum: 10–30 Mbps  
* Ping: < 50 ms  

- - -

## \
ROLLBACK DARURAT

### Disable PCQ

`Queues → Queue Tree`

* Disable:

  * `PCQ-DOWNLOAD`
  * `PCQ-UPLOAD`

### Restore Backup

`System → Backup → Load`

* Router akan reboot

- - -

## \
NOTES PENTING

* Safe Mode akan auto-rollback jika disconnect
* PCQ = fair sharing (semakin banyak user, bandwidth terbagi)
* Queue individu tetap prioritas
* Simpan backup di:

  * Laptop
  * Cloud
  * USB

- - -

## \
SELESAI

Jika semua test OK:

* Tunggu 1–2 menit (Safe Mode auto-save)
* Monitor 24 jam pertama
* Adjust limit jika diperlukan
