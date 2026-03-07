/**
 * Catalogo de produtos Apple para autocomplete inteligente.
 * Cada produto contem todas as informacoes necessarias para preencher o formulario.
 * category_match: usado para vincular automaticamente com a categoria correta.
 */

export const appleProductCatalog = [
  // ── iPhone ──────────────────────────────────────────────
  {
    name: 'iPhone 16 Pro Max 256GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16PM-256',
    price: 12499,
    description: 'Titanio. Chip A18 Pro. Controle de Camera. Tela Super Retina XDR de 6,9 polegadas com ProMotion. Sistema de camera Pro de 48MP com zoom optico 5x. Botao de Acao. USB-C com USB 3.',
    specs: [
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Tela', value: '6,9" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: 'Armazenamento', value: '256GB' },
      { label: 'Material', value: 'Titanio' },
      { label: 'Bateria', value: 'Ate 33h de reproducao de video' },
    ],
  },
  {
    name: 'iPhone 16 Pro Max 512GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16PM-512',
    price: 14499,
    description: 'Titanio. Chip A18 Pro. Controle de Camera. Tela Super Retina XDR de 6,9 polegadas com ProMotion. Sistema de camera Pro de 48MP com zoom optico 5x. 512GB de armazenamento.',
    specs: [
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Tela', value: '6,9" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: 'Armazenamento', value: '512GB' },
      { label: 'Material', value: 'Titanio' },
    ],
  },
  {
    name: 'iPhone 16 Pro Max 1TB',
    category_match: 'iPhone',
    sku: 'APL-IPH16PM-1TB',
    price: 17499,
    description: 'Titanio. Chip A18 Pro. Controle de Camera. Tela Super Retina XDR de 6,9 polegadas com ProMotion. 1TB de armazenamento para profissionais.',
    specs: [
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Tela', value: '6,9" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: 'Armazenamento', value: '1TB' },
      { label: 'Material', value: 'Titanio' },
    ],
  },
  {
    name: 'iPhone 16 Pro 128GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16P-128',
    price: 9499,
    description: 'Titanio. Chip A18 Pro. Controle de Camera. Tela Super Retina XDR de 6,3 polegadas com ProMotion. Sistema de camera Pro de 48MP.',
    specs: [
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Tela', value: '6,3" Super Retina XDR' },
      { label: 'Camera', value: '48MP Pro' },
      { label: 'Armazenamento', value: '128GB' },
      { label: 'Material', value: 'Titanio' },
    ],
  },
  {
    name: 'iPhone 16 Pro 256GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16P-256',
    price: 10499,
    description: 'Titanio. Chip A18 Pro. Controle de Camera. Tela Super Retina XDR de 6,3 polegadas com ProMotion. 256GB de armazenamento.',
    specs: [
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Tela', value: '6,3" Super Retina XDR' },
      { label: 'Camera', value: '48MP Pro' },
      { label: 'Armazenamento', value: '256GB' },
      { label: 'Material', value: 'Titanio' },
    ],
  },
  {
    name: 'iPhone 16 128GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16-128',
    price: 7799,
    description: 'Chip A18. Controle de Camera. Tela Super Retina XDR de 6,1 polegadas. Camera de 48MP. Design colorido em aluminio.',
    specs: [
      { label: 'Chip', value: 'A18' },
      { label: 'Tela', value: '6,1" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Armazenamento', value: '128GB' },
    ],
  },
  {
    name: 'iPhone 16 256GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16-256',
    price: 8799,
    description: 'Chip A18. Controle de Camera. Tela Super Retina XDR de 6,1 polegadas. Camera de 48MP. 256GB de armazenamento.',
    specs: [
      { label: 'Chip', value: 'A18' },
      { label: 'Tela', value: '6,1" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Armazenamento', value: '256GB' },
    ],
  },
  {
    name: 'iPhone 16 Plus 128GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16PL-128',
    price: 8799,
    description: 'Chip A18. Controle de Camera. Tela Super Retina XDR de 6,7 polegadas. Camera de 48MP. Bateria para o dia todo.',
    specs: [
      { label: 'Chip', value: 'A18' },
      { label: 'Tela', value: '6,7" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Armazenamento', value: '128GB' },
    ],
  },
  {
    name: 'iPhone 16 Plus 256GB',
    category_match: 'iPhone',
    sku: 'APL-IPH16PL-256',
    price: 9799,
    description: 'Chip A18. Controle de Camera. Tela Super Retina XDR de 6,7 polegadas. Camera de 48MP. 256GB de armazenamento.',
    specs: [
      { label: 'Chip', value: 'A18' },
      { label: 'Tela', value: '6,7" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Armazenamento', value: '256GB' },
    ],
  },
  {
    name: 'iPhone 15 Pro Max 256GB',
    category_match: 'iPhone',
    sku: 'APL-IPH15PM-256',
    price: 9499,
    description: 'Titanio. Chip A17 Pro. Camera principal de 48MP com zoom optico 5x. Tela Super Retina XDR de 6,7 polegadas com ProMotion.',
    specs: [
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Tela', value: '6,7" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: 'Armazenamento', value: '256GB' },
      { label: 'Material', value: 'Titanio' },
    ],
  },
  {
    name: 'iPhone 15 Pro 128GB',
    category_match: 'iPhone',
    sku: 'APL-IPH15P-128',
    price: 7999,
    description: 'Titanio. Chip A17 Pro. Sistema de camera Pro de 48MP. Tela Super Retina XDR de 6,1 polegadas com ProMotion.',
    specs: [
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Tela', value: '6,1" Super Retina XDR' },
      { label: 'Camera', value: '48MP Pro' },
      { label: 'Armazenamento', value: '128GB' },
    ],
  },
  {
    name: 'iPhone 15 128GB',
    category_match: 'iPhone',
    sku: 'APL-IPH15-128',
    price: 5999,
    description: 'Dynamic Island. Camera principal de 48MP. Chip A16 Bionic. USB-C. Tela Super Retina XDR de 6,1 polegadas.',
    specs: [
      { label: 'Chip', value: 'A16 Bionic' },
      { label: 'Tela', value: '6,1" Super Retina XDR' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Armazenamento', value: '128GB' },
    ],
  },

  // ── MacBook ─────────────────────────────────────────────
  {
    name: 'MacBook Air M4 13"',
    category_match: 'MacBook',
    sku: 'APL-MBA-M4-13',
    price: 12499,
    description: 'Chip Apple M4 com CPU de 10 nucleos e GPU de 10 nucleos. 16GB de memoria unificada. Tela Liquid Retina de 13,6 polegadas. Ate 18 horas de bateria. Fino e leve como nunca.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'CPU', value: '10 nucleos' },
      { label: 'GPU', value: '10 nucleos' },
      { label: 'Memoria', value: '16GB unificada' },
      { label: 'Tela', value: '13,6" Liquid Retina' },
      { label: 'Armazenamento', value: '256GB SSD' },
      { label: 'Bateria', value: 'Ate 18h' },
    ],
  },
  {
    name: 'MacBook Air M4 15"',
    category_match: 'MacBook',
    sku: 'APL-MBA-M4-15',
    price: 14999,
    description: 'Chip Apple M4 com CPU de 10 nucleos e GPU de 10 nucleos. 16GB de memoria unificada. Tela Liquid Retina de 15,3 polegadas. Ate 18 horas de bateria.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'CPU', value: '10 nucleos' },
      { label: 'GPU', value: '10 nucleos' },
      { label: 'Memoria', value: '16GB unificada' },
      { label: 'Tela', value: '15,3" Liquid Retina' },
      { label: 'Armazenamento', value: '256GB SSD' },
      { label: 'Bateria', value: 'Ate 18h' },
    ],
  },
  {
    name: 'MacBook Air M3 13"',
    category_match: 'MacBook',
    sku: 'APL-MBA-M3-13',
    price: 10999,
    description: 'Chip Apple M3 com CPU de 8 nucleos e GPU de 10 nucleos. 8GB de memoria unificada. Tela Liquid Retina de 13,6 polegadas. Fino, leve e rapido.',
    specs: [
      { label: 'Chip', value: 'Apple M3' },
      { label: 'CPU', value: '8 nucleos' },
      { label: 'GPU', value: '10 nucleos' },
      { label: 'Memoria', value: '8GB unificada' },
      { label: 'Tela', value: '13,6" Liquid Retina' },
      { label: 'Armazenamento', value: '256GB SSD' },
    ],
  },
  {
    name: 'MacBook Air M3 15"',
    category_match: 'MacBook',
    sku: 'APL-MBA-M3-15',
    price: 13499,
    description: 'Chip Apple M3 com CPU de 8 nucleos e GPU de 10 nucleos. 8GB de memoria unificada. Tela Liquid Retina de 15,3 polegadas.',
    specs: [
      { label: 'Chip', value: 'Apple M3' },
      { label: 'CPU', value: '8 nucleos' },
      { label: 'GPU', value: '10 nucleos' },
      { label: 'Memoria', value: '8GB unificada' },
      { label: 'Tela', value: '15,3" Liquid Retina' },
      { label: 'Armazenamento', value: '256GB SSD' },
    ],
  },
  {
    name: 'MacBook Pro M4 14"',
    category_match: 'MacBook',
    sku: 'APL-MBP-M4-14',
    price: 18999,
    description: 'Chip Apple M4 Pro com CPU de 12 nucleos e GPU de 16 nucleos. 18GB de memoria unificada. Tela Liquid Retina XDR de 14,2 polegadas. Para profissionais.',
    specs: [
      { label: 'Chip', value: 'Apple M4 Pro' },
      { label: 'CPU', value: '12 nucleos' },
      { label: 'GPU', value: '16 nucleos' },
      { label: 'Memoria', value: '18GB unificada' },
      { label: 'Tela', value: '14,2" Liquid Retina XDR' },
      { label: 'Armazenamento', value: '512GB SSD' },
    ],
  },
  {
    name: 'MacBook Pro M4 16"',
    category_match: 'MacBook',
    sku: 'APL-MBP-M4-16',
    price: 23999,
    description: 'Chip Apple M4 Pro com CPU de 12 nucleos e GPU de 16 nucleos. 18GB de memoria unificada. Tela Liquid Retina XDR de 16,2 polegadas. Maximo desempenho.',
    specs: [
      { label: 'Chip', value: 'Apple M4 Pro' },
      { label: 'CPU', value: '12 nucleos' },
      { label: 'GPU', value: '16 nucleos' },
      { label: 'Memoria', value: '18GB unificada' },
      { label: 'Tela', value: '16,2" Liquid Retina XDR' },
      { label: 'Armazenamento', value: '512GB SSD' },
    ],
  },
  {
    name: 'MacBook Pro M4 Max 14"',
    category_match: 'MacBook',
    sku: 'APL-MBP-M4MAX-14',
    price: 29999,
    description: 'Chip Apple M4 Max com CPU de 14 nucleos e GPU de 32 nucleos. 36GB de memoria unificada. Tela Liquid Retina XDR de 14,2 polegadas. Para workflows extremos.',
    specs: [
      { label: 'Chip', value: 'Apple M4 Max' },
      { label: 'CPU', value: '14 nucleos' },
      { label: 'GPU', value: '32 nucleos' },
      { label: 'Memoria', value: '36GB unificada' },
      { label: 'Tela', value: '14,2" Liquid Retina XDR' },
      { label: 'Armazenamento', value: '1TB SSD' },
    ],
  },

  // ── iPad ────────────────────────────────────────────────
  {
    name: 'iPad Pro M4 11"',
    category_match: 'iPad',
    sku: 'APL-IPADP-M4-11',
    price: 11499,
    description: 'Chip Apple M4. Tela Ultra Retina XDR de 11 polegadas. Apple Pencil Pro. Fino e poderoso como nunca.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Tela', value: '11" Ultra Retina XDR' },
      { label: 'Armazenamento', value: '256GB' },
      { label: 'Conectividade', value: 'Wi-Fi 6E' },
      { label: 'Camera', value: '12MP Wide' },
    ],
  },
  {
    name: 'iPad Pro M4 13"',
    category_match: 'iPad',
    sku: 'APL-IPADP-M4-13',
    price: 14999,
    description: 'Chip Apple M4. Tela Ultra Retina XDR de 13 polegadas. Apple Pencil Pro. A tela mais avancada do iPad.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Tela', value: '13" Ultra Retina XDR' },
      { label: 'Armazenamento', value: '256GB' },
      { label: 'Conectividade', value: 'Wi-Fi 6E' },
      { label: 'Camera', value: '12MP Wide' },
    ],
  },
  {
    name: 'iPad Air M2 11"',
    category_match: 'iPad',
    sku: 'APL-IPADA-M2-11',
    price: 7499,
    description: 'Chip Apple M2. Tela Liquid Retina de 11 polegadas. Compativel com Apple Pencil Pro e Magic Keyboard.',
    specs: [
      { label: 'Chip', value: 'Apple M2' },
      { label: 'Tela', value: '11" Liquid Retina' },
      { label: 'Armazenamento', value: '128GB' },
      { label: 'Conectividade', value: 'Wi-Fi 6E' },
    ],
  },
  {
    name: 'iPad Air M2 13"',
    category_match: 'iPad',
    sku: 'APL-IPADA-M2-13',
    price: 9499,
    description: 'Chip Apple M2. Tela Liquid Retina de 13 polegadas. O maior iPad Air de todos os tempos.',
    specs: [
      { label: 'Chip', value: 'Apple M2' },
      { label: 'Tela', value: '13" Liquid Retina' },
      { label: 'Armazenamento', value: '128GB' },
      { label: 'Conectividade', value: 'Wi-Fi 6E' },
    ],
  },
  {
    name: 'iPad 10a geracao',
    category_match: 'iPad',
    sku: 'APL-IPAD-10',
    price: 3999,
    description: 'Chip A14 Bionic. Tela Liquid Retina de 10,9 polegadas. USB-C. Cameras frontal e traseira de 12MP.',
    specs: [
      { label: 'Chip', value: 'A14 Bionic' },
      { label: 'Tela', value: '10,9" Liquid Retina' },
      { label: 'Armazenamento', value: '64GB' },
    ],
  },
  {
    name: 'iPad mini A17 Pro',
    category_match: 'iPad',
    sku: 'APL-IPADMINI-A17',
    price: 6299,
    description: 'Chip A17 Pro. Tela Liquid Retina de 8,3 polegadas. Apple Pencil Pro. Compacto e poderoso.',
    specs: [
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Tela', value: '8,3" Liquid Retina' },
      { label: 'Armazenamento', value: '128GB' },
    ],
  },

  // ── Apple Watch ─────────────────────────────────────────
  {
    name: 'Apple Watch Ultra 2',
    category_match: 'Apple Watch',
    sku: 'APL-AWU2',
    price: 9299,
    description: 'Caixa de titanio de 49mm. Chip S9 SiP. GPS + Celular. Tela Retina sempre ativa. Resistente a agua ate 100m. Feito para aventura.',
    specs: [
      { label: 'Caixa', value: '49mm Titanio' },
      { label: 'Chip', value: 'S9 SiP' },
      { label: 'Tela', value: 'Retina LTPO OLED' },
      { label: 'Resistencia', value: '100m de profundidade' },
      { label: 'Bateria', value: 'Ate 36h' },
    ],
  },
  {
    name: 'Apple Watch Series 10 42mm',
    category_match: 'Apple Watch',
    sku: 'APL-AWS10-42',
    price: 5299,
    description: 'Caixa de aluminio de 42mm. Chip S10 SiP. Tela ampla OLED sempre ativa. Deteccao de queda e SOS de emergencia.',
    specs: [
      { label: 'Caixa', value: '42mm Aluminio' },
      { label: 'Chip', value: 'S10 SiP' },
      { label: 'Tela', value: 'OLED sempre ativa' },
      { label: 'Resistencia', value: '50m de profundidade' },
    ],
  },
  {
    name: 'Apple Watch Series 10 46mm',
    category_match: 'Apple Watch',
    sku: 'APL-AWS10-46',
    price: 5799,
    description: 'Caixa de aluminio de 46mm. Chip S10 SiP. A maior e mais brilhante tela do Apple Watch. Mais fina que nunca.',
    specs: [
      { label: 'Caixa', value: '46mm Aluminio' },
      { label: 'Chip', value: 'S10 SiP' },
      { label: 'Tela', value: 'OLED sempre ativa' },
      { label: 'Resistencia', value: '50m de profundidade' },
    ],
  },
  {
    name: 'Apple Watch SE 2a geracao 40mm',
    category_match: 'Apple Watch',
    sku: 'APL-AWSE2-40',
    price: 3299,
    description: 'Caixa de aluminio de 40mm. Chip S8 SiP. Essencial para saude e fitness. O melhor custo-beneficio.',
    specs: [
      { label: 'Caixa', value: '40mm Aluminio' },
      { label: 'Chip', value: 'S8 SiP' },
      { label: 'Tela', value: 'OLED Retina' },
    ],
  },

  // ── AirPods ─────────────────────────────────────────────
  {
    name: 'AirPods Pro 2 USB-C',
    category_match: 'AirPods',
    sku: 'APL-APP2-USBC',
    price: 2999,
    description: 'Chip H2. Cancelamento Ativo de Ruido adaptavel. Audio Espacial personalizado. Modo Transparencia. USB-C. Ate 6h de audicao.',
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'ANC', value: 'Cancelamento Ativo adaptavel' },
      { label: 'Audio', value: 'Audio Espacial personalizado' },
      { label: 'Conexao', value: 'USB-C' },
      { label: 'Bateria', value: 'Ate 6h (30h com estojo)' },
    ],
  },
  {
    name: 'AirPods 4',
    category_match: 'AirPods',
    sku: 'APL-AP4',
    price: 1499,
    description: 'Chip H2. Design aberto confortavel. Audio Espacial personalizado. USB-C. Resistente a suor e agua.',
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'Design', value: 'Aberto, sem silicone' },
      { label: 'Audio', value: 'Audio Espacial' },
      { label: 'Conexao', value: 'USB-C' },
      { label: 'Bateria', value: 'Ate 5h (30h com estojo)' },
    ],
  },
  {
    name: 'AirPods 4 com ANC',
    category_match: 'AirPods',
    sku: 'APL-AP4-ANC',
    price: 2299,
    description: 'Chip H2. Cancelamento Ativo de Ruido. Modo Transparencia. Audio Espacial personalizado. USB-C. Design aberto.',
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'ANC', value: 'Cancelamento Ativo de Ruido' },
      { label: 'Audio', value: 'Audio Espacial personalizado' },
      { label: 'Conexao', value: 'USB-C' },
      { label: 'Bateria', value: 'Ate 5h (30h com estojo)' },
    ],
  },
  {
    name: 'AirPods Max USB-C',
    category_match: 'AirPods',
    sku: 'APL-APMAX-USBC',
    price: 6199,
    description: 'Chip H2. Cancelamento Ativo de Ruido de alto desempenho. Audio Espacial personalizado. USB-C. Design over-ear em aluminio.',
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'Design', value: 'Over-ear, aluminio' },
      { label: 'ANC', value: 'Alto desempenho' },
      { label: 'Audio', value: 'Audio Espacial personalizado' },
      { label: 'Bateria', value: 'Ate 20h' },
    ],
  },

  // ── iMac & Mac ──────────────────────────────────────────
  {
    name: 'iMac M4 24"',
    category_match: 'iMac & Mac',
    sku: 'APL-IMAC-M4-24',
    price: 13499,
    description: 'Chip Apple M4. Tela Retina 4.5K de 24 polegadas. 16GB de memoria unificada. Design ultrafino em 7 cores.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Tela', value: '24" Retina 4.5K' },
      { label: 'Memoria', value: '16GB unificada' },
      { label: 'Armazenamento', value: '256GB SSD' },
      { label: 'Camera', value: '12MP Center Stage' },
    ],
  },
  {
    name: 'Mac Mini M4',
    category_match: 'iMac & Mac',
    sku: 'APL-MACMINI-M4',
    price: 5999,
    description: 'Chip Apple M4. 16GB de memoria unificada. Design compacto. Ate 3 monitores externos. Thunderbolt 4.',
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Memoria', value: '16GB unificada' },
      { label: 'Armazenamento', value: '256GB SSD' },
      { label: 'Portas', value: 'Thunderbolt 4, USB-C, HDMI' },
    ],
  },
  {
    name: 'Mac Mini M4 Pro',
    category_match: 'iMac & Mac',
    sku: 'APL-MACMINI-M4P',
    price: 11999,
    description: 'Chip Apple M4 Pro. 24GB de memoria unificada. Design compacto com desempenho profissional. Thunderbolt 5.',
    specs: [
      { label: 'Chip', value: 'Apple M4 Pro' },
      { label: 'Memoria', value: '24GB unificada' },
      { label: 'Armazenamento', value: '512GB SSD' },
      { label: 'Portas', value: 'Thunderbolt 5, USB-C, HDMI' },
    ],
  },
  {
    name: 'Mac Studio M4 Max',
    category_match: 'iMac & Mac',
    sku: 'APL-MACSTUDIO-M4MAX',
    price: 24999,
    description: 'Chip Apple M4 Max. 36GB de memoria unificada. Para workflows profissionais extremos. Thunderbolt 5.',
    specs: [
      { label: 'Chip', value: 'Apple M4 Max' },
      { label: 'Memoria', value: '36GB unificada' },
      { label: 'Armazenamento', value: '512GB SSD' },
      { label: 'Portas', value: 'Thunderbolt 5, USB-C, HDMI, SDXC' },
    ],
  },
  {
    name: 'Mac Pro M2 Ultra',
    category_match: 'iMac & Mac',
    sku: 'APL-MACPRO-M2U',
    price: 49999,
    description: 'Chip Apple M2 Ultra. 192GB de memoria unificada. 7 slots PCIe. Para os workflows mais exigentes do mundo.',
    specs: [
      { label: 'Chip', value: 'Apple M2 Ultra' },
      { label: 'CPU', value: '24 nucleos' },
      { label: 'GPU', value: '76 nucleos' },
      { label: 'Memoria', value: '192GB unificada' },
      { label: 'Armazenamento', value: '1TB SSD' },
    ],
  },

  // ── Acessorios ──────────────────────────────────────────
  {
    name: 'Apple Pencil Pro',
    category_match: 'Acessorios',
    sku: 'APL-PENCIL-PRO',
    price: 1599,
    description: 'Sensor de aperto. Feedback haptico. Rolar com barrel roll. Localizador com Buscar. Compativel com iPad Pro e iPad Air.',
    specs: [
      { label: 'Sensor', value: 'Aperto + Pairar' },
      { label: 'Feedback', value: 'Haptico' },
      { label: 'Compatibilidade', value: 'iPad Pro M4, iPad Air M2' },
    ],
  },
  {
    name: 'Apple Pencil USB-C',
    category_match: 'Acessorios',
    sku: 'APL-PENCIL-USBC',
    price: 949,
    description: 'Ponta precisa de alta sensibilidade. Carregamento e emparelhamento via USB-C. Compativel com todos os iPads com USB-C.',
    specs: [
      { label: 'Conexao', value: 'USB-C' },
      { label: 'Compatibilidade', value: 'Todos os iPads USB-C' },
    ],
  },
  {
    name: 'Magic Keyboard para iPad Pro 11"',
    category_match: 'Acessorios',
    sku: 'APL-MK-IPADP11',
    price: 3499,
    description: 'Teclado retroiluminado com mecanismo de tesoura. Trackpad integrado. Design flutuante. USB-C para carregamento.',
    specs: [
      { label: 'Tipo', value: 'Teclado + Trackpad' },
      { label: 'Retroiluminacao', value: 'Sim' },
      { label: 'Conexao', value: 'Smart Connector' },
    ],
  },
  {
    name: 'MagSafe Charger',
    category_match: 'Acessorios',
    sku: 'APL-MAGSAFE',
    price: 449,
    description: 'Carregamento magnetico sem fio ate 15W. Alinhamento perfeito. Compativel com iPhone 12 e posteriores.',
    specs: [
      { label: 'Potencia', value: '15W' },
      { label: 'Tipo', value: 'Magnetico sem fio' },
      { label: 'Compatibilidade', value: 'iPhone 12+' },
    ],
  },
  {
    name: 'AirTag',
    category_match: 'Acessorios',
    sku: 'APL-AIRTAG',
    price: 369,
    description: 'Localizador de precisao com chip U1. Rede Buscar. Resistente a agua IP67. Bateria substituivel CR2032.',
    specs: [
      { label: 'Chip', value: 'U1 Ultra Wideband' },
      { label: 'Resistencia', value: 'IP67' },
      { label: 'Bateria', value: 'CR2032 (substituivel)' },
    ],
  },
];

/**
 * Busca produtos no catalogo por query.
 * Retorna resultados agrupados por categoria.
 */
export function searchAppleCatalog(query) {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const matches = appleProductCatalog.filter((p) => {
    const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cat = p.category_match.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q) || cat.includes(q);
  });

  // Agrupa por category_match
  const grouped = {};
  for (const item of matches) {
    if (!grouped[item.category_match]) grouped[item.category_match] = [];
    grouped[item.category_match].push(item);
  }

  return Object.entries(grouped).map(([category, items]) => ({ category, items }));
}
