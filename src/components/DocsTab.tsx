/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { specSections, SpecSection } from "../documentationData";
import { 
  BookOpen, 
  Layers, 
  Database, 
  LayoutList, 
  Workflow, 
  Paintbrush, 
  ShieldAlert, 
  Cpu, 
  Search, 
  ChevronRight, 
  Copy, 
  Check, 
  PlayCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Simple, beautiful customized parser for technical specs
const SpecContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeLines: string[] = [];

  return (
    <div className="space-y-4 text-zinc-300 leading-relaxed font-sans text-sm md:text-base">
      {lines.map((line, idx) => {
        // Code Block handler
        if (line.startsWith("```")) {
          if (inCodeBlock) {
            inCodeBlock = false;
            const currentCode = codeLines.join("\n");
            codeLines = [];
            return (
              <div key={idx} className="relative group my-3">
                <div className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Schema / Arq
                </div>
                <pre className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto text-zinc-300 font-mono text-xs leading-5">
                  <code>{currentCode}</code>
                </pre>
              </div>
            );
          } else {
            inCodeBlock = true;
            return null;
          }
        }

        if (inCodeBlock) {
          codeLines.push(line);
          return null;
        }

        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={idx} className="text-white font-semibold text-lg pt-4 pb-1 border-b border-[#222225] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FFD43B] rounded-full"></span>
              {line.replace("### ", "")}
            </h4>
          );
        }

        // Subheaders or important accents
        if (line.startsWith("## ")) {
          return (
            <h3 key={idx} className="text-white font-display font-medium text-xl pt-6 pb-2">
              {line.replace("## ", "")}
            </h3>
          );
        }

        // Table parser
        if (line.startsWith("| ") && line.endsWith(" |")) {
          // If it's the header separator line, skip
          if (line.includes("---")) return null;
          const columns = line.split("|").slice(1, -1).map(c => c.trim());
          
          // Detect if it is the header line
          const isHeader = idx > 0 && lines[idx - 1] === ""; // Simplistic check or check first row
          const isFirstInTable = !lines[idx - 1]?.startsWith("| ");
          
          return (
            <div key={idx} className="overflow-x-auto">
              <table className="min-w-full border-collapse my-2">
                <tbody>
                  <tr className={`${isFirstInTable ? "bg-[#1C1C1F] font-semibold text-white border-b border-[#222225]" : "bg-[#151518] border-b border-zinc-800/60 hover:bg-[#1E1E22] text-zinc-300"} transition-colors`}>
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="p-3 text-xs md:text-sm border border-[#222225]">
                        {col.startsWith("**") && col.endsWith("**") ? (
                          <strong className="text-white">{col.replaceAll("**", "")}</strong>
                        ) : col}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }

        // Lists
        if (line.startsWith("* ")) {
          const text = line.replace("* ", "");
          const isBoldStart = text.includes("**");
          let renderText: React.ReactNode = text;

          if (isBoldStart) {
            const parts = text.split("**");
            if (parts.length >= 3) {
              renderText = (
                <span>
                  <strong className="text-white">{parts[1]}</strong>
                  {parts.slice(2).join("")}
                </span>
              );
            }
          }

          return (
            <li key={idx} className="pl-5 relative list-none text-[#A3A198] my-1">
              <span className="absolute left-1 top-2 w-1.5 h-1.5 bg-[#FFD43B] rounded-full"></span>
              {renderText}
            </li>
          );
        }

        // Bold lists or numbered lists
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^\d+/)![0];
          const text = line.replace(/^\d+\.\s/, "");
          const isBoldStart = text.includes("**");
          let renderText: React.ReactNode = text;

          if (isBoldStart) {
            const parts = text.split("**");
            if (parts.length >= 3) {
              renderText = (
                <span>
                  <strong className="text-white">{parts[1]}</strong>
                  {parts.slice(2).join("")}
                </span>
              );
            }
          }

          return (
            <div key={idx} className="flex gap-2 items-start my-2 text-[#A3A198] pl-2">
              <span className="font-mono text-white font-semibold bg-[#FFD43B]/10 border border-[#222225] rounded px-1.5 text-xs py-0.5 mt-0.5">{num}</span>
              <p className="flex-1 mt-0.5">{renderText}</p>
            </div>
          );
        }

        // Blank lines
        if (line.trim() === "") {
          return <div key={idx} className="h-2"></div>;
        }

        // Normal text checking for bold fragments
        let normalRender: React.ReactNode = line;
        if (line.includes("**")) {
          const parts = line.split("**");
          normalRender = parts.map((part, pIdx) => {
            return pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part;
          });
        }

        return <p key={idx} className="leading-relaxed">{normalRender}</p>;
      })}
    </div>
  );
};

export const DocsTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  const categories = [
    { id: "all", label: "Visão Geral", icon: <BookOpen className="w-4 h-4" /> },
    { id: "arquitetura", label: "Arquitetura Conceitual", icon: <Layers className="w-4 h-4" /> },
    { id: "dados", label: "Estrutura de Dados", icon: <Database className="w-4 h-4" /> },
    { id: "features", label: "Roadmap e Matriz", icon: <LayoutList className="w-4 h-4" /> },
    { id: "fluxos", label: "Fluxos de Interação", icon: <Workflow className="w-4 h-4" /> },
    { id: "design", label: "Diretrizes UI/UX", icon: <Paintbrush className="w-4 h-4" /> },
    { id: "seguranca", label: "Estratégia de Links Link-Agility", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "tech", label: "Stack de Infraestrutura", icon: <Cpu className="w-4 h-4" /> },
  ];

  const handleCopySpec = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = specSections.filter((section) => {
    const matchesCategory = activeCategory === "all" || section.category === activeCategory;
    const matchesSearch = 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.markdown.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const interactiveFlows = [
    {
      title: "Flow de Cadastro de Decisão (sunflower)",
      steps: [
        { label: "1. Inicialização", desc: "O designer seleciona o contexto, dá um título humilde e transparente à decisão estratégica." },
        { label: "2. Seleção Metodológica", desc: "Associa o log a uma metodologia visual como Double Diamond ou Design Thinking para dar trilha de raciocínio estruturado." },
        { label: "3. Alternativas & Escolhas", desc: "Lista até 3 opções avaliadas na etapa e explica detalhadamente os critérios que levaram à escolha vitoriosa." },
        { label: "4. Ancoragem de Links", desc: "Insere links com protocolo HTTPS para Behance ou Figma, gerando um beacon de informação limpo, sem carregar arquivos." },
        { label: "5. Disseminação Ativa", desc: "Dispara para o repositório geral do time ou painel de descoberta pública da comunidade." }
      ]
    },
    {
      title: "Flow de Integração & Referência de Links Remotos",
      steps: [
        { label: "1. Fornecer URL externa", desc: "O designer cola o link direto de seu portfólio no Behance ou do arquivo no Figma." },
        { label: "2. Higienização de Protocolo", desc: "A camada sunflower valida sintaticamente a URL de destino (HTTPS obrigatório!)." },
        { label: "3. Identificação Gráfica", desc: "O template determina a origem (ex: Behance, Figma) e carrega o badge visual correto." },
        { label: "4. Escopo Zero-Storage", desc: "Os metadados originais permanecem na plataforma parceira. sunflower serve apenas como ponte de navegação ativa." }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-[#151518] rounded-xl border border-[#222225] p-4 shadow-sm">
          <h3 className="font-display font-medium text-xs text-[#7C7A72] uppercase tracking-wider mb-3 px-2">
            Navegação da Especificação
          </h3>
          
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchTerm("");
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs md:text-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#FFD43B] text-black font-semibold shadow-xs border border-[#222225]"
                    : "text-[#A3A198] hover:text-[#F4F4F6] hover:bg-[#1E1E22]"
                }`}
              >
                <div id={`cat-btn-${cat.id}`} className="flex items-center gap-2.5">
                  {cat.icon}
                  <span>{cat.label}</span>
                </div>
                {activeCategory === cat.id && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Flow Simulator Widget */}
        <div className="bg-[#1A1A1A] text-white rounded-xl p-5 shadow-md border border-[#E5E3D8]/30 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2 rounded bg-[#FFD43B] text-black font-mono text-[10px] tracking-wider uppercase font-bold">
              Fluxo Ativo
            </div>
            <h4 className="font-display font-medium text-xs text-white">Simulador de Processos</h4>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-zinc-400">
              Visualize na prática as etapas lógicas que a plataforma orquestra para apoiar o design:
            </p>

            <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-950/50">
              <div className="text-[11px] font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                <PlayCircle className="w-3 h-3" />
                {interactiveFlows[0].title}
              </div>

              <div className="space-y-2">
                {interactiveFlows[0].steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveFlowStep(idx)}
                    className={`p-2 rounded cursor-pointer transition-all ${
                      activeFlowStep === idx
                        ? "bg-zinc-800 border-l-2 border-[#FFD43B]"
                        : "hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="font-medium text-xs text-zinc-200 flex items-center justify-between">
                      <span>{step.label}</span>
                      {activeFlowStep === idx && (
                        <span className="text-[9px] bg-[#FFD43B]/20 text-[#FFD43B] px-1 py-0.2 rounded font-mono font-bold">
                          Lido
                        </span>
                      )}
                    </div>
                    {activeFlowStep === idx && (
                      <p className="text-[11px] text-zinc-400 mt-1 animate-fade-in">
                        {step.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spec Output Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Search tool */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7A72]" />
          <input
            id="spec-search"
            type="text"
            placeholder="Pesquisar conceitos, arquitetura de dados ou fluxos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#151518] border border-[#222225] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white font-sans focus:outline-none focus:border-[#FFD43B] focus:ring-1 focus:ring-[#FFD43B] transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-850 rounded-full px-2 py-0.5"
            >
              limpar
            </button>
          )}
        </div>

        {/* List of documentation sections */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  key={section.id}
                  className="bg-[#151518] rounded-xl border border-[#222225] p-6 md:p-8 shadow-sm space-y-4 hover:border-[#FFD43B] transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#222225] pb-4 gap-4">
                    <div>
                      <h2 className="font-display font-bold text-lg md:text-xl text-white">
                        {section.title}
                      </h2>
                      <p className="text-xs text-[#A3A198] md:text-sm mt-0.5 font-sans">
                        {section.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center">
                      <span className="px-2.5 py-1 bg-[#0E0E10] border border-[#222225] text-[#A3A198] text-[10px] uppercase font-mono tracking-wider rounded-full font-bold">
                        {section.category}
                      </span>
                      <button
                        id={`copy-btn-${section.id}`}
                        onClick={() => handleCopySpec(section.id, section.markdown)}
                        className="p-2 text-[#A3A198] hover:text-white hover:bg-[#0E0E10] rounded-lg border border-[#222225] active:scale-95 transition-all cursor-pointer"
                        title="Copiar Especificações em markdown"
                      >
                        {copiedId === section.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <SpecContentRenderer content={section.markdown} />
                </motion.div>
              ))
            ) : (
              <div className="bg-[#151518] rounded-3xl border border-[#222225] p-12 text-center text-zinc-500 space-y-2">
                <p className="font-semibold text-white">Nenhum resultado para "{searchTerm}"</p>
                <p className="text-sm text-zinc-400">Tente ajustar seus termos ou clique nas abas laterais para redefinir.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
