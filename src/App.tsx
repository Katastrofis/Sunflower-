/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { DocsTab } from "./components/DocsTab";
import { DashboardTab } from "./components/DashboardTab";
import { BookOpen, MonitorPlay, Sun, ShieldAlert, Award } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"docs" | "sandbox">("docs");

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#F4F4F6] flex flex-col font-sans selection:bg-[#FFD43B]/30 selection:text-black border-t-4 border-[#FFD43B]">
      
      {/* Premium Header Layout with Bento Theme subtle accent colors */}
      <header className="bg-[#151518] border-b border-[#222225] sticky top-0 z-40 shadow-xs px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Platform Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFD43B] rounded-full flex items-center justify-center shadow-xs">
              <div className="w-4 h-4 border-2 border-black rounded-sm rotate-45 bg-[#FFD43B]"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-lg md:text-xl text-white tracking-tight uppercase">
                  sunflower
                </h1>
                <span className="px-2 py-0.5 bg-[#FFD43B]/10 border border-[#222225] text-[#FFD43B] text-[9px] font-mono font-bold rounded-full uppercase tracking-wider">
                  Bento Grid Theme
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-[#A3A198]">
                Plataforma colaborativa para decisões criativas de design e fluxos estruturados.
              </p>
            </div>
          </div>

          {/* Tab Selection Switch styled as classic Bento controls */}
          <div className="flex bg-[#0E0E10] p-1 rounded-xl border border-[#222225] no-print">
            <button
              id="tab-btn-docs"
              onClick={() => setActiveTab("docs")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "docs"
                  ? "bg-[#FFD43B] text-black shadow-sm font-semibold border border-[#222225]"
                  : "text-[#A3A198] hover:text-[#F4F4F6]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Especificação Técnica</span>
            </button>

            <button
              id="tab-btn-sandbox"
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                activeTab === "sandbox"
                  ? "bg-[#FFD43B] text-black shadow-sm font-semibold border border-[#222225]"
                  : "text-[#A3A198] hover:text-[#F4F4F6]"
              }`}
            >
              <MonitorPlay className="w-4 h-4" />
              <span>Protótipo Simulado</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {/* Anti-AI Slop Warning / Transparency callout using Bento accent theme */}
        <section className="bg-[#151518] border border-[#222225] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start gap-4 shadow-sm no-print">
          <div className="p-2.5 bg-[#FFD43B]/10 rounded-xl text-black block shrink-0 border border-[#222225]">
            <ShieldAlert className="w-5 h-5 text-[#FFD43B]" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="font-display font-semibold text-xs md:text-sm text-[#F4F4F6] uppercase tracking-wider flex items-center gap-1.5">
              Hub Coordenador sunflower • Zero Storage Policy
            </h4>
            <p className="text-[#A3A198] text-xs md:text-xs leading-relaxed max-w-5xl">
              De acordo com a arquitetura descrita nas especificações Bento, a sunflower **não atua como repositório de arquivos de imagem ou portfólio**. Operamos como um hub abstrato leve de metadados focados na jornada conceitual. Links diretos seguros de Figma/Behance mantêm a privacidade original.
            </p>
          </div>
        </section>

        {/* Dynamic View Injection */}
        <div className="py-2">
          {activeTab === "docs" ? <DocsTab /> : <DashboardTab />}
        </div>

      </main>

      {/* Beautiful Swiss Modern Footer with Bento accents */}
      <footer className="bg-[#151518] border-t border-[#222225] py-8 px-4 text-center text-[#7C7A72] text-xs mt-12 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#FFD43B]" />
            <span className="font-display font-semibold text-[#F4F4F6] tracking-wider uppercase text-xs">sunflower Architecture</span>
          </div>
          <p className="text-[11px] text-[#A3A198]">
            © 2026 sunflower Collaborative Architecture • Traffic: Encrypted P2P Hub
          </p>
          <div className="text-[10px] font-mono text-[#F4F4F6] bg-[#0E0E10] border border-[#222225] rounded px-2.5 py-1 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#FFD43B]" /> Status: Syncing Nodes
          </div>
        </div>
      </footer>

    </div>
  );
}
