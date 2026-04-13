<h1 align="center">DIALED.GG PERFECT PITCH HACK</h1>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Reverse_Engineering-1C1C1E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Do%C4%9Fruluk-%25100-30D158?style=for-the-badge" />
</p>

> [!NOTE]  
> Bu araç, Dialed.gg üzerindeki frekans bulma (Perfect Pitch) testini **%100 nokta atışı doğrulukla** geçmek için Web Audio API kancalama (hooking) tekniğiyle yazılmıştır.

## Teknik Analiz: Sub-Oscillator Tuzağı

Oyun, tarayıcı üzerinden basit scriptlerle hile yapılmasını engellemek için **Sub-Oscillator (Alt-Bas)** tekniğini kullanır. Sesi toklaştırmak ve algoritmaları şaşırtmak için hedefin tam yarısı frekansında gizli bir katman eklenir.

```diff
- Standart Dinleyicilerin Düştüğü Tuzak:
- Havuzdaki en düşük frekansı alır ve her zaman hedefin yarısını gösterir.

+ Bu Aracın Kullandığı Matematiksel Analiz:
+ Hedef Ses: 634.67 Hz
+ Gizli Alt-Bas (Tuzak): 317.33 Hz
+ İşlem: Frekanslar arası 2x oran saptanır, alt-bas elenir ve nokta atışı değer yazdırılır.
Teknik Özellikler
Kusursuz Filtreleme: LFO (<20Hz) titreşimlerini ve Sub-Bass tuzaklarını ekarte eden harmonik analiz.

Event-Driven Mimari: Gecikme veya kronometre yok. Sitedeki ses çalındığı an tetiklenir, 150ms içinde analizi bitirir ve kendini sağır eder.

İzole Dinleme: Kullanıcının frekansı bulmak için ayar çubuğuyla (slider) ürettiği sesleri tamamen görmezden gelir.

Modern UI Entegrasyonu: DOM üzerine doğrudan enjekte edilen, Apple tasarım standartlarına uygun, sol tarafa hizalı minimalist Koyu Mod (Dark Mode) arayüz.

Kurulum & Kullanım
Tarayıcıda Dialed.gg test ekranını açın.

F12 ile Geliştirici Araçları'nı açıp Console sekmesine geçin.

Kodu konsola yapıştırıp Enter tuşuna basın.

Ekranda beliren panelden DİNLEMEYİ BAŞLAT butonuna tıklayın.

Sitedeki Hedef Sesi Çal düğmesine tıklayın.

Arayüz anında hedef frekansı hesaplayıp yeşil renkle ekrana basacaktır.

[!WARNING]

Yasal Uyarı: Bu proje tamamen eğitim, Web API tersine mühendislik pratikleri ve siber güvenlik araştırmaları amacıyla geliştirilmiştir. Sorumluluk kullanıcıya aittir.
