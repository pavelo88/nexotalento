import React from 'react';
import { BarChart3, FileText, Users, Settings, Save, CheckCircle2, TrendingUp, Briefcase, Globe, MessageSquare, Search, Plus, Trash2, Edit, Eye, RefreshCw, Sparkles, Layers, Palette, ShieldCheck, Building2, Clock, Phone, Mail, ChevronRight, Menu, X, RotateCcw, Sun, Moon, Check, Archive } from 'lucide-react';
import type { AdminDashboardPanelState } from './AdminDashboardPrimaryTabs';
import { AdminApplicationsInbox } from './AdminApplicationsInbox';

export const AdminDashboardSecondaryTabs: React.FC<{ state: AdminDashboardPanelState }> = ({ state }) => {
  const { activeTab, siteContent, setSiteContent, vacancies, setVacancies, areasList, setAreasList, sectorsList, setSectorsList, isCreatingVacancy, setIsCreatingVacancy, newVacTitle, setNewVacTitle, newVacDept, setNewVacDept, newVacLoc, setNewVacLoc, newVacMod, setNewVacMod, newVacSalary, setNewVacSalary, newVacDesc, setNewVacDesc, leads, applications, leadStatusFilter, setLeadStatusFilter, searchTerm, setSearchTerm, filteredLeads, handleAddVacancy, handleDeleteVacancy, handleDeleteLead, handleToggleLeadAttended } = state;
  return (
    <>
            {/* TAB: SECTORES DE INDUSTRIA (EDITABLE) */}
            {activeTab === 'sectors' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                      Sectores de Industria ({sectorsList.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Gestiona los 7 ecosistemas productivos y perfiles demandados.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {sectorsList.map((sector, idx) => (
                    <div
                      key={sector.id || idx}
                      className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Sector #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={sector.badge || ''}
                          onChange={(e) => {
                            const copy = [...sectorsList];
                            copy[idx].badge = e.target.value;
                            setSectorsList(copy);
                          }}
                          placeholder="Insignia / Badge"
                          className="px-2 py-1 text-[11px] font-bold rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-right"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Nombre del Sector</label>
                        <input
                          type="text"
                          value={sector.name || ''}
                          onChange={(e) => {
                            const copy = [...sectorsList];
                            copy[idx].name = e.target.value;
                            setSectorsList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs font-bold rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Subtítulo / Especialidades</label>
                        <input
                          type="text"
                          value={sector.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...sectorsList];
                            copy[idx].subtitle = e.target.value;
                            setSectorsList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Descripción</label>
                        <textarea
                          rows={2}
                          value={sector.description || ''}
                          onChange={(e) => {
                            const copy = [...sectorsList];
                            copy[idx].description = e.target.value;
                            setSectorsList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: BANDEJA DE LEADS CON ACCIONES (ATENDER / ELIMINAR) */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, email o cargo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      onClick={() => setLeadStatusFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'all' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Todos ({leads.length})
                    </button>
                    <button
                      onClick={() => setLeadStatusFilter('pending')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'pending' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Pendientes
                    </button>
                    <button
                      onClick={() => setLeadStatusFilter('attended')}
                      className={`px-2.5 py-1 rounded-lg font-bold ${leadStatusFilter === 'attended' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950' : 'text-stone-500'}`}
                    >
                      Atendidos
                    </button>
                  </div>
                </div>

                {filteredLeads.length > 0 ? (
                  <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-270px)] rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/80 mb-24 shadow-sm">
                    <table className="w-full text-left text-xs border-collapse relative">
                      <thead className="sticky top-0 z-20 bg-stone-100 dark:bg-stone-950 text-stone-600 dark:text-stone-400 uppercase font-bold text-[10px] shadow-sm">
                        <tr>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">Estado</th>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">Fecha</th>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">Nombre</th>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">Email &amp; Teléfono</th>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">Empresa / Rol</th>
                          <th className="p-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
                        {filteredLeads.map((lead, idx) => {
                          const leadId = lead.id || lead._id || `lead-${idx}`;
                          return (
                            <tr key={leadId} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                              <td className="p-3">
                                {lead.attended ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                                    Atendido
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                                    Pendiente
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-stone-500 text-[11px] whitespace-nowrap">
                                {lead.createdAt?.slice(0, 10) || 'Hoy'}
                              </td>
                              <td className="p-3 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                                {lead.name}
                              </td>
                              <td className="p-3">
                                <p className="text-cyan-600 dark:text-cyan-400">{lead.email}</p>
                                <p className="text-stone-500 text-[11px]">{lead.phone}</p>
                              </td>
                              <td className="p-3 text-stone-700 dark:text-stone-300">
                                <span className="font-semibold">{lead.company}</span>
                                {lead.role && <span className="text-[11px] text-stone-500 block">{lead.role}</span>}
                                {lead.leadType && <span className="mt-1 inline-flex rounded-full bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{lead.leadType}</span>}
                              </td>
                              <td className="p-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleToggleLeadAttended(leadId)}
                                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                                      lead.attended 
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300' 
                                        : 'bg-stone-100 text-stone-700 border-stone-300 dark:bg-stone-800 dark:text-stone-300'
                                    }`}
                                    title={lead.attended ? 'Marcar como pendiente' : 'Marcar como atendido'}
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLead(leadId)}
                                    className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-rose-500 transition-colors"
                                    title="Eliminar lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40">
                    <Users className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-stone-700 dark:text-stone-300">No se encontraron prospectos</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'applications' && <AdminApplicationsInbox applications={applications} />}

            {/* TAB 5: CONFIGURACIÓN */}
            {activeTab === 'settings' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">WhatsApp Consultor</label>
                    <input
                      type="text"
                      value={siteContent.contact?.whatsapp || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, whatsapp: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Email Notificaciones</label>
                    <input
                      type="email"
                      value={siteContent.contact?.email || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

    </>
  );
};
