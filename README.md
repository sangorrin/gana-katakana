# Gana Katakana! (ガナカタカナ)

Una aplicación web progresiva (PWA) moderna, táctil y artesanal inspirada en la pintura tradicional japonesa (*Nihonga*) para aprender y dominar el silabario Katakana completo.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)

---

## 🌸 Características

- **100% Estática y Autónoma (Offline-First):**
  - No realiza **ninguna llamada a servidores o APIs externas** en tiempo de ejecución.
  - Tanto los audios nativos en voz femenina y masculina como las animaciones vectoriales de trazos se sirven desde archivos locales en el propio dispositivo.
- **Tablas Completas de Katakana:**
  - **Katakana Básico (Seion):** 46 caracteres fundamentales divididos por filas vocálicas y consonánticas.
  - **Diptongos (Youon):** 33 combinaciones de caracteres pequeños (キャ, シャ, チャ, etc.).
  - **Acentos (Dakuten y Handakuten):** 20 sonidos sonoros (ガ, ザ, ダ, バ) y 5 sordos (パ, ピ, プ, ペ, ポ).
  - **Katakana Moderno / Extranjero:** 17 combinaciones para préstamos occidentales (ティ, シェ, ファ, etc.).
- **Modos de Estudio Especializados:**
  - **Modo Sonidos:** Tabla interactiva táctil con audio nativo instantáneo y rastreo de práctica por niveles (1 al 5).
  - **Modo Detalles:** Animaciones de orden de trazo vectoriales (*StrokeSVG*) 100% locales y vocabulario de ejemplo real en japonés con romaji y traducción al español.
  - **Modo Flashcards:** Tarjetas interactivas con vuelta 3D suave, filtros por categoría (incluyendo mazo completo de 231 palabras), y control de dominio.
- **Animaciones de Trazo Locales (StrokeSVG):**
  - Basadas en la tipografía caligráfica **Klee One**.
  - Todos los archivos SVG están almacenados localmente en la app (`public/strokes/katakana/`), sin descargas externas en tiempo de ejecución.
  - Soporte completo para **Dakuten y Handakuten** (trazos animados tanto del carácter base como de las comillas/círculo).
  - **Trazado Secuencial en Youon:** En combinaciones dobles (p. ej. `シ` + `ュ`), el primer carácter completa todos sus trazos antes de que comience el segundo, respetando el orden real de escritura japonés.
  - Perfecta alineación vectorial en combinaciones Youon (sin fondos blancos ni artefactos de imagen).
- **Motor de Audio Sprite Nativo:**
  - Locución en dos voces japonesas (*femenina y masculina*) que se alternan en cada pulsación.
  - Cero latencia y reproducción instantánea basada en Web Audio API con marcas de tiempo exactas (`sprite_map.json`).
  - Audio sin cortes ni transformaciones destructivas de tono.
- **Estética Tradicional Nihonga:**
  - Paleta cromática basada en pigmentos minerales japoneses (*Iwa-enogu*): Gunjo (lapislázuli), Shu (bermellón), Byakuroku (malaquita pálida), Rokusho, Yamabuki, etc.
  - Fondo con textura de papel artesanal *Torinoko Washi* y nubes doradas flotantes (*Kin'un / Kinpaku*).
- **Compatibilidad Multiplataforma (Web, Android, iPhone, iPad):**
  - **PWA (Progressive Web App):** Instalable directamente desde el navegador en Android, iPhone, iPad y ordenadores con soporte offline completo.
  - **Capacitor Mobile:** Proyectos nativos listos para compilar en Android Studio (Android APK) y Xcode (iPhone y iPad).

---

## 🛠️ Tecnologías

- **Frontend:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4 con tipografías japonesas (Klee One / Yuji Boku para trazos caligráficos, Shippori Mincho para lectura).
- **Audio:** Web Audio API con AudioBuffer Sprites (`sprite_female.mp3`, `sprite_male.mp3`).
- **Trazos:** Vector SVGs locales con animación CSS basada en StrokeSVG / Klee One.
- **Iconos:** Lucide Icons.

---

## 🚀 Scripts y Flujo de Compilación

### ¿Qué hace `npm run build`?
`npm run build` ejecuta el compilador de **Vite** para generar la aplicación web optimizada y empaquetada dentro de la carpeta `dist/` (HTML, JavaScript minificado, CSS y recursos estáticos).
> **Nota:** `npm run build` **NO** genera directamente el archivo `.apk` de Android ni el `.ipa` de iOS. Para empaquetar las apps nativas se utilizan las herramientas de Capacitor o las GitHub Actions automatizadas.

### 1. Desarrollo Local
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:3000`.

### 2. Compilación Web de Producción
```bash
npm run build
```
Genera la versión optimizada en la carpeta `dist/`.

### 3. Sincronización con Android e iOS
```bash
# Sincronizar ambas plataformas
npm run cap:sync

# O sincronizar individualmente
npm run cap:sync:android
npm run cap:sync:ios
```

---

## 🤖 Compilación Automatizada en GitHub Actions

El repositorio incluye dos flujos de trabajo (*workflows*) automatizados que se disparan cada vez que publicas una **Release** en GitHub (o manualmente desde la pestaña *Actions*):

### 1. Build Android APK (`.github/workflows/build-android.yml`)
- Se ejecuta en un entorno `ubuntu-latest` con Java JDK 17 y Android SDK.
- Compila automáticamente el archivo `GanaKatakana-android-debug.apk`.
- Guarda el archivo APK como **Artifact** descargable de la acción durante 30 días.
- Adjunta automáticamente el archivo `.apk` a los ficheros descargables de la **GitHub Release**.

### 2. Build iOS App (iPhone y iPad) (`.github/workflows/build-ios.yml`)
- Se ejecuta en un entorno `macos-latest` con Xcode y el SDK de iOS.
- Compila el proyecto Xcode universal para iPhone y iPad sin requerir certificados de pago previos (`CODE_SIGNING_ALLOWED=NO`).
- Empaqueta dos formatos:
  - `GanaKatakana-ios-unsigned.ipa`: Paquete IPA estándar para instalación mediante herramientas como AltStore, Sideloadly o TrollStore.
  - `GanaKatakana-ios-app.zip`: Paquete `.app` para simuladores o archivado.
- Guarda ambos archivos como **Artifacts** descargables de la acción durante 30 días y los adjunta automáticamente a la **GitHub Release**.

---

## 📱 ¿Cómo instalar la App para iPhone y iPad?

### Opción A: Como App PWA Directa (Sin Mac / Sin App Store)
La aplicación ya está configurada como una Progressive Web App (PWA) de nivel de producción:
1. Abre la URL de la app en **Safari** desde un iPhone o un iPad.
2. Pulsa el botón **Compartir** (icono de cuadrado con flecha hacia arriba).
3. Selecciona **«Añadir a la pantalla de inicio»** (*Add to Home Screen*).
4. La app se instalará con su icono oficial, pantalla de carga y se ejecutará a pantalla completa sin barras de navegador, con soporte sin conexión (*offline*).

### Opción B: A través de la Release de GitHub (IPA)
1. Descarga el archivo `GanaKatakana-ios-unsigned.ipa` generado por la GitHub Action de la Release.
2. Fírmalo e instálalo en tu iPhone o iPad usando herramientas gratuitas como AltStore, Sideloadly o Xcode.

---

## 📄 Licencias y Atribución

Este proyecto combina recursos de código abierto de acuerdo con sus respectivas licencias (ver [LICENSE.md](LICENSE.md)):

1. **Código de la aplicación:** Distribuido bajo la [Licencia MIT](LICENSE.md).
2. **Animaciones de trazos:** Proyecto [StrokeSVG](https://github.com/zhengkyl/strokesvg) de Kyle Zheng (Licencia MIT).
3. **Glifos y formas caligráficas:** Tipografía [Klee One](https://github.com/fontworks-fonts/Klee) de Fontworks Inc., bajo la licencia abierta [SIL Open Font License 1.1 (OFL)](LICENSE.md).
