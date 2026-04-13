# Dialed.gg Perfect Pitch Hack

Dialed.gg üzerindeki frekans bulma (Perfect Pitch) testini %100 doğrulukla geçmek için geliştirilmiş, Web Audio API kancalama (hooking) tabanlı bir JavaScript aracıdır.

## Teknik Analiz ve Tersine Mühendislik

Oyun, tarayıcı üzerinden basit bir AudioContext dinleyicisi ile hile yapılmasını engellemek için Sub-Oscillator (Alt-Bas) tekniğini kullanır. 

Sistem hedef sesi üretirken, asıl frekansın (fundamental) yanına sesi toklaştırmak ve algoritmaları şaşırtmak için hedefin tam yarısı frekansında (f/2) gizli bir bas katmanı ekler. Standart dinleme scriptleri havuzdaki en düşük değeri çektiği için bu tuzağa düşer ve her zaman hedefin yarısını gösterir.

Bu araç, yakalanan frekansları gerçek zamanlı analiz eder. Eğer yakalanan sesler arasında 2x oranlı bir ilişki varsa, düşük olanın alt-bas tuzağı olduğunu saptar ve asıl hedefi nokta atışı küsuratıyla kullanıcıya sunar.

## Özellikler

* Nokta Atışı Algoritma: Sub-Bass ve LFO (<20Hz) tuzaklarını matematiksel filtreleme ile eler.
* Event-Driven Mimari: Kronometre kullanmaz. Hedef ses tarayıcıda çalındığı an tetiklenir ve 150ms içinde analizi bitirip kendini kapatır.
* İzole Dinleme: Kullanıcının frekansı bulmak için ayar çubuğuyla (slider) ürettiği sesleri görmezden gelir, sadece hedefe odaklanır.
* Minimalist Flat UI: Apple arayüz standartlarına uygun, sol tarafa sabitlenmiş, dikkat dağıtmayan koyu mod tasarım.

## Kurulum ve Kullanım

1. Dialed.gg adresinde ilgili teste girin.
2. F12 tuşuyla Geliştirici Araçları'nı açıp Console sekmesine geçin.
3. Script kodunu konsola yapıştırıp Enter'a basın.
4. Ekranın solundaki panelden "DİNLEMEYİ BAŞLAT" butonuna tıklayın.
5. Sitedeki "Hedef Sesi Çal" düğmesine basın.
6. Panel yeşile dönecek ve size tam frekans değerini verecektir.

## Yasal Uyarı

Bu proje tamamen eğitim, siber güvenlik araştırmaları ve Web API Tersine Mühendislik pratikleri amacıyla geliştirilmiştir. Kullanım sorumluluğu kullanıcıya aittir.
