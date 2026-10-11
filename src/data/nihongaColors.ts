import { NihongaColorInfo } from '../types';

export const NIHONGA_PIGMENTS: NihongaColorInfo[] = [
  {
    name: 'Shu (Bermellón de cinabrio)',
    kanji: '朱',
    baseHex: '#B9382C',
    accentHex: '#E2584A',
    meaning: 'Pigmento mineral de cinabrio tradicional, reverenciado en sellos hanko y templos.',
  },
  {
    name: 'Yamabuki (Ocre dorado)',
    kanji: '山吹',
    baseHex: '#C58C18',
    accentHex: '#E7AA2B',
    meaning: 'Inspirado en la flor de kerria japonesa y la orfebrería de pan de oro.',
  },
  {
    name: 'Moegi (Brote verde de primavera)',
    kanji: '萌黄',
    baseHex: '#4E7F35',
    accentHex: '#6F9F52',
    meaning: 'Pigmento mineral de malaquita triturada que simboliza nuevo crecimiento.',
  },
  {
    name: 'Asagi (Aguamarina cerúleo)',
    kanji: '浅葱',
    baseHex: '#2E7585',
    accentHex: '#4795A7',
    meaning: 'Tono tradicional de lino teñido en las primeras capas de índigo de Kioto.',
  },
  {
    name: 'Konjo (Azul lapislázuli ultramar)',
    kanji: '紺青',
    baseHex: '#21477A',
    accentHex: '#38639F',
    meaning: 'Pigmento mineral extraído de azurita profunda usado por los maestros del ukiyo-e.',
  },
  {
    name: 'Koubai (Rosa flor de ciruelo)',
    kanji: '紅梅',
    baseHex: '#AD3C59',
    accentHex: '#CD5B78',
    meaning: 'El renacer de los ciruelos invernales reflejado en biombos del periodo Edo.',
  },
  {
    name: 'Fuji (Lavanda glicina imperial)',
    kanji: '藤',
    baseHex: '#6E4582',
    accentHex: '#8E62A4',
    meaning: 'Tono noble y espiritual de las cascadas de flores glicinas de primavera.',
  },
  {
    name: 'Kohaku (Ámbar fósil resinoso)',
    kanji: '琥珀',
    baseHex: '#BA6D1F',
    accentHex: '#DB8D3E',
    meaning: 'Resina petrificada milenaria de tono cálido meloso y terroso.',
  },
  {
    name: 'Matsuba (Verde pino perenne)',
    kanji: '松葉',
    baseHex: '#2F674B',
    accentHex: '#488365',
    meaning: 'Simboliza la longevidad y la perseverancia inmutable del pino japonés.',
  },
  {
    name: 'Kurumi (Nogal corteza tradicional)',
    kanji: '胡桃',
    baseHex: '#664936',
    accentHex: '#85634D',
    meaning: 'Tinte cálido extraído de la cáscara del nogal sobre papel washi crudo.',
  },
];

/**
 * Computes CSS styles for a Katakana cell based on practice counter (0-5)
 * Level 0: Pale translucent washi wash (low saturation and light)
 * Level 5: Deep, rich, saturated traditional Nihonga mineral pigment with gold foil rim
 */
export function getNihongaCellStyle(rowIndex: number, counter: number = 0) {
  const pigment = NIHONGA_PIGMENTS[rowIndex % NIHONGA_PIGMENTS.length];
  const count = Math.max(0, Math.min(5, counter));

  // Opacities & saturation progression
  const bgOpacities = [0.04, 0.16, 0.32, 0.52, 0.74, 0.95];
  const borderOpacities = [0.15, 0.28, 0.45, 0.65, 0.85, 1.0];

  const currentBgOpacity = bgOpacities[count];
  const currentBorderOpacity = borderOpacities[count];

  const isMax = count === 5;

  return {
    pigment,
    count,
    style: {
      backgroundColor: isMax ? pigment.baseHex : `${pigment.baseHex}${Math.round(currentBgOpacity * 255).toString(16).padStart(2, '0')}`,
      borderColor: isMax ? '#D4AF37' : `${pigment.baseHex}${Math.round(currentBorderOpacity * 255).toString(16).padStart(2, '0')}`,
      color: count >= 3 ? '#FFFFFF' : '#2A2521',
      boxShadow: isMax 
        ? `0 0 0 1.5px #D4AF37, 0 4px 12px ${pigment.baseHex}40` 
        : count > 0 
          ? `0 2px 6px ${pigment.baseHex}20` 
          : '0 1px 2px rgba(0,0,0,0.03)',
    },
    romajiColor: count >= 3 ? 'rgba(255, 255, 255, 0.85)' : '#7A7067',
  };
}
