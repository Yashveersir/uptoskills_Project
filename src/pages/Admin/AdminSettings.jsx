import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { 
  Shield, 
  Monitor, 
  Database,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [settingsState, setSettingsState] = useState({
    enforce2FA: true,
    sessionTimeout: "60",
    strictPersona: true,
    maintenanceMode: false,
    publicRegistration: true,
    defaultResolution: "1080p"
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("System settings updated successfully!");
    }, 800);
  };

  const handleToggle = (key) => {
    setSettingsState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettingsState(prev => ({ ...prev, [key]: value }));
  };

  const handleFactoryReset = () => {
    toast.error("System factory reset initiated (Simulation)");
  };

  const sections = [
    {
      title: "Security & Authentication",
      icon: <Shield size={20} className="text-primary-600 dark:text-primary-400" />,
      settings: [
        { key: "enforce2FA", label: "Enforce 2FA for Admins", value: settingsState.enforce2FA, type: "toggle" },
        { key: "sessionTimeout", label: "Session Timeout (Minutes)", value: settingsState.sessionTimeout, type: "input" },
        { key: "strictPersona", label: "Strict AI Persona Validation", value: settingsState.strictPersona, type: "toggle" },
      ]
    },
    {
      title: "Platform Configuration",
      icon: <Monitor size={20} className="text-secondary-600 dark:text-secondary-400" />,
      settings: [
        { key: "maintenanceMode", label: "Maintenance Mode", value: settingsState.maintenanceMode, type: "toggle" },
        { key: "publicRegistration", label: "Public Registration", value: settingsState.publicRegistration, type: "toggle" },
        { key: "defaultResolution", label: "Default AI Video Resolution", value: settingsState.defaultResolution, type: "select", options: ["720p", "1080p", "4K"] },
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">System Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Configure global platform behavior and security protocols.</p>
        </div>
        <Button variant="primary" isLoading={isSaving} onClick={handleSave} className="rounded-2xl px-8 shadow-xl shadow-primary-500/20 gap-2">
          <CheckCircle2 size={18} />
          Save All Changes
        </Button>
      </header>

      <div className="space-y-8 pb-20">
        {sections.map((section, idx) => (
          <div key={section.title} className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-card">
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-4 bg-background-header dark:bg-neutral-800/30">
               <div className={`p-3 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800 ${idx === 0 ? 'text-primary-500' : 'text-secondary-500'}`}>
                 {section.icon}
               </div>
               <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">{section.title}</h2>
            </div>
            
            <div className="p-8 space-y-8">
              {section.settings.map((setting) => (
                <div key={setting.label} className="flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 p-4 -mx-4 rounded-2xl transition-colors">
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-1">{setting.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Modify this parameter to adjust system behavior.</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {setting.type === "toggle" && (
                      <button 
                        onClick={() => handleToggle(setting.key)}
                        className={`w-12 h-6 rounded-full transition-all relative focus-visible:ring-2 focus-visible:ring-primary-500 outline-none ${setting.value ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${setting.value ? 'right-1' : 'left-1'}`} />
                      </button>
                    )}
                    
                    {setting.type === "input" && (
                      <Input 
                        type="text" 
                        value={setting.value}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        containerClassName="w-24"
                        className="text-center h-10"
                      />
                    )}

                    {setting.type === "select" && (
                      <div className="relative">
                        <select 
                          value={setting.value}
                          onChange={(e) => handleChange(setting.key, e.target.value)}
                          className="px-4 py-2 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm min-w-[120px] text-neutral-900 dark:text-neutral-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer text-center pr-8"
                        >
                          {setting.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={14} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-8 md:p-10 rounded-lg bg-status-error/5 dark:bg-status-error/10 border border-status-error/20 dark:border-status-error/30">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 text-status-error shadow-sm border border-status-error/20 dark:border-status-error/30">
               <Database size={20} />
             </div>
             <h3 className="text-xl font-display font-bold text-status-error">Danger Zone</h3>
           </div>
           <p className="text-sm text-status-error/80 dark:text-status-error/80 mb-8 max-w-2xl leading-relaxed">
             Warning: These actions are irreversible. Performing a system reset will purge all AI-generated video caches, enrollment data, and student progress logs across the platform.
           </p>
           <Button variant="danger" className="rounded-xl px-8" onClick={() => setIsResetModalOpen(true)}>
             Factory Reset System
           </Button>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleFactoryReset}
        title="Confirm Factory Reset"
        message="Are you absolutely sure you want to purge all data? This action cannot be undone and will delete all user progress and course caches."
        confirmText="Yes, Reset System"
        isDanger={true}
      />
    </motion.div>
  );
};

// Extracted ChevronDown since it was used in select
const ChevronDown = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="m6 9 6 6 6-6"/></svg>
);

export default AdminSettings;
