import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  Download,
  Building,
  CheckCircle2
} from 'lucide-react';
import { sanitizeInput } from '../utils/security';

interface JobSpecGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobSpecGeneratorModal: React.FC<JobSpecGeneratorModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [roleTitle, setRoleTitle] = useState('Director de Tecnología (CTO)');
  const [department, setDepartment] = useState('Tecnología & Digital');
  const [experienceYears, setExperienceYears] = useState('8-12 años');
  const [location, setLocation] = useState('Madrid / Híbrido');
  const [keyRequirements, setKeyRequirements] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSpec, setGeneratedSpec] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedSpec('');

    const cleanTitle = sanitizeInput(roleTitle, 100);
    const cleanDept = sanitizeInput(department, 100);
    const cleanExp = sanitizeInput(experienceYears, 50);
    const cleanLoc = sanitizeInput(location, 100);
    const cleanReqs = sanitizeInput(keyRequirements, 2000);

    try {
      const res = await fetch('/api/job-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: cleanTitle,
          department: cleanDept,
          experienceYears: cleanExp,
          location: cleanLoc,
          keyRequirements: cleanReqs
        })
      });

      const data = await res.json();
      setGeneratedSpec(data.jobDescription || 'Descripción generada con éxito.');
    } catch (err) {
      console.error('Error generating job spec:', err);
      setGeneratedSpec(`### Perfil de Puesto Ejecutivo: ${roleTitle}
**Ubicación:** ${location}
**Departamento:** ${department}
**Experiencia requerida:** ${experienceYears}

#### 1. Misión Estratégica
Liderar y dinamizar el departamento de ${department}, definiendo el roadmap operativo y estratégico alineado con los objetivos del Consejo de Administración y la Dirección General.

#### 2. Responsabilidades Principales
- Dirección, mentoría y gestión del rendimiento del equipo.
- Optimización de procesos, presupuestos y recursos clave.
- Interlocución con clientes clave, proveedores y stakeholders internos.
- Implementación de mejores prácticas e innovación continua en el mercado español.
- Reporting directo a CEO y Comité de Dirección.

#### 3. Perfil del Candidato Ideal
- Formación universitaria superior / Postgrado Executive.
- Mínimo ${experienceYears} de experiencia demostrable en posiciones de similar responsabilidad.
- Dominio de soft skills: Liderazgo inspirador, visión de negocio, resiliencia y negociación de alto nivel.
- Idiomas: Español nativo/bilingüe e Inglés profesional fluido (C1).

#### 4. Propuesta de Valor al Empleado (EVP)
- Paquete retributivo altamente competitivo (Fijo + Variable según objetivos + Beneficios sociales).
- Proyecto sólido con alto impacto y autonomía de gestión en España.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedSpec) return;
    navigator.clipboard.writeText(generatedSpec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                Generador de Job Descriptions con IA
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </h2>
              <p className="text-xs text-slate-400">
                Diseña especificaciones de puesto ejecutivas y atractivas para el mercado en España
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Título del Puesto
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Ej: Director Comercial / VP Sales"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Departamento
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Ej: Ventas, Finanzas, Tech, Operaciones"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Años de Experiencia Requeridos
              </label>
              <input
                type="text"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Ej: 5-8 años"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ubicación / Modalidad
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                placeholder="Ej: Madrid, Barcelona, Remoto España"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Requisitos Clave o Puntos Críticos de la Búsqueda
            </label>
            <textarea
              rows={3}
              value={keyRequirements}
              onChange={(e) => setKeyRequirements(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              placeholder="Detalla requisitos imprescindibles, tecnologías, gestión de equipos, idiomas o sector específico..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !roleTitle.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>Estructurando Job Description con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Generar Job Spec Completa para Executive Search</span>
              </>
            )}
          </button>

          {generatedSpec && (
            <div className="p-5 bg-slate-950 rounded-2xl border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Especificación de Puesto Generada
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
                </button>
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto p-3 bg-slate-900 rounded-xl">
                {generatedSpec}
              </div>

              <div className="pt-2">
                <a
                  href="#contacto"
                  onClick={onClose}
                  className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Encargar esta Búsqueda a un Headhunter de Nexo Talento</span>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
