import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { 
  Shield, 
  Monitor, 
  Database
} from "lucide-react";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("System settings updated successfully!");
    }, 1200);
  };

  const sections = [
    {
      title: "Security & Authentication",
      icon: <Shield size={20} className="text-primary-600" />,
      settings: [
        { label: "Enforce 2FA for Admins", default: true, type: "toggle" },
        { label: "Session Timeout (Minutes)", default: "60", type: "input" },
        { label: "Strict AI Persona Validation", default: true, type: "toggle" },
      ]
    },
    {
      title: "Platform Configuration",
      icon: <Monitor size={20} className="text-primary-600" />,
      settings: [
        { label: "Maintenance Mode", default: false, type: "toggle" },
        { label: "Public Registration", default: true, type: "toggle" },
        { label: "Default AI Video Resolution", default: "1080p", type: "select", options: ["720p", "1080p", "4K"] },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">System Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Configure global platform behavior and security protocols.</p>
        </div>
        <Button variant="primary" isLoading={isSaving} onClick={handleSave} className="rounded-2xl px-8 shadow-xl shadow-primary-500/20">Save All Changes</Button>
      </header>

      <div className="space-y-8 pb-20">
        {sections.map((section) => (
          <div key={section.title} className="bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-soft">
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-4 bg-neutral-50/50 dark:bg-neutral-800/30">
               <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800 text-primary-600">
                 {section.icon}
               </div>
               <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">{section.title}</h2>
            </div>
            
            <div className="p-8 space-y-8">
              {section.settings.map((setting) => (
                <div key={setting.label} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-1">{setting.label}</p>
                    <p className="text-xs text-neutral-400">Modify this parameter to adjust system behavior.</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {setting.type === "toggle" && (
                      <button className={`w-12 h-6 rounded-full transition-all relative ${setting.default ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.default ? 'right-1' : 'left-1'}`} />
                      </button>
                    )}
                    
                    {setting.type === "input" && (
                      <Input 
                        type="text" 
                        defaultValue={setting.default}
                        containerClassName="w-24"
                        className="text-center"
                      />
                    )}

                    {setting.type === "select" && (
                      <select className="px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm min-w-[120px] text-neutral-900 dark:text-neutral-50 focus:border-primary-500 transition-colors appearance-none cursor-pointer text-center">
                        {setting.options.map(opt => <option key={opt} selected={opt === setting.default}>{opt}</option>)}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-10 rounded-[2.5rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 text-red-500 shadow-sm border border-red-100 dark:border-red-900/30">
               <Database size={20} />
             </div>
             <h3 className="text-xl font-display font-bold text-red-600 dark:text-red-400">Danger Zone</h3>
           </div>
           <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-8 max-w-2xl leading-relaxed">
             Warning: These actions are irreversible. Performing a system reset will purge all AI-generated video caches, enrollment data, and student progress logs across the platform.
           </p>
           <Button variant="danger" className="rounded-xl px-8">
             Factory Reset System
           </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;