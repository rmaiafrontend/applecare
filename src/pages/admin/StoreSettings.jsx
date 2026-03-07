import React, { useState } from "react";
import { Palette, Wallet } from "lucide-react";
import StoreSettingsTab from "@/components/settings/StoreSettingsTab";
import PaymentSettingsTab from "@/components/settings/PaymentSettingsTab";

const TABS = [
  { key: "theme", label: "Tema da Loja", icon: Palette },
  { key: "payment", label: "Pagamentos", icon: Wallet },
];

export default function StoreSettings() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get("tab") || "theme";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 bg-black/[0.03] p-1 rounded-2xl w-fit">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.8} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === "theme" && <StoreSettingsTab />}
      {activeTab === "payment" && <PaymentSettingsTab />}
    </div>
  );
}