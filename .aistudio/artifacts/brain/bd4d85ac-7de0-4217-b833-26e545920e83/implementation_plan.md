# Gana Katakana! — Aplicación Móvil de Aprendizaje de Katakana Tradicional Nihonga

Aplicación interactiva y táctil en español diseñada para el dominio integral del silabario japonés Katakana, con una estética artesanal basada en el estilo artístico tradicional *Nihonga*, texturas de papel *washi*, pronunciaciones con voces en japonés (femenina y masculina) mediante síntesis de voz Web Speech, animaciones de trazo ordenado oficiales de Wikimedia Commons, vocabulario cotidiano ilustrado en estilo kawaii y tarjetas de memorización (*flashcards*).

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones de diseño y arquitectura alineadas con las respuestas del usuario:
> - **Generación de Audio**: Síntesis nativa japonesa Web Speech API (`ja-JP`) con modulación de formantes, tono y cadencia para perfiles claros masculino y femenino alternados en cada toque (módulo 2).
> - **Presentación en Preview**: Marco interactivo de dispositivo móvil con alternador de marcos (iPhone / Android) y opción de vista completa fluida.
> - **Mecánicas de Flashcards**: Tarjetas táctiles giratorias con retroalimentación sonora, registro de progreso ("Lo sé" / "Repasar") y filtros temáticos.

---

## 1. Overview & Core Concept

- **Propósito**: Guiar a estudiantes hispanohablantes desde el reconocimiento inicial de trazos hasta la lectura fluida de palabras extranjeras en katakana, combinando rigor pedagógico con deleite estético tradicional.
- **Audiencia objetivo**: Estudiantes hispanohablantes de japonés básico a intermedio, autodidactas y aficionados a la cultura visual japonesa.
- **Valor diferencial**: 
  - Visualidad auténtica *Nihonga* (pigmentos minerales *iwa-enogu*, ocres dorados, índigo *ai*, bermellón *vermilion/shu*, malaquita *rokushō*).
  - Indicador cromático de práctica: las celdas van pasando de un velo translúcido y sutil (nivel 0) a una intensa saturación mineral (nivel 5) conforme se practican.
  - Separación rigurosa de modos: Sonidos, Detalles (con trazos de Wikimedia Commons y ejemplos kawaii) y Flashcards.

---

## 2. User Experience & Visual Design

### 2.1 Dirección Estética y Paleta Nihonga
- **Fondo y Texturas**: Papel artesanal *Washi* (`#FAF6EE` / `#F3EDE0`), textura de fibra de corteza, bordes sutiles inspirados en tinta *sumi-e* (`#2C2825` con opacidad controlada).
- **Paleta de Pigmentos Minerales por Filas (Niveles 0 a 5 de saturación)**:
  - Fila **A** (Vocales): *Shu* (Bermellón / Laca roja `#C53D32`)
  - Fila **Ka**: *Yamabuki* (Ocre dorado brillante `#D49B24`)
  - Fila **Sa**: *Moegi* (Verde brote primaveral `#5B8A44`)
  - Fila **Ta**: *Asagi* (Aguamarina cerúleo japonés `#3B7A87`)
  - Fila **Na**: *Konjo* (Azul ultramar mineral `#274A78`)
  - Fila **Ha**: *Koubai* (Ciruelo rosado `#B84A62`)
  - Fila **Ma**: *Fuji* (Lavanda glicina imperial `#77568A`)
  - Fila **Ya**: *Kohaku* (Ámbar resinoso `#C07727`)
  - Fila **Ra**: *Matsuba* (Verde pino perenne `#3C6E52`)
  - Fila **Wa / N**: *Kurumi* (Nogal terroso tradicional `#6F523E`)
- **Tipografía**:
  - Títulos y Katakana: Fuente japonesa tradicional de pincel / caligráfica estilizada (`Shippori Mincho`, `Noto Serif JP`) emparejada con tipografía limpia en español (`Plus Jakarta Sans`).
  - Sin píldoras genéricas ni degradados violeta artificiales.

### 2.2 Arquitectura de Pantallas y Flujos
1. **Cabecera & Bienvenida**:
   - Título "Gana Katakana!" con caligrafía tradicional y sello *Hanko* en bermellón.
   - Selector de Modo elegante de 3 opciones: **Sonidos** (por defecto), **Detalles**, **Flashcards**.
2. **Modo Sonidos**:
   - 4 pestañas de silabario: **Katakana** (básicos), **Diptongos** (kya, sha...), **Dakuten** (ga, za, da, ba, pa y sus diptongos) y **Extranjero** (wi, we, ti, tu, fa, fi...).
   - Rejilla tradicional de 5 columnas (a, i, u, e, o) respetando celdas vacías legítimas (omitiendo arcaísmos en desuso como ヰ, ヱ, ヲ).
   - Romaji encima de cada katakana.
   - Toque de botón: emite pronunciación en bucle alternado (toque 1: voz femenina, toque 2: voz masculina) e incrementa el contador de práctica de 0 a 5, intensificando el matiz mineral de la celda.
3. **Modo Detalles**:
   - Misma cuadrícula y pestañas.
   - Al pulsar un carácter o combinación: abre la vista de **Detalle**:
     - Visualizador del trazo: GIF de orden de trazos de Wikimedia Commons Katakana animado.
     - En combinaciones diptongadas (ej. キャ, ファ): el segundo carácter se redimensiona a escala 50% como en la escritura real.
     - Estado estático inicial en el primer frame; al tocar el carácter se ejecuta la animación de trazo y vuelve a quedar lista.
     - Romaji debajo del carácter.
     - Reproducción de audio (femenino/masculino alternado al tocar el carácter).
     - **Palabras de Ejemplo Cotidianas**: 2 vocablos básicos en katakana (ej. コンピュータ, テーブル, テレビ, グラス) con el katakana estudiado resaltado en color bermellón, romaji, traducción al español y una ilustración vectorial en estilo kawaii.
     - Al tocar la palabra o ilustración: pronuncia la palabra completa alternando voz femenina y masculina.
     - Contador de estudio local e independiente para el modo detalles.
4. **Modo Flashcards (Juego de Aprendizaje)**:
   - Tarjetas giratorias con física 3D y sonido de papel/madera al voltear.
   - Anverso: Katakana / Diptongo / Palabra.
   - Reverso: Katakana, romaji, significado en español e ilustración kawaii.
   - Controles de autoevaluación: "Lo sé" (suma al progreso) y "Repasar" (mantiene en rotación).
   - Selector de mazo de estudio (Básicos, Diptongos, Dakuten, Extranjeros, Palabras).
5. **Pie de Página & Modales Legales**:
   - Botones sutiles estilo editorial para "Licencias" (atribución Wikimedia Commons CC BY-SA 3.0 para animaciones de trazos y licencia del software) y "Términos y Privacidad" (Aviso legal y política de privacidad estándar en España/RGPD).

---

## 3. Key Product Decisions & Trade-Offs

- **Motor de Audio**:
  - *Decisión*: Síntesis nativa en navegador con `speechSynthesis` configurado en `ja-JP`, aplicando perfiles de tono (pitch 1.25 para voz femenina, pitch 0.82 para voz masculina), cadencia precisa y soporte para pronunciación de fonemas katakana aislados y compuestos.
  - *Ventaja*: Cero latencia, funcionamiento offline 100% confiable, sin fallos de descarga ni enlaces de audio externos caídos.
- **Animaciones de Trazos Wikimedia**:
  - *Decisión*: Integración con el catálogo canónico de Wikimedia Commons `Katakana_[CHAR]_stroke_order_animation.gif` con fallback vectorial dinámico de trazo en caso de saturación de red.
  - *Manejo de combinaciones*: Carga simétrica o diptongada renderizando el carácter principal al 100% y el secundario al 50% con controles táctiles de disparo de animación.
- **Aislamiento de Contadores**:
  - Los contadores de saturación de color (0 a 5) en Sonidos y en Detalles se almacenan independientemente en el estado local persistido (`localStorage`), garantizando que la práctica de escucha no sobreescriba la de visualización de detalles.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   Gana Katakana! App                   │
├────────────────────────────────────────────────────────┤
│  [ Marco Móvil (iPhone/Android/Full Toggle) ]          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Encabezado Nihonga & Selector de Modos           │  │
│  │ [ ♫ Sonidos ]   [ ℹ Detalles ]   [ 🗂 Flashcards ] │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Contenido Activo del Modo                        │  │
│  │                                                  │  │
│  │ Modo Sonidos:                                    │  │
│  │  - Pestañas (Katakana, Diptongos, Dakuten, Extr) │  │
│  │  - Matriz 5xN con Romaji y Color Mineral (0-5)   │  │
│  │  - Audio alternado ♀ / ♂                         │  │
│  │                                                  │  │
│  │ Modo Detalles:                                   │  │
│  │  - Misma matriz -> Vista Detalle                 │  │
│  │  - GIF orden de trazo (2º carácter 50%)          │  │
│  │  - 2 Ejemplos kawaii interactivos                │  │
│  │                                                  │  │
│  │ Modo Flashcards:                                 │  │
│  │  - Mazo interactivo 3D Flip con sonido           │  │
│  │  - Registro 'Lo sé' / 'Repasar'                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Pie Editorial: Licencias CC BY-SA & Términos ES  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Modelos de Datos Clave
- `KatakanaItem`:
  - `id`: identificador canónico (ej. `'ka'`, `'shi'`, `'kya'`, `'fa'`).
  - `kana`: glifo principal (ej. `'カ'`, `'キャ'`).
  - `secondaryKana?`: segundo glifo para combinaciones (ej. `'ャ'`).
  - `romaji`: transcripción (ej. `'ka'`, `'kya'`).
  - `row`: índice de fila para cálculo de tono mineral Nihonga.
  - `category`: `'katakana' | 'diptongos' | 'dakuten' | 'extranjero'`.
  - `examples`: lista de 2 palabras con `{ word: string, romaji: string, spanish: string, iconType: string }`.
- `PracticeState`:
  - `soundsCounters`: `Record<string, number>` (0 a 5)
  - `detailsCounters`: `Record<string, number>` (0 a 5)
  - `voiceToggle`: `Record<string, number>` (módulo 2)
  - `flashcardStats`: `{ mastered: string[], reviewing: string[] }`

### Plan de Verificación y Compilación
- Comprobar que no hay errores de tipo TypeScript y que la compilación de Vite finaliza sin advertencias mediante `compile_applet`.
- Validar las 4 pestañas en Sonidos y Detalles, las transiciones de color mineral (0 a 5) y el funcionamiento de la animación de trazos y audios.
