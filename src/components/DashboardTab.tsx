/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  DecisionLog, 
  Team, 
  MethodologyType, 
  ExternalLink, 
  Comment 
} from "../types";
import { initialDecisions, initialTeams } from "../mockData";
import { 
  Plus, 
  Heart, 
  MessageSquare, 
  FileText, 
  ExternalLink as LinkIcon, 
  Users, 
  Filter, 
  BookmarkCheck, 
  Trash, 
  UserPlus, 
  ArrowRight,
  Award
} from "lucide-react";

export const DashboardTab: React.FC = () => {
  // Application states
  const [decisions, setDecisions] = useState<DecisionLog[]>(initialDecisions);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedMethodology, setSelectedMethodology] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string>("all");

  // Interactive UI modals/toggles
  const [isAddingDecision, setIsAddingDecision] = useState<boolean>(false);
  const [selectedDecisionForComments, setSelectedDecisionForComments] = useState<string | null>(null);
  const [activeReportProject, setActiveReportProject] = useState<string | null>(null);

  // Form states for NEW DECISION
  const [newTitle, setNewTitle] = useState<string>("");
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newMethodology, setNewMethodology] = useState<MethodologyType>(MethodologyType.DOUBLE_DIAMOND);
  const [newStage, setNewStage] = useState<string>("");
  const [newContext, setNewContext] = useState<string>("");
  const [newChoices, setNewChoices] = useState<string[]>(["", ""]);
  const [newFinalDecision, setNewFinalDecision] = useState<string>("");
  const [newImpact, setNewImpact] = useState<"baixo" | "médio" | "alto">("médio");
  const [addedLinks, setAddedLinks] = useState<ExternalLink[]>([]);

  // Team Invite states
  const [selectedTeamForInvite, setSelectedTeamForInvite] = useState<string>(initialTeams[0].id);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteName, setInviteName] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<string>("UI Designer");

  // New Comment state
  const [commentContent, setCommentContent] = useState<string>("");
  const [commenterName, setCommenterName] = useState<string>("Designer Convidado");

  // Extract unique projects list for filtering
  const projectNames = Array.from(new Set(decisions.map(d => d.projectName)));

  // Methodology stages lists relative to selection
  const stagesForMethodology = {
    [MethodologyType.DOUBLE_DIAMOND]: ["Descoberta (Discover / Diverge)", "Definição (Define / Converge)", "Desenvolvimento (Develop / Diverge)", "Entrega (Deliver / Converge)"],
    [MethodologyType.DESIGN_THINKING]: ["Empatia (Empathize)", "Definição (Define)", "Ideação (Ideate)", "Prototipação (Prototype)", "Teste (Test)"],
    [MethodologyType.LEAN_UX]: ["Pressupostos (Assumptions)", "Criação de MVP (Build MVP)", "Medição e Aprendizado", "Refinamento"],
    [MethodologyType.CUSTOM]: ["Análise Preliminar", "Fase Criativa", "Validação Visual", "Decisões de Engenharia"]
  };

  // Safe HTTP validator
  const isValidHttpsUrl = (url: string) => {
    return url.startsWith("https://") || url.startsWith("http://");
  };

  // Create Decision Log handler
  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProjectName.trim() || !newContext.trim() || !newFinalDecision.trim()) {
      alert("Por favor, preencha todos os campos fundamentais das decisões estratégicas.");
      return;
    }

    const compiledLog: DecisionLog = {
      id: `dec-${Date.now()}`,
      title: newTitle,
      projectName: newProjectName,
      methodology: newMethodology,
      stage: newStage || stagesForMethodology[newMethodology][0],
      context: newContext,
      choices: newChoices.filter(c => c.trim() !== ""),
      finalDecision: newFinalDecision,
      impact: newImpact,
      author: "Designer Autor (Você)",
      authorRole: "Estrategista Criativo",
      likes: 0,
      likedByUser: false,
      comments: [],
      externalLinks: addedLinks,
      createdAt: new Date().toISOString()
    };

    setDecisions([compiledLog, ...decisions]);
    
    // Reset Form
    setNewTitle("");
    setNewProjectName("");
    setNewStage("");
    setNewContext("");
    setNewChoices(["", ""]);
    setNewFinalDecision("");
    setNewImpact("médio");
    setAddedLinks([]);
    setIsAddingDecision(false);
  };

  // Comments poster helper
  const handlePostComment = (decisionId: string) => {
    if (!commentContent.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      authorName: commenterName || "Designer Anônimo",
      authorRole: "Comunidade Sunflower",
      content: commentContent,
      createdAt: new Date().toISOString()
    };

    setDecisions(decisions.map(dec => {
      if (dec.id === decisionId) {
        return {
          ...dec,
          comments: [...dec.comments, newComment]
        };
      }
      return dec;
    }));

    setCommentContent("");
  };

  // Like / Hipar trigger
  const handleLikeToggle = (id: string) => {
    setDecisions(decisions.map(dec => {
      if (dec.id === id) {
        return {
          ...dec,
          likes: dec.likedByUser ? dec.likes - 1 : dec.likes + 1,
          likedByUser: !dec.likedByUser
        };
      }
      return dec;
    }));
  };

  // Member invitation simulator (Zero static overhead)
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) {
      alert("Por favor, providencie os dados corretos de nome e e-mail.");
      return;
    }

    setTeams(teams.map(team => {
      if (team.id === selectedTeamForInvite) {
        return {
          ...team,
          members: [
            ...team.members,
            {
              id: `m-added-${Date.now()}`,
              name: inviteName,
              role: inviteRole,
              email: inviteEmail
            }
          ]
        };
      }
      return team;
    }));

    setInviteEmail("");
    setInviteName("");
    alert(`Sucesso! Convite dinâmico para a Sunflower enviado para ${inviteEmail}.`);
  };

  // Web service link staging simulation
  const removeAddedLink = (id: string) => {
    setAddedLinks(addedLinks.filter(l => l.id !== id));
  };

  // Filter logs logic
  const filteredDecisions = decisions.filter(dec => {
    const matchesMethodology = selectedMethodology === "all" || dec.methodology === selectedMethodology;
    const matchesProject = selectedProject === "all" || dec.projectName === selectedProject;
    return matchesMethodology && matchesProject;
  });

  // Export report to print viewport
  const compileReportData = (projectName: string) => {
    return decisions.filter(dec => dec.projectName === projectName);
  };

  // Icon selector helper
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "figma":
        return <span className="text-pink-600 bg-pink-50 border border-pink-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">Figma</span>;
      case "behance":
        return <span className="text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">Behance</span>;
      case "github":
        return <span className="text-zinc-950 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">GitHub</span>;
      case "linkedin":
        return <span className="text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">LinkedIn</span>;
      case "instagram":
        return <span className="text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">Instagram</span>;
      default:
        return <span className="text-zinc-500 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded font-mono text-[10px] inline-flex items-center gap-1 font-semibold">Site</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Control Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#151518] p-5 rounded-xl border border-[#222225] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD43B] rounded-full animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#A3A198] font-bold">Ambiente Piloto</span>
          </div>
          <h2 className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-tight">Histórico de Decisões do Designer</h2>
          <p className="text-[#A3A198] text-xs md:text-sm">Consolide, comente e conecte suas referências de UI/UX em tempo real.</p>
        </div>

        <button
          id="btn-new-decision"
          onClick={() => setIsAddingDecision(true)}
          className="flex items-center justify-center gap-1.5 bg-[#FFD43B] text-black font-semibold px-5 py-3 rounded-xl hover:bg-[#ebd039] transition-all border border-[#222225] shadow-sm active:scale-95 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 text-black stroke-[3px]" />
          Registrar Decisão Estratégica
        </button>
      </div>

      {/* 2. Top-level quick data views & Filter bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Statistics or Filters */}
        <div className="md:col-span-2 bg-[#151518] rounded-xl border border-[#222225] p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-display font-semibold text-xs uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#FFD43B]" />
            <span>Filtrar Projetos & Processos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Methodology Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider block font-bold">Metodologia Visual</label>
              <select
                id="filter-methodology"
                value={selectedMethodology}
                onChange={(e) => setSelectedMethodology(e.target.value)}
                className="w-full bg-[#0E0E10] border border-[#222225] rounded-xl p-2.5 text-xs md:text-sm text-white outline-none focus:border-[#FFD43B] focus:ring-1 focus:ring-[#FFD43B]"
              >
                <option value="all">Todas as Metodologias</option>
                <option value={MethodologyType.DOUBLE_DIAMOND}>Double Diamond</option>
                <option value={MethodologyType.DESIGN_THINKING}>Design Thinking</option>
                <option value={MethodologyType.LEAN_UX}>Lean UX</option>
                <option value={MethodologyType.CUSTOM}>Somente Customizadas</option>
              </select>
            </div>

            {/* Project Filter */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider block font-bold">Projeto Ativo</label>
              <select
                id="filter-project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-[#0E0E10] border border-[#222225] rounded-xl p-2.5 text-xs md:text-sm text-white outline-none focus:border-[#FFD43B] focus:ring-1 focus:ring-[#FFD43B]"
              >
                <option value="all">Todos os Projetos</option>
                {projectNames.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Generate Report Quick-trigger */}
        <div className="bg-[#FFD43B]/5 rounded-xl border border-[#222225] p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#FFD43B] bg-[#FFD43B]/10 border border-[#222225] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Compilador
              </span>
              <FileText className="w-4 h-4 text-[#FFD43B]" />
            </div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Relatório de Design</h4>
            <p className="text-xs text-[#A3A198] leading-relaxed">
              Compile cronologicamente todas as decisões de um projeto em segundos para prestação de contas ou auditoria de UX.
            </p>
          </div>

          <div className="pt-4 flex gap-2">
            <select
              id="report-project-selector"
              onChange={(e) => setActiveReportProject(e.target.value || null)}
              className="flex-1 bg-[#0E0E10] border border-[#222225] text-white text-xs p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFD43B]"
            >
              <option value="">Selecione Projeto...</option>
              {projectNames.map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
            </select>
            <button
              onClick={() => {
                if (!activeReportProject) {
                  alert("Por favor, selecione um projeto ativo no seletor para prosseguir.");
                  return;
                }
              }}
              className="bg-[#FFD43B] hover:bg-[#ebd039] text-black font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-[#222225]"
            >
              Exibir
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Split View: Decisions (Left) & Teams list (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Decision catalog logs */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-display font-medium text-xs uppercase tracking-wider text-[#7C7A72] px-1">
            Logs de Decisões Ativas da Comunidade ({filteredDecisions.length})
          </h3>

          <div className="space-y-6">
            {filteredDecisions.map((dec) => (
              <div 
                key={dec.id} 
                className="bg-[#151518] rounded-xl border border-[#222225] overflow-hidden shadow-xs hover:border-[#FFD43B] transition-all duration-200 flex flex-col justify-between"
              >
                {/* Header card info */}
                <div className="p-6 md:p-8 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#222225] pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-[#FFD43B] bg-[#FFD43B]/10 border border-[#222225] rounded px-2 py-0.5">
                          {dec.projectName}
                        </span>
                        <span className="text-[10px] font-mono text-[#A3A198] bg-[#0E0E10] border border-[#222225] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          {dec.methodology}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-white font-semibold mt-1">
                        Etapa: {dec.stage}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold font-mono border ${
                        dec.impact === "alto" ? "bg-rose-950/25 text-rose-400 border-rose-900" :
                        dec.impact === "médio" ? "bg-[#FFD43B]/10 text-[#FFD43B] border-[#222225]" :
                        "bg-[#0E0E10] text-[#7C7A72] border-[#222225]"
                      }`}>
                        Impacto: {dec.impact}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display font-semibold text-base md:text-lg text-white tracking-tight leading-snug">
                      {dec.title}
                    </h4>

                    {/* Rich sections: Context & Decisions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 bg-[#0E0E10] p-4 rounded-xl border border-[#222225]">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#7C7A72] font-bold mb-1">Contexto / O Problema</div>
                        <p className="text-xs text-[#A3A198] leading-relaxed">{dec.context}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#7C7A72] font-bold mb-1">Caminhos Analisados</div>
                        <ul className="space-y-1 text-xs text-[#A3A198]">
                          {dec.choices.map((choice, i) => (
                            <li key={i} className="flex gap-1.5 items-start pl-2 relative">
                              <span className="absolute left-0 top-1.5 w-1 h-1 bg-zinc-700 rounded-full"></span>
                              <span>{choice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Final choice statement */}
                    <div className="p-4 bg-[#FFD43B]/5 hover:bg-[#FFD43B]/10 transition-colors border-l-4 border-[#FFD43B] rounded-r-xl space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFD43B] font-extrabold flex items-center gap-1">
                        <BookmarkCheck className="w-3.5 h-3.5 text-[#FFD43B]" />
                        Decisão Tomada & Recomendações
                      </div>
                      <p className="text-zinc-200 text-xs md:text-sm leading-relaxed">{dec.finalDecision}</p>
                    </div>
                  </div>

                  {/* Connected Outer links without assets storage */}
                  {dec.externalLinks.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#7C7A72] font-bold">Referências Externas (Link-Agility)</div>
                      <div className="flex flex-wrap gap-2">
                        {dec.externalLinks.map((link) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E0E10] border border-[#222225] hover:border-[#FFD43B] rounded-lg text-xs font-semibold text-[#A3A198] hover:text-white transition-all shadow-sm"
                            title="O Sunflower atua de maneira transparente redirecionando link sem armazenar dados pesados"
                          >
                            {getPlatformIcon(link.platform)}
                            <span>{link.label}</span>
                            <LinkIcon className="w-2.5 h-2.5 text-[#7C7A72]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer bar with social engagement counts */}
                <div className="bg-[#0E0E10]/50 border-t border-[#222225] px-6 py-4 flex items-center justify-between text-xs text-[#A3A198]">
                  <div className="flex items-center gap-4">
                    <button
                      id={`like-btn-${dec.id}`}
                      onClick={() => handleLikeToggle(dec.id)}
                      className={`flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer ${dec.likedByUser ? "text-rose-400 font-semibold" : ""}`}
                    >
                      <Heart className={`w-4 h-4 ${dec.likedByUser ? "fill-rose-600 text-rose-600" : "text-[#A3A198]"}`} />
                      <span>{dec.likes}</span>
                    </button>

                    <button
                      id={`comment-btn-${dec.id}`}
                      onClick={() => setSelectedDecisionForComments(selectedDecisionForComments === dec.id ? null : dec.id)}
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#A3A198]" />
                      <span>{dec.comments.length} Comentários</span>
                    </button>
                  </div>

                  <div className="font-mono text-[10px] text-[#7C7A72]">
                    Por {dec.author} • {dec.authorRole}
                  </div>
                </div>

                {/* Expanded comments thread view */}
                {selectedDecisionForComments === dec.id && (
                  <div className="bg-[#0E0E10]/30 border-t border-[#222225] p-6 space-y-4">
                    <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider">Discussão Pública</h5>
                    
                    {dec.comments.length > 0 ? (
                      <div className="space-y-3.5">
                        {dec.comments.map((c) => (
                          <div key={c.id} className="bg-[#1C1C1F] p-3 rounded-xl border border-[#222225] shadow-xs text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white">{c.authorName}</span>
                              <span className="text-[10px] text-[#A3A198]">{c.authorRole}</span>
                            </div>
                            <p className="text-zinc-300 leading-relaxed">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-[#A3A198] text-xs italic">
                        Esse debate ainda não possui notas de outros designers. Comece a discussão!
                      </div>
                    )}

                    {/* Post comment input */}
                    <div className="flex gap-2 bg-[#151518] p-2 rounded-xl border border-[#222225]">
                      <input
                        id={`input-name-${dec.id}`}
                        type="text"
                        placeholder="Seu nome"
                        value={commenterName}
                        onChange={(e) => setCommenterName(e.target.value)}
                        className="w-1/3 bg-[#0E0E10] border border-[#222225] text-white rounded-lg p-2 text-xs focus:outline-none focus:border-[#FFD43B]"
                      />
                      <input
                        id={`input-comment-${dec.id}`}
                        type="text"
                        placeholder="Opinião de UX sobre esta decisão de design?"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="flex-1 bg-[#0E0E10] border border-[#222225] text-white rounded-lg p-2 text-xs focus:outline-none focus:border-[#FFD43B]"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handlePostComment(dec.id);
                        }}
                      />
                      <button
                        id={`post-btn-${dec.id}`}
                        onClick={() => handlePostComment(dec.id)}
                        className="bg-[#FFD43B] hover:bg-[#ebd039] text-black font-bold text-xs px-3.5 rounded-lg transition-colors cursor-pointer border border-[#222225]"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Teams collaboration panel */}
        <div className="space-y-6">
          <h3 className="font-display font-medium text-xs uppercase tracking-wider text-[#7C7A72] px-1">
            Times Colaborativos Simulados ({teams.length})
          </h3>

          <div className="space-y-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-[#151518] rounded-xl border border-[#222225] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#222225] pb-3">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">{team.name}</h4>
                    <p className="text-[11px] text-[#A3A198] mt-0.5">{team.description}</p>
                  </div>
                  <Users className="w-4 h-4 text-[#FFD43B]" />
                </div>

                {/* Team roster logs */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Artistas / Designers ({team.members.length})</span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 bg-[#0E0E10] rounded-lg border border-[#222225] text-xs">
                        <div>
                          <div className="font-semibold text-white">{member.name}</div>
                          <div className="text-[10px] text-[#A3A198]">{member.role}</div>
                        </div>
                        <span className="font-mono text-[9px] text-[#7C7A72]">{member.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Invite Designer Form Panel styled in rich dark Bento card */}
            <div className="bg-[#151518] text-white rounded-xl p-6 shadow-md space-y-4 border border-[#222225]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#FFD43B]" />
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Adicionar Colaborador</h4>
              </div>
              <p className="text-xs text-[#A3A198] leading-relaxed">
                Adicione designers de seu estúdio para unificar as mentes de criação sobre o blueprint e revisar as decisões em tempo real.
              </p>

              <form onSubmit={handleInviteMember} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#7C7A72]">Time Destino</label>
                  <select
                    id="team-invite-select"
                    value={selectedTeamForInvite}
                    onChange={(e) => setSelectedTeamForInvite(e.target.value)}
                    className="w-full bg-[#0E0E10] text-white border border-[#222225] text-xs rounded-lg p-2.5 outline-none focus:border-[#FFD43B]"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[#151518]">{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#7C7A72]">Nome do Designer</label>
                  <input
                    id="invite-name"
                    type="text"
                    required
                    placeholder="Ex: Clara Silva"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="bg-[#0E0E10] text-white border border-[#222225] text-xs rounded-lg p-2.5 outline-none focus:border-[#FFD43B] w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#7C7A72]">E-mail Profissional</label>
                  <input
                    id="invite-email"
                    type="email"
                    required
                    placeholder="Ex: clara@studio.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-[#0E0E10] text-white border border-[#222225] text-xs rounded-lg p-2.5 outline-none focus:border-[#FFD43B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#7C7A72]">Role / Especialidade</label>
                  <select
                    id="invite-role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="bg-[#0E0E10] text-white border border-[#222225] text-xs rounded-lg p-2.5 outline-none focus:border-[#FFD43B] w-full"
                  >
                    <option value="UI Designer" className="bg-[#151518]">UI Designer</option>
                    <option value="UX Researcher" className="bg-[#151518]">UX Researcher</option>
                    <option value="Interaction Architect" className="bg-[#151518]">Interaction Architect</option>
                    <option value="Frontend Specialist" className="bg-[#151518]">Frontend Specialist</option>
                    <option value="Design Manager" className="bg-[#151518]">Design Manager</option>
                  </select>
                </div>

                <button
                  id="btn-submit-invite"
                  type="submit"
                  className="w-full bg-[#FFD43B] hover:bg-[#ebd039] text-black font-extrabold text-xs p-3 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer border border-[#222225]"
                >
                  Confirmar Convite
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Overlay Modals */}

      {/* A. Register Decision Modal */}
      {isAddingDecision && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#151518] rounded-3xl border border-[#222225] shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto p-6 md:p-8 space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-[#222225] pb-4">
              <div>
                <h4 className="font-display font-bold text-lg text-white">Catalogar Nova Decisão Estratégica</h4>
                <p className="text-xs text-[#A3A198] mt-0.5 animate-pulse-slow">Registre cada raciocínio para indexar e apoiar a comunidade.</p>
              </div>
              <button
                onClick={() => setIsAddingDecision(false)}
                className="text-xs text-[#A3A198] hover:text-white bg-[#0E0E10] border border-[#222225] rounded-full px-3 py-1 cursor-pointer transition-colors"
              >
                Voltar
              </button>
            </div>

            <form onSubmit={handleAddDecision} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Nome do Projeto</label>
                  <input
                    id="new-project-name"
                    type="text"
                    required
                    placeholder="Ex: Portal de Acessibilidade"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Título de Identificação</label>
                  <input
                    id="new-title"
                    type="text"
                    required
                    placeholder="Ex: Migração de Sans-Serif para Humanista"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Metodologia Adotada</label>
                  <select
                    id="new-methodology"
                    value={newMethodology}
                    onChange={(e) => {
                      const value = e.target.value as MethodologyType;
                      setNewMethodology(value);
                      setNewStage(stagesForMethodology[value][0]);
                    }}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  >
                    <option value={MethodologyType.DOUBLE_DIAMOND} className="bg-[#151518]">Double Diamond</option>
                    <option value={MethodologyType.DESIGN_THINKING} className="bg-[#151518]">Design Thinking</option>
                    <option value={MethodologyType.LEAN_UX} className="bg-[#151518]">Lean UX</option>
                    <option value={MethodologyType.CUSTOM} className="bg-[#151518]">Estrutura Personalizada</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Etapa Ativa</label>
                  <select
                    id="new-stage-select"
                    value={newStage || stagesForMethodology[newMethodology][0]}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  >
                    {stagesForMethodology[newMethodology].map((st, idx) => (
                      <option key={idx} value={st} className="bg-[#151518]">{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Contexto / O Problema</label>
                <textarea
                  id="new-context"
                  required
                  rows={2}
                  placeholder="Explique o desafio ou atritos levantados pelos usuários."
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                ></textarea>
              </div>

              {/* Multiple alternative paths */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-semibold">Até 2 Alternativas Avaliadas</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    id="choices-0"
                    type="text"
                    placeholder="Opção A"
                    value={newChoices[0]}
                    onChange={(e) => {
                      const c = [...newChoices];
                      c[0] = e.target.value;
                      setNewChoices(c);
                    }}
                    className="bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  />
                  <input
                    id="choices-1"
                    type="text"
                    placeholder="Opção B"
                    value={newChoices[1]}
                    onChange={(e) => {
                      const c = [...newChoices];
                      c[1] = e.target.value;
                      setNewChoices(c);
                    }}
                    className="bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">A Escolha Final & Justificativa Técnica</label>
                <textarea
                  id="new-final-decision"
                  required
                  rows={2}
                  placeholder="Por que adotou esse caminho criativo? Exiba resultados de validação de UX."
                  value={newFinalDecision}
                  onChange={(e) => setNewFinalDecision(e.target.value)}
                  className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#7C7A72] uppercase tracking-wider font-bold">Impacto Organizacional</label>
                  <select
                    id="new-impact"
                    value={newImpact}
                    onChange={(e) => setNewImpact(e.target.value as "baixo" | "médio" | "alto")}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFD43B]"
                  >
                    <option value="baixo" className="bg-[#151518]">Baixo Impacto</option>
                    <option value="médio" className="bg-[#151518]">Médio Impacto</option>
                    <option value="alto" className="bg-[#151518]">Alto Impacto Estratégico</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[#FFD43B] uppercase tracking-wider font-bold block">Adicionar Links Referenciados (Se houver)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Cole a URL HTTPS ativa (ex: https://figma.com/projeto-v):");
                      if (url) {
                        const label = prompt("Dê uma etiqueta / Label amigável (ex: Layout Figma de Testes):");
                        if (url && isValidHttpsUrl(url)) {
                          const config: ExternalLink = {
                            id: `lnk-${Date.now()}`,
                            platform: "other",
                            url,
                            label: label || "Link Externo"
                          };
                          setAddedLinks([...addedLinks, config]);
                        } else {
                          alert("Link inválido. Certifique-se de iniciar com HTTPS.");
                        }
                      }
                    }}
                    className="w-full bg-[#0E0E10] border border-[#222225] text-xs text-[#A3A198] hover:text-white rounded-xl p-2.5 text-left transition-colors cursor-pointer text-ellipsis overflow-hidden"
                  >
                    {addedLinks.length === 0 ? "Clique para colar Link Externo..." : `${addedLinks.length} Links Anexados`}
                  </button>
                </div>
              </div>

              {addedLinks.length > 0 && (
                <div className="p-3.5 bg-[#0E0E10] rounded-xl border border-[#222225] text-xs space-y-1.5">
                  <span className="font-semibold text-white">Lista Geral de Links Anexos:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {addedLinks.map((al) => (
                      <div key={al.id} className="flex items-center justify-between p-1 px-2.5 bg-[#151518] border border-[#222225] rounded">
                        <span className="truncate text-xs text-[#A3A198]">{al.label}</span>
                        <Trash onClick={() => removeAddedLink(al.id)} className="w-3.5 h-3.5 text-zinc-500 hover:text-rose-400 cursor-pointer transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3 border-t border-[#222225]">
                <button
                  type="button"
                  onClick={() => setIsAddingDecision(false)}
                  className="flex-1 border border-[#222225] text-[#A3A198] p-3 rounded-2xl hover:bg-[#0E0E10] hover:text-white text-sm font-semibold cursor-pointer transition-all"
                >
                  Voltar para Linha do Tempo
                </button>
                <button
                  id="btn-confirm-decision"
                  type="submit"
                  className="flex-1 bg-[#FFD43B] hover:bg-[#ebd039] text-black p-3 rounded-2xl text-sm font-semibold transition-all border border-[#222225] shadow-sm cursor-pointer"
                >
                  Confirmar e Postar Decisão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. Visual compiled Report Window */}
      {activeReportProject && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#151518] rounded-3xl border border-[#222225] shadow-2xl max-w-4xl w-full p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#222225] pb-4 no-print text-white">
              <div>
                <h4 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-[#FFD43B]" />
                  Visualizador de Relatório Compilado
                </h4>
                <p className="text-xs text-[#A3A198]">Total de {compileReportData(activeReportProject).length} decisões estrategicamente mapeadas.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-[#FFD43B] hover:bg-[#ebd039] text-black font-semibold text-xs px-4 py-2 rounded-xl transition-all border border-[#222225] cursor-pointer"
                >
                  Imprimir / PDF
                </button>
                <button
                  onClick={() => setActiveReportProject(null)}
                  className="bg-[#0E0E10] border border-[#222225] text-[#A3A198] hover:text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Compiled printable sheet */}
            <div className="bg-[#0E0E10] p-6 md:p-10 border border-[#222225] rounded-2xl shadow-xs print-only space-y-8 font-sans max-h-[60vh] overflow-y-auto text-[#A3A198]">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#222225] pb-5 gap-4">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-[#FFD43B] font-bold tracking-widest uppercase">Relatório de Decisão • Sunflower</div>
                  <h1 className="font-display font-bold text-2xl text-white leading-tight">Projeto: {activeReportProject}</h1>
                  <p className="text-[11px] text-[#7C7A72]">Gerado automaticamente em {new Date().toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-[#FFD43B] text-lg">SUNFLOWER</div>
                  <div className="font-mono text-[9px] text-[#7C7A72]">Ativos & Decisões Mapeados</div>
                </div>
              </div>

              {compileReportData(activeReportProject).length > 0 ? (
                <div className="space-y-8">
                  {compileReportData(activeReportProject).map((dec, idx) => (
                    <div key={dec.id} className="space-y-4 pb-6 border-b border-[#222225] last:border-0 border-dashed">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 text-white">
                          <span className="font-mono text-xs text-[#FFD43B] font-semibold bg-[#FFD43B]/10 border border-[#222225] px-2 py-0.5 rounded mr-2">
                            Ação {idx + 1}
                          </span>
                          <span className="font-mono text-[#7C7A72] text-[10px] uppercase">
                            [{dec.methodology} — {dec.stage}]
                          </span>
                          <h3 className="font-display font-semibold text-base text-white pt-1">
                            {dec.title}
                          </h3>
                        </div>
                        <span className="font-mono text-[9px] text-[#7C7A72]">Custo: {dec.impact}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1.5">
                          <h5 className="font-semibold text-white uppercase tracking-wide text-[9px] font-mono">Enquadramento do Problema</h5>
                          <p className="text-[#A3A198] leading-relaxed bg-[#151518]/55 border border-[#222225] p-2.5 rounded">{dec.context}</p>
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="font-semibold text-white uppercase tracking-wide text-[9px] font-mono">Trilhas & Alternativas Avaliadas</h5>
                          <div className="bg-[#151518]/55 border border-[#222225] p-2.5 rounded text-[#A3A198] space-y-1">
                            {dec.choices.map((choice, i) => (
                              <div key={i}>- {choice}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-[#FFD43B]/5 border-l-4 border-[#FFD43B] border-y border-r border-[#222225] rounded text-xs space-y-1">
                        <h5 className="font-semibold text-[#FFD43B] uppercase tracking-wide text-[9px] font-mono">Conclusão & Solução Homologada</h5>
                        <p className="text-zinc-200 leading-relaxed font-sans">{dec.finalDecision}</p>
                      </div>

                      {dec.externalLinks.length > 0 && (
                        <div className="text-xs space-y-1">
                          <h5 className="font-semibold text-[#7C7A72] uppercase tracking-wide text-[9px] font-mono">Apontamentos Seguros de Links Externos</h5>
                          <div className="flex flex-wrap gap-2">
                            {dec.externalLinks.map((lnk) => (
                              <span key={lnk.id} className="bg-[#151518] text-[#A3A198] text-[10px] px-2 py-0.5 rounded border border-[#222225]">
                                {lnk.label}: <strong className="font-mono text-[#FFD43B]">{lnk.url}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[#7C7A72] italic font-sans text-xs">
                  Sem registros cadastrados para este projeto. Utilize a barra superior para registrar uma nova decisão de design e alimentar o compilador.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
