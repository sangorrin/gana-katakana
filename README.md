# Gana Katakana! (ガナカタカナ)

Una aplicación progresiva (PWA y móvil nativa) táctil, moderna y artesanal inspirada en la pintura tradicional japonesa (*Nihonga*) para aprender y dominar el silabario Katakana completo.

![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)
![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF.svg)

---

## 🌸 Características Principales

- **100% Autónoma y Sin Conexión (Offline-First):**
  - No realiza llamadas a servidores ni APIs externas durante su uso.
  - Los audios nativos y las animaciones vectoriales de trazos se sirven desde archivos locales en el propio dispositivo o empaquetados en memoria.
- **Tablas Completas de Katakana:**
  - **Katakana Básico (Seion):** 46 caracteres fundamentales divididos por filas vocálicas y consonánticas.
  - **Diptongos (Youon):** 33 combinaciones de caracteres pequeños (キャ, シャ, チャ, etc.).
  - **Acentos (Dakuten y Handakuten):** 20 sonidos sonoros (ガ, ザ, ダ, バ) y 5 sordos (パ, ピ, プ, ペ, ポ).
  - **Katakana Moderno / Extranjero:** 17 combinaciones para préstamos occidentales (ティ, シェ, ファ, etc.).
- **Vocabulario 100% Katakana Puro:**
  - 242 palabras de ejemplo auditadas sin kanjis ni mezclas con hiragana.
- **Modos de Estudio Especializados:**
  - **Modo Sonidos:** Tabla interactiva táctil con audio nativo instantáneo y rastreo de práctica por niveles (1 al 5).
  - **Modo Detalles:** Animaciones de orden de trazo vectoriales (*StrokeSVG*) instantáneas y sin parpadeos, reproducción automática de locución y vocabulario interactivo.
  - **Modo Flashcards:** Tarjetas interactivas con giro 3D suave, filtros por categoría (incluyendo mazo completo de 231 palabras) y control de dominio.
- **Animaciones de Trazo Locales Síncronas (StrokeSVG):**
  - Basadas en la tipografía caligráfica **Klee One**.
  - Los 81 gráficos vectoriales están pre-empaquetados en memoria (`src/data/katakanaSvgMap.ts`), eliminando cualquier parpadeo de carga.
  - Soporte completo para **Dakuten y Handakuten** (trazos animados tanto del carácter base como de las comillas o círculo).
  - **Trazado Secuencial en Youon:** En combinaciones dobles (p. ej. `シ` + `ュ`), el primer carácter completa todos sus trazos antes de que comience el segundo, respetando el orden caligráfico real.
- **Motor de Audio Sprite Nativo Dual:**
  - **Voz Femenina:** Locución de alta claridad en japonés nativo.
  - **Voz Masculina Neuronal:** Locución profunda y cálida sintetizada mediante red neuronal con **VOICEVOX (青山龍星 - Aoyama Ryusei)**.
  - Cero latencia basada en Web Audio API con mapas de marcas de tiempo exactas (`sprite_map.json`).
- **Estética Tradicional Nihonga:**
  - Paleta cromática basada en pigmentos minerales japoneses (*Iwa-enogu*): Gunjo (lapislázuli), Shu (bermellón), Byakuroku (malaquita pálida), Rokusho, Yamabuki, etc.
  - Textura sutil de papel artesanal *Torinoko Washi* y nubes doradas flotantes (*Kin'un / Kinpaku*).
- **Compatibilidad Multiplataforma (Web, Android, iPhone, iPad):**
  - **PWA (Progressive Web App):** Instalable directamente desde el navegador en cualquier sistema operativo.
  - **Capacitor Mobile:** Proyectos nativos configurados para compilar APK para Android y paquete universal para iOS (iPhone e iPad).

---

## 📦 Cómo Crear una Release en GitHub y Descargar los Binarios

El repositorio cuenta con integración continua configurada para generar automáticamente todos los ejecutables cuando creas una **Release** en GitHub:

### Paso 1: Crear la Release en GitHub
1. Ve a la página de tu repositorio en GitHub.
2. En la barra lateral derecha, haz clic en **Releases** (o añade `/releases` a la URL del repositorio).
3. Haz clic en el botón **Draft a new release**.
4. Haz clic en **Choose a tag**:
   - Escribe el identificador de versión (por ejemplo: `v1.0.0`).
   - Haz clic en **Create new tag: v1.0.0 on publish**.
5. Asigna un título a la versión (por ejemplo: `Gana Katakana! v1.0.0`).

### Paso 2: Generar la sección "What's Changed"
- En la esquina superior derecha del cuadro de texto de la descripción, pulsa el botón **Generate release notes**.
- GitHub rellenará automáticamente la sección **What's Changed** con la lista de commits, mejoras y contribuciones desde la versión anterior.

### Paso 3: Publicar la Release
- Haz clic en el botón verde **Publish release**.

### Paso 4: Descarga Automática de Binarios
En cuanto se publica la Release, GitHub Actions ejecuta automáticamente los flujos de compilación en paralelo:
- **`build-android` (Ubuntu + Java JDK 21 + Android SDK 36):** Compila el APK de depuración.
- **`build-ios` (macOS + Xcode + Swift Package Manager):** Compila el archivo IPA y el paquete de la app.

Al cabo de unos minutos, dentro de la sección **Assets** de esa misma Release encontrarás:

| Archivo | Plataforma | Descripción |
| :--- | :--- | :--- |
| **`GanaKatakana-android-debug.apk`** | Android | APK instalable directamente en cualquier dispositivo o emulador Android. |
| **`GanaKatakana-ios-unsigned.ipa`** | iOS (iPhone / iPad) | Paquete IPA listo para instalar con herramientas como AltStore, Sideloadly o TrollStore. |
| **`GanaKatakana-ios-app.zip`** | iOS | Paquete de la aplicación `.app` para simuladores o archivado en Xcode. |
| **`GanaKatakana-web.zip`** | Web / PWA | Paquete web estático comprimido para desplegar en cualquier servidor o abrir localmente. |
| **`Source code (zip)`** | Multiplataforma | Código fuente comprimido generado automáticamente por GitHub. |
| **`Source code (tar.gz)`** | Multiplataforma | Código fuente en tarball generado automáticamente por GitHub. |

---

## 🌐 Publicación Gratuita en la Web con GitHub Pages

La aplicación está diseñada para ser **100% estática y sin conexión**, por lo que se puede alojar de forma totalmente **gratuita** en **GitHub Pages**:

### ¿Cómo activarlo en GitHub?
1. Ve a tu repositorio en GitHub y haz clic en **Settings**.
2. En la barra lateral izquierda, entra en **Pages**.
3. En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! A partir de ese momento, el flujo de trabajo `.github/workflows/deploy-pages.yml` compilará y publicará la aplicación web automáticamente en cada subida a la rama `main` y con cada nueva Release.
5. Tu app web estará accesible en vivo para todo el mundo en:
   ```
   https://<TU-USUARIO>.github.io/<TU-REPOSITORIO>/
   ```

---

## 🛠️ Tecnologías

- **Frontend:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4 con tipografías japonesas (Klee One / Shippori Mincho).
- **Audio:** Web Audio API con AudioBuffer Sprites (`sprite_female.mp3`, `sprite_male.mp3`).
- **Trazos:** Vector SVGs locales con animación CSS basada en StrokeSVG / Klee One.
- **Móvil:** Capacitor 8 (Android Gradle 8.14 con JDK 21, iOS Xcode con Swift Package Manager).

---

## 🚀 Desarrollo y Compilación Local

### Desarrollo
```bash
npm run dev
```
Inicia el servidor local en `http://localhost:3000`.

### Compilación Web
```bash
npm run build
```
Genera los archivos estáticos en la carpeta `dist/`.

### Sincronización Móvil
```bash
# Sincronizar ambas plataformas
npm run cap:sync

# O sincronizar individualmente
npm run cap:sync:android
npm run cap:sync:ios
```

---

## 📄 Licencias y Atribución

- **Código de la aplicación:** [Licencia MIT](LICENSE.md).
- **Animaciones de trazos:** Proyecto [StrokeSVG](https://github.com/zhengkyl/strokesvg) de Kyle Zheng (Licencia MIT).
- **Glifos y formas caligráficas:** Tipografía [Klee One](https://github.com/fontworks-fonts/Klee) de Fontworks Inc. ([SIL Open Font License 1.1](LICENSE.md)).
- **Locución masculina:** Sintetizada con [VOICEVOX: 青山龍星](https://voicevox.hiroshiba.jp/).
