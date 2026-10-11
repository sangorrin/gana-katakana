# Gana Katakana! (ガナカタカナ)

Una aplicación web progresiva (PWA) moderna, táctil y artesanal inspirada en la pintura tradicional japonesa (*Nihonga*) para aprender y dominar el silabario Katakana completo.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)

---

## 🌸 Características

- **Tablas Completas de Katakana:**
  - **Katakana Básico (Seion):** 46 caracteres fundamentales divididos por filas vocálicas y consonánticas.
  - **Diptongos (Youon):** 33 combinaciones de caracteres pequeños (キャ, シャ, チャ, etc.).
  - **Acentos (Dakuten y Handakuon):** 25 sonidos sonoros (ガ, ザ, ダ, バ) y sordos (パ).
  - **Katakana Moderno / Extranjero:** 17 combinaciones para préstamos occidentales (ティ, シェ, ファ, etc.).
- **Modos de Estudio Especializados:**
  - **Modo Sonidos:** Tabla interactiva táctil con audio nativo instantáneo y rastreo de práctica por niveles (1 al 5).
  - **Modo Detalles:** Animaciones de orden de trazo (*Stroke Order GIF*) y vocabulario de ejemplo real en japonés con romaji y traducción al español.
  - **Modo Flashcards:** Tarjetas interactivas con vuelta 3D suave, filtros por categoría (incluyendo mazo completo de palabras), y control de dominio.
- **Motor de Audio Sprite Nativo:**
  - Locución nativa en dos voces japonesas (*femenina y masculina*) que se alternan con cada pulsación.
  - Cero latencia y reproducción instantánea basada en Web Audio API con mapas de tiempos exactos (`sprite_map.json`).
  - Audio sin cortes ni transformaciones destructivas de tono.
- **Estética Tradicional Nihonga:**
  - Paleta cromática basada en pigmentos minerales japoneses (*Iwa-enogu*): Gunjo (lapislázuli), Shu (bermellón), Byakuroku (malaquita pálida), Rokusho, Yamabuki, etc.
  - Fondo con textura de papel artesanal *Torinoko Washi* y nubes doradas flotantes (*Kin'un / Kinpaku*).
- **Progressive Web App (PWA):**
  - Totalmente instalable en dispositivos móviles (Android / iOS) y escritorio.
  - Compatible con modo sin conexión (*offline-ready*).

---

## 🛠️ Tecnologías

- **Frontend:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4 con tipografías japonesas (Klee One / Yuji Boku para trazos caligráficos, Shippori Mincho para lectura).
- **Audio:** Web Audio API con AudioBuffer Sprites (`sprite_female.mp3`, `sprite_male.mp3`).
- **Iconos:** Lucide Icons.

---

## 🚀 Instalación y Desarrollo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/gana-katakana.git
   cd gana-katakana
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 📄 Licencia

Este proyecto está distribuido bajo la licencia [MIT](LICENSE.md).
