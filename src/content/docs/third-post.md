---
title: Shopify Theme Customization Guide
description: "Comprehensive guide for updating Shopify theme: CSS, Liquid files,
  product templates, and responsive header styling."
pubDate: Jul 22 2022
heroImage: /images/uploads/admin-dashboard.png
tags:
  - shopify
  - css
  - liquid
  - customization
draft: false
---
### **Catatan Proyek & Modifikasi Tema Shopify**

1. **File `theme.liquid`**

   * Minifikasi CSS jika diperlukan.
   * Tambahkan baris ini di atas tag penutup `</head>`:

   ```liquid
   {{ 'custom-mega-menu.css' | asset_url | stylesheet_tag }}
   ```
2. **File `header.liquid`**

   * Ganti bagian `component-mega-menu.css` dengan kode berikut:

   ```liquid
   {%- if section.settings.menu_type_desktop == 'mega' -%}
     <link rel="stylesheet" href="{{ 'custom-mega-menu.css' | asset_url }}" media="print" onload="this.media='all'">
   {%- endif -%}
   ```

   * Perbaiki file `custom-mega-menu.css` jika ada masalah.
3. **File `snippets/language-localization.liquid`**

   * Ganti seluruh konten file ini.
4. **File `main-article.liquid`**

   * Tambahkan baris ini di paling atas file:

   ```liquid
   {{ 'sidebar.css' | asset_url | stylesheet_tag }}
   ```

   * Tambahkan kode berikut di atas tag penutup `</article>`:

   ```liquid
   <div class="article-sidebar">
     {% render 'sidebar' %}
   </div>
   ```
5. **File `main-collection-banner.liquid`**

   * Lakukan styling untuk deskripsi koleksi.
   * Perbarui kode untuk deskripsi banner gambar.
6. **File `card-product.liquid`**

   * Cari bagian "sale" dan ganti kodenya dengan:

   ```liquid
   {{ card_product.compare_at_price | minus: card_product.price | times: 100 | divided_by: card_product.compare_at_price }}% OFF
   ```
7. **File `price.liquid`**

   * Cari bagian "sale" dan ganti kodenya dengan:

   ```liquid
   {{ compare_at_price | minus: price | times: 100 | divided_by: compare_at_price }}% OFF
   ```
8. **File `texrich.liquid`**

   * Ganti konten file ini.
   * Tempatkan styling-nya di `base.css` dan dalam tag skrip di `theme.liquid`.
9. **File `facets.liquid`**

   * Ganti kode yang ada dengan hanya `open`.
   * **Sebelum:**

   ```liquid
   {% if filter_type == 'vertical' and forloop.index == 1 %}
     open
   {% endif %}
   ```

   * **Sesudah:**

   ```liquid
   open
   ```
10. **File `component-slideshow.css`**

    * Jika ingin mengedit `slideshow.liquid`, lakukan perubahannya di file CSS ini.
11. **File `base.css`**

    * Lakukan remake width, font, dan tambahkan kode untuk *smoothness header navbar* di baris paling bawah. Gunakan kode CSS berikut:

    ```css
    /* === GLOBAL FULL WIDTH RESET === */
    .page-width,
    .page-width-desktop,
    .page-width-tablet,
    .page-width--narrow {
      max-width: none !important;
      width: 100% !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    /* Padding kiri-kanan global */
    body {
      padding-left: clamp(1rem, 4vw, 4rem);
      padding-right: clamp(1rem, 4vw, 4rem);
      box-sizing: border-box;
      font-size: clamp(14px, 2.2vw, 18px);
      line-height: 1.6;
      background-color: #fff; /* biar aman waktu render */
    }

    /* Header & Footer mengikuti padding */
    .header,
    .footer,
    .utility-bar__grid {
      padding-left: clamp(1rem, 4vw, 4rem) !important;
      padding-right: clamp(1rem, 4vw, 4rem) !important;
    }

    /* Menu link hover effect */
    .header .header__menu-item {
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .header .header__menu-item:hover {
      color: #e60023;
      transform: scale(1.05);
    }

    /* Hide localization selector */
    .disclosure__button.localization-selector {
      display: none !important;
    }

    /* Header smoothness */
    .header {
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    /* Pastikan menu tetap sejajar horizontal di layar laptop */
    @media (min-width: 750px) and (max-width: 1200px) {
      /* ... (kode sebelumnya untuk flexbox, font-size, dll.) ... */

      .header__menu-item {
        font-size: clamp(0.7rem, 1.2vw, 1rem);  
        padding: 10px 5px !important;  
        white-space: nowrap !important;  
        overflow: hidden;

        display: flex; 
        align-items: center;  
        justify-content: center;  
        gap: 3px;
        position: relative;  
      }

      .header__menu-item svg {  
        flex-shrink: 0;  
        width: 12px;  
        height: 12px;  
        margin-left: 3px;
      }

      /* Jika ikon tetap menimpa, coba sembunyikan sepenuhnya pada ukuran layar ini */
      /* .header__menu-item svg {
        display: none !important;
      } */
    }

    @media (min-width: 1200px) and (max-width: 1280px) {
      .header__inline-menu .list-menu--inline {
        flex-wrap: nowrap !important;
      }
      
      .header__inline-menu .list-menu--inline > li {
        flex: 1;
        text-align: center;
      }

      .header__menu-item {
        font-size: 13px !important; /* Kurangi ukuran font secara agresif */
        padding: 10px 5px !important; /* Kurangi padding untuk menambah ruang */
        white-space: nowrap !important;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
      }
      
      .header__menu-item svg {
        width: 10px; /* Ukuran ikon lebih kecil */
        height: 10px;
      }
    }

    @media (min-width: 1200px) and (max-width: 1280px) {
      .header-wrapper {
        max-width: 100% !important;
        padding: 0 10px; /* Opsional: Kurangi padding di sisi header */
      }
    }

    @media (min-width: 1200px) and (max-width: 1350px) {
      .header__inline-menu .list-menu--inline {
        flex-wrap: nowrap !important;
      }
      
      .header__inline-menu .list-menu--inline > li {
        flex: 1;
        text-align: center;
      }

      .header__menu-item {
        font-size: 13px !important; /* Ukuran font agresif untuk memaksa masuk */
        padding: 10px 5px !important; /* Kurangi padding secara agresif */
        white-space: nowrap !important;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
      }
      
      .header__menu-item svg {
        width: 10px; /* Ukuran ikon lebih kecil */
        height: 10px;
      }
    }

    @media (min-width: 1200px) and (max-width: 1350px) {
      .header-wrapper {
        max-width: 100% !important;
        padding: 0 10px;
      }
    }

    @media (max-width: 1350px) {
      .header__inline-menu .list-menu--inline {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap !important; /* Mencegah menu melipat ke baris baru */
        width: 100%;
      }

      .header__inline-menu .list-menu--inline > li {
        flex: 1;
        flex-grow: 1;
        text-align: center;
      }

      .header__menu-item {
        font-size: clamp(0.7rem, 1.2vw, 1rem); /* Ukuran font responsif */
        padding: 10px 5px !important;
        white-space: nowrap !important;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
      }

      .header__menu-item svg {
        flex-shrink: 0;
        width: 12px;
        height: 12px;
        margin-left: 3px;
      }
    }
    ```
