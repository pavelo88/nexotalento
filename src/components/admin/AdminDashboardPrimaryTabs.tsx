import React from 'react';
import { BarChart3, FileText, Users, Settings, Save, CheckCircle2, TrendingUp, Briefcase, Globe, MessageSquare, Search, Plus, Trash2, Edit, Eye, RefreshCw, Sparkles, Layers, Palette, ShieldCheck, Building2, Clock, Phone, Mail, ChevronRight, Menu, X, RotateCcw, Sun, Moon, Check, Archive } from 'lucide-react';

export interface AdminDashboardPanelState { [key: string]: any; }

export const AdminDashboardPrimaryTabs: React.FC<{ state: AdminDashboardPanelState }> = ({ state }) => {
  const { activeTab, siteContent, setSiteContent, vacancies, setVacancies, areasList, setAreasList, sectorsList, setSectorsList, isCreatingVacancy, setIsCreatingVacancy, newVacTitle, setNewVacTitle, newVacDept, setNewVacDept, newVacLoc, setNewVacLoc, newVacMod, setNewVacMod, newVacSalary, setNewVacSalary, newVacDesc, setNewVacDesc, leads, trackingEvents = [], leadStatusFilter, setLeadStatusFilter, searchTerm, setSearchTerm, filteredLeads, handleAddVacancy, handleDeleteVacancy, handleDeleteLead, handleToggleLeadAttended } = state;
  const whatsappClicks = trackingEvents.filter((event: any) => event.eventName === 'whatsapp_click').length;
  const submittedForms = trackingEvents.filter((event: any) => event.eventName === 'generate_lead' || event.eventName === 'contact_submit').length;
  return (
    <>
            {/* TAB 1: ANALÍTICA */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Leads Totales</span>
                    <Users className="w-4 h-4 text-cyan-500" />
                  </div>
                  <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{leads.length}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Bandeja de Firebase</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Google Analytics 4</span>
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">G-T4ZC2SJXHS</p>
                  <p className="text-[10px] text-stone-500 mt-1">Medición de eventos activa</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Google Tag Manager</span>
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                  </div>
                  <p className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">GTM-PX6M5QSS</p>
                  <p className="text-[10px] text-stone-500 mt-1">Inyectado en head y body</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Seguimiento comercial</span>
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-xs font-bold text-purple-600 dark:text-purple-300">{whatsappClicks} clics en WhatsApp</p>
                  <p className="text-[10px] text-stone-500 mt-1">{submittedForms} envíos de formulario registrados</p>
                </div>
              </div>
            )}

            {/* TAB 2: HERO & TEXTOS */}
            {activeTab === 'hero' && (
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Badge Superior</label>
                    <input
                      type="text"
                      value={siteContent.hero?.badge || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, badge: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Badge Edición</label>
                    <input
                      type="text"
                      value={siteContent.hero?.editionBadge || ''}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, editionBadge: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Título Principal (H1)</label>
                  <input
                    type="text"
                    value={siteContent.hero?.titlePrefix || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titlePrefix: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Subtítulo / Propuesta de Valor</label>
                  <textarea
                    rows={3}
                    value={siteContent.hero?.subtitle || ''}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, subtitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: VACANTES (CON MODAL CREAR, MODIFICAR Y ELIMINAR) */}
            {activeTab === 'vacancies' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {vacancies.length} posiciones en selección activa
                  </span>
                  <button
                    onClick={() => setIsCreatingVacancy(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Vacante</span>
                  </button>
                </div>

                {/* Formulario Crear Vacante Modal */}
                {isCreatingVacancy && (
                  <form onSubmit={handleAddVacancy} className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-900 border-2 border-cyan-500/50 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-300 dark:border-stone-800">
                      <span className="text-xs font-black uppercase text-cyan-600 dark:text-cyan-400">Nueva Oferta de Empleo</span>
                      <button type="button" onClick={() => setIsCreatingVacancy(false)} className="text-stone-400 hover:text-stone-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Cargo / Título</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Gerente de Operaciones"
                          value={newVacTitle}
                          onChange={(e) => setNewVacTitle(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Departamento</label>
                        <input
                          type="text"
                          value={newVacDept}
                          onChange={(e) => setNewVacDept(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Ubicación</label>
                        <input
                          type="text"
                          value={newVacLoc}
                          onChange={(e) => setNewVacLoc(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Modalidad</label>
                        <select
                          value={newVacMod}
                          onChange={(e) => setNewVacMod(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        >
                          <option value="Presencial">Presencial</option>
                          <option value="Híbrido">Híbrido</option>
                          <option value="100% Remoto">100% Remoto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Banda Salarial</label>
                        <input
                          type="text"
                          value={newVacSalary}
                          onChange={(e) => setNewVacSalary(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">Descripción</label>
                      <textarea
                        rows={2}
                        placeholder="Descripción detallada de la posición..."
                        value={newVacDesc}
                        onChange={(e) => setNewVacDesc(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsCreatingVacancy(false)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-sm"
                      >
                        Guardar Vacante
                      </button>
                    </div>
                  </form>
                )}

                {/* Lista de Vacantes Editables */}
                <div className="space-y-3">
                  {vacancies.map((vac, idx) => (
                    <div key={vac.id || idx} className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-3">

                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={vac.title}
                          onChange={(e) => {
                            const copy = [...vacancies];
                            copy[idx].title = e.target.value;
                            setVacancies(copy);
                          }}
                          className="text-sm font-bold bg-transparent border-b border-transparent hover:border-stone-300 dark:hover:border-stone-700 focus:border-cyan-500 outline-none text-stone-900 dark:text-white flex-1"
                        />
                        <button
                          onClick={() => handleDeleteVacancy(vac.id)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                          title="Eliminar vacante"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Sueldo</span>
                          <input
                            type="text"
                            value={vac.salaryRange}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].salaryRange = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-emerald-600 dark:text-emerald-400 font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Ubicación</span>
                          <input
                            type="text"
                            value={vac.location}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].location = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 font-bold block">Modalidad</span>
                          <input
                            type="text"
                            value={vac.modality}
                            onChange={(e) => {
                              const copy = [...vacancies];
                              copy[idx].modality = e.target.value;
                              setVacancies(copy);
                            }}
                            className="w-full px-2 py-1 text-xs rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ÁREAS DE ESPECIALIZACIÓN (EDITABLE) */}
            {activeTab === 'areas' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                      Áreas de Especialización ({areasList.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Edita los textos, insignias e imágenes del carrusel de especialidades.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {areasList.map((area, idx) => (
                    <div
                      key={area.id || idx}
                      className="p-5 rounded-2xl bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-3.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          Área #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={area.badge || ''}
                          onChange={(e) => {
                            const copy = [...areasList];
                            copy[idx].badge = e.target.value;
                            setAreasList(copy);
                          }}
                          placeholder="Insignia / Badge"
                          className="px-2 py-1 text-[11px] font-bold rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-right"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Título Principal</label>
                        <input
                          type="text"
                          value={area.title || ''}
                          onChange={(e) => {
                            const copy = [...areasList];
                            copy[idx].title = e.target.value;
                            setAreasList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs font-bold rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Subtítulo Descriptivo</label>
                        <input
                          type="text"
                          value={area.subtitle || ''}
                          onChange={(e) => {
                            const copy = [...areasList];
                            copy[idx].subtitle = e.target.value;
                            setAreasList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">URL de Imagen</label>
                        <input
                          type="text"
                          value={area.image || ''}
                          onChange={(e) => {
                            const copy = [...areasList];
                            copy[idx].image = e.target.value;
                            setAreasList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-[11px] font-mono rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">Descripción</label>
                        <textarea
                          rows={2}
                          value={area.description || ''}
                          onChange={(e) => {
                            const copy = [...areasList];
                            copy[idx].description = e.target.value;
                            setAreasList(copy);
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


    </>
  );
};
