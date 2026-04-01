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
\# MIKROTIK PCQ SETUP - 90+ DEVICE KANTOR

## PRASYARAT

1. \[ ] Backup: System → Backup → Save
2. \[ ] Safe Mode: Aktifkan (ikon gembok hijau)
3. \[ ] PCQ Types: Queues → Queue Types → Pastikan ada pcq-download & pcq-upload
4. \[ ] Info Network: WAN=ether1-wan, LAN subnet=192.168.45.0/24 (sesuaikan)

## STEP 1: HAPUS QUEUE LAMA

Queues → Simple Queues → Pilih "Z-CATCHALL*" → Remove → Yes

## STEP 2: MANGLE RULES

### Download Mark

IP → Firewall → Mangle → +
  General: Chain=forward | In.Interface=ether1-wan | Dst.Address=192.168.45.0/24
  Action: Action=mark-packet | New Packet Mark=download-pcq
  Apply → OK

### Upload Mark

IP → Firewall → Mangle → +
  General: Chain=forward | Out.Interface=ether1-wan | Src.Address=192.168.45.0/24
  Action: Action=mark-packet | New Packet Mark=upload-pcq
  Apply → OK

## STEP 3: QUEUE TREE PCQ

### Download Tree

Queues → Queue Tree → +

General: Name=PCQ-DOWNLOAD | Parent=global-out | Packet Marks=download-pcq
  Limits: Max Limit=120M | Queue=pcq-download
  Apply → OK

### Upload Tree

Queues → Queue Tree → +

General: Name=PCQ-UPLOAD | Parent=global-in | Packet Marks=upload-pcq
  Limits: Max Limit=30M | Queue=pcq-upload
  Apply → OK

## STEP 4: CATCH-ALL BACKUP (Opsional)

Queues → Simple Queues → +

General: Name=Z-CATCHALL-BACKUP | Target=192.168.45.0/24\
  Limits: Max Limit=100M/100M\
  Advanced: Priority=8\
  Apply → OK → Pindah ke PALING BAWAH daftar

## VERIFIKASI

1. \[ ] Mangle: 2 rules (download-pcq, upload-pcq)
2. \[ ] Queue Tree: 2 rules (PCQ-DOWNLOAD, PCQ-UPLOAD)
3. \[ ] Simple Queues: Individual queues tetap ada + Z-CATCHALL di bawah
4. \[ ] System → Resources: CPU <70%, Memory >30MB

## TESTING

1. PC tanpa queue → speedtest.net → Harusnya 10-30 Mbps
2. PC dengan queue → speedtest.net → Harusnya 5-10 Mbps (tetap)
3. Test 2-3 device bersamaan → Semua dapat bandwidth wajar
4. Monitor Queue Tree → Klik kanan → Monitor → Bytes naik saat traffic

## TROUBLESHOOTING CEPAT

❌ Speed = 0 Mbps:
  → Cek Mangle: Interface & subnet sesuai?
  → Cek Queue Tree: Packet Marks sama persis dengan Mangle?
  → Cek Queue Types: pcq-download/upload Kind=pcq?

❌ CPU >80%:
  → Kurangi connection timeout: IP → Firewall → Connection Tracking
  → Hapus rule tidak perlu
  → Pertimbangkan upgrade router

❌ Device prioritas lemot:
  → Pastikan individual queue POSISI DI ATAS PCQ/Catch-all
  → Priority individual queue = 1 (lebih tinggi)

## MONITORING RUTIN

Harian (2 menit):\
  → System → Resources: CPU & Memory ok?
  → Tools → Torch: Cek top user saat komplain

Mingguan (10 menit):\
  → Speed test 3 device random
  → Backup: System → Backup → Save ke laptop

## DOKUMENTASI CEPAT

Router: RB2011UiAS-RM | ISP: IndiHome 150Mbps | Device: 88\
PCQ Download: 120Mbps | PCQ Upload: 30Mbps\
Individual Queues: 21 device @ 5-10Mbps\
Catch-All: 100M backup (priority 8)\
Baseline: Prioritas=5-10Mbps | Umum=10-30Mbps | Ping<50ms

## ROLLBACK DARURAT

Disable PCQ:\
  Queues → Queue Tree → Disable PCQ-DOWNLOAD & PCQ-UPLOAD

Restore Backup:\
  System → Backup → Load file backup → Router reboot

## NOTES PENTING

* ⚠️ Safe Mode auto-rollback jika disconnect tanpa save
* ⚠️ PCQ fair sharing: semakin banyak device aktif, semakin kecil jatah per IP
* ⚠️ Individual queue tetap prioritas di atas PCQ
* ⚠️ Simpan backup di 3 tempat: laptop, cloud, USB

## SELESAI

Jika semua test OK → Biarkan Safe Mode auto-save (tunggu 1-2 menit)\
Monitor 24 jam pertama → Catat jika perlu adjust limit
