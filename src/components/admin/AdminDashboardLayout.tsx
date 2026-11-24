import React from 'react';
import { Logo } from '../Logo';
import { BarChart3, FileText, Users, Settings, LogOut, Save, CheckCircle2, Briefcase, MessageSquare, Search, Layers, Building2, Menu, X, RotateCcw, Sun, Moon, RefreshCw } from 'lucide-react';

interface AdminDashboardLayoutProps { children: React.ReactNode; state: Record<string, any>; }

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children, state }) => {
  const { theme, toggleTheme, sidebarOpen, setSidebarOpen, user, onLogout, activeTab, setActiveTab, adminSearch, setAdminSearch, menuItems, saveSuccess, handleRestoreDefaults, handleSaveCMS, isSaving } = state;
  return (
    <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#080a0d] text-slate-100' : 'bg-[#FAF8F5] text-slate-900'
    }`}>
      
      {/* SIDEBAR FIJO DEL ALTO EXACTO DE LA PANTALLA (ESTILO MODULARES GM) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 md:static flex flex-col h-full border-r transition-transform duration-300 ease-in-out shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        theme === 'dark' ? 'bg-[#0c0e12] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
      }`}>
        
        {/* Header Izquierdo con Favicon Oficial y Tipografía Admin HQ */}
        <div className="h-16 px-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} showSubtitle={false} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold text-stone-900 dark:text-white font-heading tracking-tight">Nexo Talento</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">Admin HQ</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge Limpio */}
        <div className="p-3 mx-3 my-2.5 rounded-xl border border-stone-200 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-900/60 shrink-0">
          <p className="text-xs font-bold truncate text-stone-900 dark:text-stone-100">{user?.nombre || 'Pablo García'}</p>
          <p className="text-[10px] text-stone-500 truncate">{user?.email || 'pablofgarciaf@gmail.com'}</p>
        </div>

        {/* Menú de Navegación Vertical */}
        <nav className="flex-1 px-2.5 py-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 font-bold shadow-xs'
                    : theme === 'dark'
                      ? 'text-stone-400 hover:text-stone-100 hover:bg-stone-900/60'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />

                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive 
                      ? 'bg-stone-800 text-stone-200 dark:bg-stone-200 dark:text-stone-900' 
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer del Sidebar con Cerrar Sesión (h-16 exacto igual que la barra inferior derecha) */}
        <div className="h-16 px-3 border-t border-stone-200 dark:border-stone-800 flex items-center shrink-0">
          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Backdrop overlay para móvil */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ÁREA PRINCIPAL CON HEADER FIJO Y SCROLL INTERNO */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        
        {/* ÚNICO HEADER SUPERIOR FIJO (h-16 EXACTO COMO MODULARES GM) */}
        <header className="h-16 px-4 sm:px-8 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-xl flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 md:hidden"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-heading">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-stone-500">
                Gestión en tiempo real de Nexo Talento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Buscador inteligente */}
            <div className="relative hidden lg:block w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar sección o texto..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 outline-none"
              />
            </div>

            {/* Alternador Modo Claro / Oscuro */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
          </div>
        </header>

        {/* CONTENIDO INTERNO CON SCROLL (CON ESPACIO INFERIOR PARA BARRA FIJA) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32">
          <div className="max-w-5xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* BARRA DE GUARDAR / RESTAURAR FIJA DE TODO EL ANCHO EN EL FONDO (IGUAL A MODULARES GM) */}
        <footer className="fixed bottom-0 right-0 left-0 md:left-64 z-40 h-16 border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-[#0c0e12]/95 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            {saveSuccess ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Cambios guardados con éxito en la web.</span>
              </span>
            ) : (
              <span>Recuerda guardar los cambios para aplicarlos en la página.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRestoreDefaults}
              className="h-9 px-4 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Restaurar</span>
            </button>
            <button
              onClick={handleSaveCMS}
              disabled={isSaving}
              className="h-9 px-5 rounded-xl text-xs font-bold bg-stone-900 text-white dark:bg-white dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-stone-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </footer>

      </div>

    </div>
  );
};
