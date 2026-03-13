import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StoreConfig } from "@/api/dataService";
import { Save, Loader2, Check, Link2, Image, Award, Sparkles, FolderOpen, LayoutGrid, ScrollText, Info, ShoppingBag } from "lucide-react";

import SectionWrapper from "@/components/home-settings/SectionWrapper";
import HeaderLinktreeSection from "@/components/home-settings/HeaderLinktreeSection";

import HeroBannerSection from "@/components/home-settings/HeroBannerSection";
import DifferentialsSection from "@/components/home-settings/DifferentialsSection";
import AIButtonSection from "@/components/home-settings/AIButtonSection";
import CategoriesSection from "@/components/home-settings/CategoriesSection";
import SecondaryBannerSection from "@/components/home-settings/SecondaryBannerSection";
import CarouselsSection from "@/components/home-settings/CarouselsSection";
import InfoCardSection from "@/components/home-settings/InfoCardSection";
import ProductListSection from "@/components/home-settings/ProductListSection";
import HomePreview from "@/components/home-settings/HomePreview";
import { QUERY_KEYS } from '@/lib/constants';

const DEFAULT_CONFIG = {
  config_key: "home_layout",
  header_store_name: "",
  header_tagline: "",
  header_logo_url: "",
  header_hours: { mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "" },
  header_quick_links: [],
  header_whatsapp: "",
  header_instagram: "",
  header_tiktok: "",
  header_youtube: "",
  header_facebook: "",
  identity_logo_url: "",
  identity_primary_color: "#1A1A1A",
  identity_accent_color: "#FF6B35",
  identity_slug: "",
  hero_image_url: "",
  hero_title: "",
  hero_subtitle: "",
  hero_cta_text: "",
  hero_cta_link: "",
  hero_badge_text: "",
  hero_badge_active: true,
  hero_badge_animated: true,
  differentials_active: true,
  differentials_items: [],
  ai_button_active: true,
  ai_button_title: "",
  ai_button_subtitle: "",
  ai_button_cta_text: "",
  ai_button_gradient_from: "#6366f1",
  ai_button_gradient_to: "#a855f7",
  categories_active: true,
  categories_title: "Categorias",
  categories_layout: "carousel",
  secondary_banner_active: true,
  secondary_banner_title: "",
  secondary_banner_product_ids: [],
  carousels: [],
  info_card_active: false,
  info_card_emoji: "",
  info_card_title: "",
  info_card_description: "",
  info_card_cta_text: "",
  info_card_cta_link: "",
  info_card_bg_color: "#f5f5f7",
  product_list_title: "Novidades",
  product_list_template: "launches",
  product_list_max_items: 6,
  product_list_curated_ids: [],
  product_list_show_cta: true,
  product_list_cta_text: "Ver todos",
  sections_order: [],
};

const SECTIONS = [
  { key: "header", number: "01", icon: Link2, title: "Header Linktree", subtitle: "Identidade, links, horários e contatos", color: "#007aff", fixed: true },
  { key: "hero", number: "02", icon: Image, title: "Banner Principal", subtitle: "Hero com imagem, título e CTA", color: "#ff9500", fixed: true },
  { key: "differentials", number: "03", icon: Award, title: "Diferenciais", subtitle: "Pills horizontais com ícone e texto", color: "#30d158", toggleField: "differentials_active" },
  { key: "ai_button", number: "04", icon: Sparkles, title: "Botão de IA", subtitle: "Banner de acesso à busca inteligente", color: "#6366f1", toggleField: "ai_button_active" },
  { key: "categories", number: "05", icon: FolderOpen, title: "Categorias", subtitle: "Grid ou carrossel de categorias", color: "#007aff", toggleField: "categories_active" },
  { key: "secondary_banner", number: "06", icon: LayoutGrid, title: "Banner Secundário", subtitle: "Grid de até 4 produtos em destaque", color: "#ff3b30", toggleField: "secondary_banner_active" },
  { key: "carousels", number: "07", icon: ScrollText, title: "Carrosseis", subtitle: "Scroll horizontal por tag ou categoria", color: "#ff9500" },
  { key: "info_card", number: "08", icon: Info, title: "Card de Informação", subtitle: "Bloco informativo com ícone e CTA", color: "#34c759", toggleField: "info_card_active" },
  { key: "product_list", number: "09", icon: ShoppingBag, title: "Lista de Produtos", subtitle: "Grid final: Lançamentos, Ofertas ou Curadoria", color: "#1d1d1f", fixed: true },
];

export default function HomeSettings() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(DEFAULT_CONFIG);
  const [configId, setConfigId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const { data: configs = [] } = useQuery({
    queryKey: QUERY_KEYS.homeConfig,
    queryFn: () => StoreConfig.list(),
  });

  useEffect(() => {
    if (configs.length > 0) {
      const c = configs[0];
      setConfigId(c.id);
      setForm(prev => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(c).filter(([k, v]) => v != null && k !== "id" && k !== "created_date" && k !== "updated_date" && k !== "created_by")
        ),
      }));
    }
  }, [configs]);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    if (configId) {
      await StoreConfig.update(configId, form);
    } else {
      await StoreConfig.create(form);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.homeConfig });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSectionContent = (key) => {
    const props = { form, updateField };
    switch (key) {
      case "header": return <HeaderLinktreeSection {...props} />;

      case "hero": return <HeroBannerSection {...props} />;
      case "differentials": return <DifferentialsSection {...props} />;
      case "ai_button": return <AIButtonSection {...props} />;
      case "categories": return <CategoriesSection {...props} />;
      case "secondary_banner": return <SecondaryBannerSection {...props} />;
      case "carousels": return <CarouselsSection {...props} />;
      case "info_card": return <InfoCardSection {...props} />;
      case "product_list": return <ProductListSection {...props} />;
      default: return null;
    }
  };

  return (
    <div className="flex gap-8 items-start max-w-[1400px] mx-auto">
      {/* Left: Settings */}
      <div className="flex-1 min-w-0 max-w-[680px]">
        {/* Save bar */}
        <div className="sticky top-0 z-30 bg-[#f0f1f3]/70 dark:bg-[#1c1c1e]/70 backdrop-blur-2xl py-4 -mx-1 px-1 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Save className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[17px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">Layout da Home</h2>
                  <p className="text-[11px] text-black/30 dark:text-white/30 mt-0.5">Configure cada seção do catálogo público</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`h-11 px-7 rounded-2xl text-[13px] font-semibold flex items-center gap-2.5 transition-all duration-300 disabled:opacity-70 ${
                saved
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-[#1d1d1f] dark:bg-[#0a84ff] hover:bg-black dark:hover:bg-[#409cff] text-white shadow-lg shadow-black/10 dark:shadow-[#0a84ff]/20 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
               : saved ? <><Check className="w-4 h-4" /> Salvo!</>
               : <><Save className="w-4 h-4" strokeWidth={1.8} /> Publicar</>}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {SECTIONS.map((section, index) => (
            <SectionWrapper
              key={section.key}
              number={section.number}
              icon={section.icon}
              title={section.title}
              subtitle={section.subtitle}
              color={section.color}
              fixed={section.fixed}
              hasToggle={!!section.toggleField}
              isActive={section.toggleField ? form[section.toggleField] !== false : true}
              onToggleActive={section.toggleField ? (v) => updateField(section.toggleField, v) : undefined}
              isOpen={!!openSections[section.key]}
              onToggleOpen={() => toggleSection(section.key)}
            >
              {renderSectionContent(section.key)}
            </SectionWrapper>
          ))}
        </div>

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>

      {/* Right: Live Preview (hidden on small screens) */}
      <div className="hidden xl:block w-[330px] flex-shrink-0">
        <HomePreview form={form} />
      </div>
    </div>
  );
}
