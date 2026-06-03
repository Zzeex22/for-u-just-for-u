/* ================================================================
   DEVICE TIER SYSTEM — Hardware detection for animations
   Mencegah error dan menyesuaikan jumlah kelopak bunga
   sesuai kekuatan HP/PC pengunjung.
   ================================================================ */

'use strict';

window.DeviceTier = (function() {
  // Mendeteksi jumlah core CPU (opsional/default ke 4 jika tidak terbaca)
  const logicalProcessors = navigator.hardwareConcurrency || 4;
  
  // Mendeteksi RAM perangkat (opsional/default ke 4GB jika tidak terbaca)
  const deviceMemory = navigator.deviceMemory || 4;
  
  let tier = 'high'; // Default tier

  // Jika CPU/RAM rendah, turunkan kualitas grafik agar tetap mulus
  if (logicalProcessors <= 2 || deviceMemory <= 2) {
    tier = 'low';
  } else if (logicalProcessors <= 4 || deviceMemory <= 4) {
    tier = 'mid';
  }

  // Jika pengunjung menggunakan HP (lebar layar kecil), 
  // turunkan ke 'mid' untuk menghemat baterai & frame rate
  if (window.innerWidth < 768 && tier === 'high') {
    tier = 'mid';
  }

  // Ekspor agar bisa dibaca oleh script Canvas & Particle Engine
  return { tier: tier };
})();