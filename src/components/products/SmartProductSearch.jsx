import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Search, Zap, ChevronRight, Cpu } from "lucide-react";

// Banco de dados local com especificações e preços de referência
const productDatabase = {
  // iPhones
  "iPhone 16e": { sku: "IPHONE-16E", price: 4499, category: "iPhone", condition: "new", description: "iPhone 16e com chip A18, tela OLED de 6,1 polegadas, câmera de 48MP e suporte a Apple Intelligence.", specs: [{ label: "Chip", value: "A18" }, { label: "Tela", value: "6,1\" OLED" }, { label: "Câmera", value: "48MP" }, { label: "Bateria", value: "Até 26h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }, { label: "Face ID", value: "Sim" }] },
  "iPhone 16": { sku: "IPHONE-16", price: 5999, category: "iPhone", condition: "new", description: "iPhone 16 com chip A18, câmera dupla de 48MP, botão de Ação e Controle de Câmera. Design em alumínio com Ceramic Shield.", specs: [{ label: "Chip", value: "A18" }, { label: "Tela", value: "6,1\" Super Retina XDR" }, { label: "Câmera", value: "48MP + 12MP Ultra Wide" }, { label: "Bateria", value: "Até 22h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }, { label: "Face ID", value: "Sim" }] },
  "iPhone 16 Plus": { sku: "IPHONE-16-PLUS", price: 6999, category: "iPhone", condition: "new", description: "iPhone 16 Plus com tela maior de 6,7 polegadas, chip A18, câmera de 48MP e bateria de longa duração.", specs: [{ label: "Chip", value: "A18" }, { label: "Tela", value: "6,7\" Super Retina XDR" }, { label: "Câmera", value: "48MP + 12MP Ultra Wide" }, { label: "Bateria", value: "Até 27h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }, { label: "Face ID", value: "Sim" }] },
  "iPhone 16 Pro": { sku: "IPHONE-16-PRO", price: 7999, category: "iPhone", condition: "new", description: "iPhone 16 Pro com chip A18 Pro, câmera de 48MP com zoom óptico 5x, tela de 6,3\" Always-On e corpo em titânio.", specs: [{ label: "Chip", value: "A18 Pro" }, { label: "Tela", value: "6,3\" Super Retina XDR ProMotion" }, { label: "Câmera", value: "48MP + 48MP Ultra Wide + 12MP Telephoto 5x" }, { label: "Bateria", value: "Até 27h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB / 1TB" }, { label: "Material", value: "Titânio" }] },
  "iPhone 16 Pro Max": { sku: "IPHONE-16-PRO-MAX", price: 9499, category: "iPhone", condition: "new", description: "iPhone 16 Pro Max com a maior tela de 6,9\", chip A18 Pro, câmera de 48MP com zoom 5x e a maior bateria de todos os iPhones.", specs: [{ label: "Chip", value: "A18 Pro" }, { label: "Tela", value: "6,9\" Super Retina XDR ProMotion" }, { label: "Câmera", value: "48MP + 48MP Ultra Wide + 12MP Telephoto 5x" }, { label: "Bateria", value: "Até 33h de vídeo" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB" }, { label: "Material", value: "Titânio" }] },
  "iPhone 15": { sku: "IPHONE-15", price: 4999, category: "iPhone", condition: "new", description: "iPhone 15 com chip A16 Bionic, câmera de 48MP, Dynamic Island e conector USB-C.", specs: [{ label: "Chip", value: "A16 Bionic" }, { label: "Tela", value: "6,1\" Super Retina XDR" }, { label: "Câmera", value: "48MP + 12MP" }, { label: "Bateria", value: "Até 20h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }, { label: "Face ID", value: "Sim" }] },
  "iPhone 15 Plus": { sku: "IPHONE-15-PLUS", price: 5999, category: "iPhone", condition: "new", description: "iPhone 15 Plus com tela de 6,7\", chip A16 Bionic e câmera de 48MP.", specs: [{ label: "Chip", value: "A16 Bionic" }, { label: "Tela", value: "6,7\" Super Retina XDR" }, { label: "Câmera", value: "48MP + 12MP" }, { label: "Bateria", value: "Até 26h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }, { label: "Face ID", value: "Sim" }] },
  "iPhone 15 Pro": { sku: "IPHONE-15-PRO", price: 6999, category: "iPhone", condition: "new", description: "iPhone 15 Pro com chip A17 Pro, corpo em titânio e câmera de 48MP com zoom óptico 3x.", specs: [{ label: "Chip", value: "A17 Pro" }, { label: "Tela", value: "6,1\" Super Retina XDR ProMotion" }, { label: "Câmera", value: "48MP + 12MP Ultra Wide + 12MP Telephoto 3x" }, { label: "Bateria", value: "Até 23h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB / 1TB" }, { label: "Material", value: "Titânio" }] },
  "iPhone 15 Pro Max": { sku: "IPHONE-15-PRO-MAX", price: 8499, category: "iPhone", condition: "new", description: "iPhone 15 Pro Max com chip A17 Pro, tela de 6,7\", corpo em titânio e câmera com zoom óptico 5x.", specs: [{ label: "Chip", value: "A17 Pro" }, { label: "Tela", value: "6,7\" Super Retina XDR ProMotion" }, { label: "Câmera", value: "48MP + 12MP Ultra Wide + 12MP Telephoto 5x" }, { label: "Bateria", value: "Até 29h de vídeo" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB" }, { label: "Material", value: "Titânio" }] },
  "iPhone 14": { sku: "IPHONE-14", price: 3999, category: "iPhone", condition: "new", description: "iPhone 14 com chip A15 Bionic, câmera dupla de 12MP e detecção de acidente.", specs: [{ label: "Chip", value: "A15 Bionic" }, { label: "Tela", value: "6,1\" Super Retina XDR" }, { label: "Câmera", value: "12MP + 12MP" }, { label: "Bateria", value: "Até 20h de vídeo" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB" }] },
  "iPhone SE (3ª geração)": { sku: "IPHONE-SE-3", price: 2999, category: "iPhone", condition: "new", description: "iPhone SE com chip A15 Bionic, Touch ID, tela de 4,7\" e câmera de 12MP.", specs: [{ label: "Chip", value: "A15 Bionic" }, { label: "Tela", value: "4,7\" Retina HD" }, { label: "Câmera", value: "12MP" }, { label: "Touch ID", value: "Sim" }, { label: "Armazenamento", value: "64GB / 128GB / 256GB" }] },
  // MacBooks
  "MacBook Air M4 13\"": { sku: "MBA-M4-13", price: 8999, category: "MacBook", condition: "new", description: "MacBook Air 13\" com chip M4, tela Liquid Retina, até 18h de bateria e design ultrafino.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "13,6\" Liquid Retina" }, { label: "Memória", value: "16GB / 24GB / 32GB" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Bateria", value: "Até 18h" }, { label: "Peso", value: "1,24 kg" }] },
  "MacBook Air M4 15\"": { sku: "MBA-M4-15", price: 10499, category: "MacBook", condition: "new", description: "MacBook Air 15\" com chip M4, tela Liquid Retina maior e sistema de áudio com 6 alto-falantes.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "15,3\" Liquid Retina" }, { label: "Memória", value: "16GB / 24GB / 32GB" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Bateria", value: "Até 18h" }, { label: "Peso", value: "1,51 kg" }] },
  "MacBook Air M3 13\"": { sku: "MBA-M3-13", price: 7499, category: "MacBook", condition: "new", description: "MacBook Air 13\" com chip M3, tela Liquid Retina e design fino em alumínio.", specs: [{ label: "Chip", value: "Apple M3" }, { label: "Tela", value: "13,6\" Liquid Retina" }, { label: "Memória", value: "8GB / 16GB / 24GB" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Bateria", value: "Até 18h" }, { label: "Peso", value: "1,24 kg" }] },
  "MacBook Pro M4 14\"": { sku: "MBP-M4-14", price: 11499, category: "MacBook", condition: "new", description: "MacBook Pro 14\" com chip M4, tela Liquid Retina XDR com ProMotion e até 24h de bateria.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "14,2\" Liquid Retina XDR" }, { label: "Memória", value: "16GB / 24GB / 32GB" }, { label: "Armazenamento", value: "512GB / 1TB / 2TB" }, { label: "Bateria", value: "Até 24h" }, { label: "Portas", value: "3x Thunderbolt 4, HDMI, MagSafe" }] },
  "MacBook Pro M4 Pro 16\"": { sku: "MBP-M4P-16", price: 18999, category: "MacBook", condition: "new", description: "MacBook Pro 16\" com chip M4 Pro, tela XDR de 16,2\" e desempenho profissional.", specs: [{ label: "Chip", value: "Apple M4 Pro" }, { label: "Tela", value: "16,2\" Liquid Retina XDR" }, { label: "Memória", value: "24GB / 48GB" }, { label: "Armazenamento", value: "512GB / 1TB / 2TB / 4TB" }, { label: "Bateria", value: "Até 24h" }, { label: "Portas", value: "3x Thunderbolt 5, HDMI, MagSafe, SD" }] },
  // iPads
  "iPad Pro M4 11\"": { sku: "IPADPRO-M4-11", price: 8999, category: "iPad", condition: "new", description: "iPad Pro 11\" com chip M4, tela Ultra Retina XDR tandem OLED e Apple Pencil Pro.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "11\" Ultra Retina XDR OLED" }, { label: "Câmera", value: "12MP Wide + 10MP Ultra Wide + LiDAR" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Face ID", value: "Sim" }, { label: "Apple Pencil", value: "Pro / USB-C" }] },
  "iPad Pro M4 13\"": { sku: "IPADPRO-M4-13", price: 11999, category: "iPad", condition: "new", description: "iPad Pro 13\" com chip M4 e tela Ultra Retina XDR tandem OLED.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "13\" Ultra Retina XDR OLED" }, { label: "Câmera", value: "12MP Wide + 10MP Ultra Wide + LiDAR" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Face ID", value: "Sim" }] },
  "iPad Air M3 11\"": { sku: "IPADAIR-M3-11", price: 5499, category: "iPad", condition: "new", description: "iPad Air 11\" com chip M3, tela Liquid Retina e suporte a Apple Pencil Pro.", specs: [{ label: "Chip", value: "Apple M3" }, { label: "Tela", value: "11\" Liquid Retina" }, { label: "Armazenamento", value: "128GB / 256GB / 512GB / 1TB" }, { label: "Touch ID", value: "Sim (botão superior)" }] },
  "iPad (10ª geração)": { sku: "IPAD-10", price: 3499, category: "iPad", condition: "new", description: "iPad 10ª geração com chip A14 Bionic, tela Liquid Retina de 10,9\" e USB-C.", specs: [{ label: "Chip", value: "A14 Bionic" }, { label: "Tela", value: "10,9\" Liquid Retina" }, { label: "Câmera", value: "12MP" }, { label: "Armazenamento", value: "64GB / 256GB" }, { label: "Touch ID", value: "Sim (botão superior)" }] },
  // Apple Watch
  "Apple Watch Series 10 42mm": { sku: "AW-S10-42", price: 3299, category: "Apple Watch", condition: "new", description: "Apple Watch Series 10 com a tela mais fina e leve, detecção de apneia do sono e carregamento rápido.", specs: [{ label: "Tamanho", value: "42mm" }, { label: "Tela", value: "Always-On LTPO3 OLED" }, { label: "Resistência", value: "50m água" }, { label: "Sensores", value: "SpO2, ECG, temperatura" }, { label: "Bateria", value: "Até 18h" }] },
  "Apple Watch Ultra 2": { sku: "AW-ULTRA2", price: 5799, category: "Apple Watch", condition: "new", description: "Apple Watch Ultra 2 com chip S9, GPS de dupla frequência, caixa de titânio e 36h de bateria.", specs: [{ label: "Chip", value: "S9 SiP" }, { label: "Tamanho", value: "49mm" }, { label: "Material", value: "Titânio" }, { label: "Resistência", value: "100m água / EN13319" }, { label: "Bateria", value: "Até 36h" }, { label: "GPS", value: "L1 + L5 dupla frequência" }] },
  // AirPods
  "AirPods 4": { sku: "AIRPODS-4", price: 999, category: "AirPods", condition: "new", description: "AirPods 4 com design aberto, áudio personalizado e chip H2.", specs: [{ label: "Chip", value: "H2" }, { label: "Áudio", value: "Áudio Espacial personalizado" }, { label: "Bateria", value: "Até 30h com estojo" }, { label: "Resistência", value: "IP54" }] },
  "AirPods 4 com ANC": { sku: "AIRPODS-4-ANC", price: 1499, category: "AirPods", condition: "new", description: "AirPods 4 com Cancelamento Ativo de Ruído, Modo Transparência e chip H2.", specs: [{ label: "Chip", value: "H2" }, { label: "ANC", value: "Cancelamento Ativo de Ruído" }, { label: "Modo", value: "Transparência Adaptativa" }, { label: "Bateria", value: "Até 30h com estojo" }, { label: "Resistência", value: "IP54" }] },
  "AirPods Pro 2 (USB-C)": { sku: "AIRPODS-PRO2", price: 1899, category: "AirPods", condition: "new", description: "AirPods Pro 2 com chip H2, cancelamento de ruído adaptativo, modo de conversa e USB-C.", specs: [{ label: "Chip", value: "H2" }, { label: "ANC", value: "Adaptativo" }, { label: "Áudio", value: "Espacial personalizado" }, { label: "Bateria", value: "Até 30h com estojo" }, { label: "Proteção auditiva", value: "Sim" }] },
  "AirPods Max (USB-C)": { sku: "AIRPODS-MAX", price: 4299, category: "AirPods", condition: "new", description: "AirPods Max com chip H2, ANC de alta fidelidade, Áudio Espacial e design em alumínio.", specs: [{ label: "Chip", value: "H2" }, { label: "ANC", value: "Alta Fidelidade" }, { label: "Áudio", value: "Espacial com rastreamento dinâmico" }, { label: "Bateria", value: "Até 20h" }, { label: "Material", value: "Alumínio anodizado + aço" }] },
  // Mac
  "Mac Mini M4": { sku: "MACMINI-M4", price: 4999, category: "Mac", condition: "new", description: "Mac Mini com chip M4, design compacto, até 32GB de memória e 3 portas Thunderbolt 4.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Memória", value: "16GB / 24GB / 32GB" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Portas", value: "3x Thunderbolt 4, 2x USB-C, HDMI, Ethernet" }] },
  "Mac Mini M4 Pro": { sku: "MACMINI-M4P", price: 10499, category: "Mac", condition: "new", description: "Mac Mini com chip M4 Pro, até 64GB de memória e 3 portas Thunderbolt 5.", specs: [{ label: "Chip", value: "Apple M4 Pro" }, { label: "Memória", value: "24GB / 48GB / 64GB" }, { label: "Armazenamento", value: "512GB / 1TB / 2TB / 4TB" }, { label: "Portas", value: "3x Thunderbolt 5, 2x USB-C, HDMI, Ethernet 10Gb" }] },
  "iMac M4 24\"": { sku: "IMAC-M4-24", price: 10499, category: "iMac", condition: "new", description: "iMac 24\" com chip M4, tela Retina 4.5K, câmera Center Stage de 12MP e design em 7 cores.", specs: [{ label: "Chip", value: "Apple M4" }, { label: "Tela", value: "24\" Retina 4.5K" }, { label: "Memória", value: "16GB / 24GB / 32GB" }, { label: "Armazenamento", value: "256GB / 512GB / 1TB / 2TB" }, { label: "Câmera", value: "12MP Center Stage" }] },
  // Acessórios
  "Apple Pencil Pro": { sku: "PENCIL-PRO", price: 999, category: "Acessórios", condition: "new", description: "Apple Pencil Pro com sensor de aperto, barril roll e feedback tátil. Compatível com iPad Pro e iPad Air.", specs: [{ label: "Sensor", value: "Aperto + Barril Roll" }, { label: "Feedback", value: "Tátil" }, { label: "Carregamento", value: "Magnético" }, { label: "Precisão", value: "Detecção de inclinação e pressão" }] },
  "AirTag": { sku: "AIRTAG-1", price: 249, category: "Acessórios", condition: "new", description: "AirTag para rastreamento de itens com a rede Buscar da Apple e Busca de Precisão com Ultra Wideband.", specs: [{ label: "Chip", value: "U1 Ultra Wideband" }, { label: "Bateria", value: "CR2032 (1 ano)" }, { label: "Resistência", value: "IP67" }, { label: "Rede", value: "Buscar da Apple" }] },
  "Magic Keyboard com Touch ID": { sku: "MAGIC-KB-TID", price: 1099, category: "Acessórios", condition: "new", description: "Magic Keyboard com Touch ID, layout em português, carregamento USB-C e design em alumínio.", specs: [{ label: "Touch ID", value: "Sim" }, { label: "Carregamento", value: "USB-C" }, { label: "Conexão", value: "Bluetooth / Lightning" }] },
};

// Mapeamento de família para nome de categoria
const familyCategoryMap = {
  "iPhone": "iPhone",
  "iPad": "iPad",
  "MacBook": "MacBook",
  "Mac": "Mac",
  "iMac": "Mac",
  "Apple Watch": "Apple Watch",
  "AirPods": "AirPods",
  "Apple TV": "Apple TV",
  "HomePod": "HomePod",
  "Acessórios": "Acessórios",
};

const appleProducts = {
  "iPhone": [
    "iPhone 16e",
    "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max",
    "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 13", "iPhone 13 Mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
    "iPhone SE (3ª geração)",
  ],
  "iPad": [
    "iPad Pro M4 11\"", "iPad Pro M4 13\"",
    "iPad Air M3 11\"", "iPad Air M3 13\"",
    "iPad (10ª geração)",
    "iPad Mini (A17 Pro)",
  ],
  "MacBook": [
    "MacBook Air M4 13\"", "MacBook Air M4 15\"",
    "MacBook Air M3 13\"", "MacBook Air M3 15\"",
    "MacBook Pro M4 14\"", "MacBook Pro M4 16\"",
    "MacBook Pro M4 Pro 14\"", "MacBook Pro M4 Pro 16\"",
    "MacBook Pro M4 Max 14\"", "MacBook Pro M4 Max 16\"",
  ],
  "iMac": [
    "iMac M4 24\"",
  ],
  "Mac": [
    "Mac Mini M4", "Mac Mini M4 Pro",
    "Mac Studio M4 Max", "Mac Studio M4 Ultra",
    "Mac Pro M2 Ultra",
  ],
  "Apple Watch": [
    "Apple Watch Series 10 42mm", "Apple Watch Series 10 46mm",
    "Apple Watch Ultra 2",
    "Apple Watch SE (2ª geração) 40mm", "Apple Watch SE (2ª geração) 44mm",
  ],
  "AirPods": [
    "AirPods 4", "AirPods 4 com ANC",
    "AirPods Pro 2 (USB-C)",
    "AirPods Max (USB-C)",
  ],
  "Apple TV": [
    "Apple TV 4K (Wi-Fi)", "Apple TV 4K (Wi-Fi + Ethernet)",
  ],
  "HomePod": [
    "HomePod (2ª geração)", "HomePod Mini",
  ],
  "Acessórios": [
    "Apple Pencil Pro", "Apple Pencil (USB-C)",
    "Magic Keyboard", "Magic Keyboard com Touch ID",
    "Magic Mouse", "Magic Trackpad",
    "AirTag", "AirTag (4 unidades)",
  ],
};

const allProducts = Object.values(appleProducts).flat();

function groupSuggestions(query) {
  const q = query.toLowerCase().trim();
  if (!q) return {};

  const groups = {};
  for (const [family, models] of Object.entries(appleProducts)) {
    const matches = models.filter(m => m.toLowerCase().includes(q));
    if (matches.length > 0) {
      groups[family] = matches;
    }
  }
  return groups;
}

export default function SmartProductSearch({ onProductData, categories = [] }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const grouped = groupSuggestions(query);
  const hasResults = Object.keys(grouped).length > 0;
  const totalResults = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchProductData = async (productName) => {
    setQuery(productName);
    setShowDropdown(false);
    setLoading(true);

    // Simula delay de "busca IA"
    await new Promise(r => setTimeout(r, 800));

    const dbEntry = productDatabase[productName];

    if (dbEntry) {
      // Tenta encontrar a categoria correspondente
      const categoryFamily = dbEntry.category;
      const matchedCategory = categories.find(c => {
        const cName = (c.name || c.nome || '').toLowerCase();
        const target = (familyCategoryMap[categoryFamily] || categoryFamily).toLowerCase();
        return cName.includes(target) || target.includes(cName);
      });

      const result = {
        product_id: dbEntry.sku,
        name: productName,
        sku: dbEntry.sku,
        price: dbEntry.price,
        category_id: matchedCategory?.id || matchedCategory?.category_id || '',
        condition: dbEntry.condition || 'new',
        description: dbEntry.description || '',
        specs: dbEntry.specs || [],
        tags: [],
      };

      setLoading(false);
      onProductData(result);
    } else {
      // Produto não encontrado no banco local — gera dados básicos
      const sku = productName.toUpperCase().replace(/[^A-Z0-9]/g, '-').replace(/-+/g, '-');
      const result = {
        product_id: sku,
        name: productName,
        sku: sku,
        condition: 'new',
        description: `${productName} — produto Apple original com garantia.`,
        specs: [],
        tags: [],
      };

      setLoading(false);
      onProductData(result);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main container */}
      <div className={`relative rounded-2xl transition-all duration-300 ${
        focused
          ? "bg-white dark:bg-[#2c2c2e] shadow-[0_0_0_1px_rgba(0,122,255,0.2),0_8px_40px_-12px_rgba(0,122,255,0.12)] dark:shadow-[0_0_0_1px_rgba(10,132,255,0.3),0_8px_40px_-12px_rgba(10,132,255,0.15)]"
          : "bg-white/70 dark:bg-[#2c2c2e]/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] border border-black/[0.04] dark:border-white/[0.06]"
      }`}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            focused
              ? "bg-[#007aff] shadow-lg shadow-[#007aff]/20"
              : "bg-gradient-to-br from-[#007aff]/10 to-violet-500/10"
          }`}>
            {focused ? (
              <Cpu className="w-[18px] h-[18px] text-white" strokeWidth={1.8} />
            ) : (
              <Sparkles className="w-[18px] h-[18px] text-[#007aff]" strokeWidth={1.8} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-[-0.01em]">Cadastro Inteligente</h2>
            <p className="text-[11px] text-[#86868b] dark:text-[#98989d] leading-tight">A IA preenche os dados automaticamente</p>
          </div>
          {loading && (
            <div className="flex items-center gap-1.5 bg-[#007aff]/[0.08] dark:bg-[#0a84ff]/[0.12] px-2.5 py-1 rounded-full">
              <Loader2 className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff] animate-spin" />
              <span className="text-[10px] font-medium text-[#007aff] dark:text-[#0a84ff]">Buscando</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="mx-5 h-px bg-black/[0.04] dark:bg-white/[0.06]" />

        {/* Input area */}
        <div className="relative px-3 py-3">
          <div className="relative flex items-center">
            <Search className={`absolute left-3 w-[18px] h-[18px] transition-colors duration-200 z-10 ${
              focused ? "text-[#007aff] dark:text-[#0a84ff]" : "text-[#c7c7cc] dark:text-[#636366]"
            }`} strokeWidth={2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => { setFocused(true); if (query.length > 0) setShowDropdown(true); }}
              placeholder="Buscar produto Apple..."
              disabled={loading}
              className={`w-full h-12 pl-10 pr-28 rounded-xl text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#c7c7cc] dark:placeholder:text-[#48484a] focus:outline-none transition-all disabled:opacity-50 ${
                focused
                  ? "bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/60"
                  : "bg-[#f5f5f7]/80 dark:bg-[#1c1c1e]/80"
              }`}
              onKeyDown={e => { if (e.key === "Enter" && query.trim()) fetchProductData(query.trim()); }}
            />
            <button
              onClick={() => query.trim() && fetchProductData(query.trim())}
              disabled={loading || !query.trim()}
              className="absolute right-1.5 h-9 px-4 bg-[#007aff] hover:bg-[#0071e3] dark:bg-[#0a84ff] dark:hover:bg-[#409cff] text-white rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  Preencher
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="mx-5 mb-3">
            <div className="h-1 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#007aff] to-violet-500 rounded-full animate-pulse" style={{ width: "65%" }} />
            </div>
            <p className="text-[11px] text-[#86868b] dark:text-[#98989d] mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff]" />
              Buscando especificações, preços e detalhes...
            </p>
          </div>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && !loading && query.trim().length > 0 && hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] z-50 max-h-[320px] overflow-y-auto styled-scrollbar">
          {/* Results count */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#b0b0b5] dark:text-[#636366]">{totalResults} modelo{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}</span>
          </div>

          {Object.entries(grouped).map(([family, models]) => (
            <div key={family}>
              <div className="px-4 pt-2 pb-1 flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#86868b] dark:text-[#98989d] uppercase tracking-widest">{family}</span>
                <div className="flex-1 h-px bg-black/[0.03] dark:bg-white/[0.04]" />
                <span className="text-[9px] text-[#c7c7cc] dark:text-[#48484a] tabular-nums">{models.length}</span>
              </div>
              {models.map((model) => {
                const idx = model.toLowerCase().indexOf(query.toLowerCase().trim());
                const before = model.slice(0, idx);
                const match = model.slice(idx, idx + query.trim().length);
                const after = model.slice(idx + query.trim().length);

                return (
                  <button
                    key={model}
                    onClick={() => fetchProductData(model)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#6e6e73] dark:text-[#98989d] hover:bg-[#007aff]/[0.06] dark:hover:bg-[#0a84ff]/[0.08] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors flex items-center gap-2.5 group"
                  >
                    <span className="w-6 h-6 bg-[#f5f5f7] dark:bg-[#3a3a3c] group-hover:bg-[#007aff]/10 dark:group-hover:bg-[#0a84ff]/15 rounded-md flex items-center justify-center flex-shrink-0 transition-colors">
                      <Sparkles className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff]" />
                    </span>
                    <span className="flex-1 truncate">
                      {idx >= 0 ? (
                        <>{before}<span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold">{match}</span>{after}</>
                      ) : model}
                    </span>
                    <ChevronRight className="w-3 h-3 text-[#d2d2d7] dark:text-[#48484a] group-hover:text-[#007aff] dark:group-hover:text-[#0a84ff] flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && !loading && query.trim().length > 0 && !hasResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] z-50">
          <div className="px-5 py-5 text-center space-y-2">
            <div className="w-10 h-10 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded-xl flex items-center justify-center mx-auto">
              <Search className="w-4 h-4 text-[#c7c7cc] dark:text-[#636366]" />
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d]">Nenhum modelo encontrado</p>
            <p className="text-[11px] text-[#c7c7cc] dark:text-[#636366]">
              Pressione <kbd className="px-1.5 py-0.5 bg-[#f5f5f7] dark:bg-[#3a3a3c] rounded text-[10px] font-medium text-[#86868b] dark:text-[#98989d] border border-black/[0.04] dark:border-white/[0.06]">Enter</kbd> para buscar com IA
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
