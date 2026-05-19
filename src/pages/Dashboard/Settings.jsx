import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { User, Bell, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1200);
  };

  const sections = [
    {
      title: "Profile Information",
      icon: <User size={20} className="text-primary-600" />,
      settings: [
        { label: "Display Name", default: "Learner Account", type: "input" },
        { label: "Email Address", default: "learner@example.com", type: "input" },
        { label: "Bio", default: "Passionate learner exploring AI and Development.", type: "textarea" },
      ]
    },
    {
      title: "Notifications",
      icon: <Bell size={20} className="text-primary-600" />,
      settings: [
        { label: "Email Notifications", default: true, type: "toggle" },
        { label: "New Course Alerts", default: true, type: "toggle" },
        { label: "Weekly Progress Report", default: false, type: "toggle" },
      ]
    },
    {
      title: "Security",
      icon: <Lock size={20} className="text-primary-600" />,
      settings: [
        { label: "Two-Factor Authentication", default: false, type: "toggle" },
        { label: "Account Privacy", default: "Public", type: "select", options: ["Public", "Private", "Mentors Only"] },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">Account Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Manage your profile, preferences, and account security.</p>
        </div>
        <Button variant="primary" isLoading={isSaving} onClick={handleSave} className="rounded-2xl px-8 shadow-xl shadow-primary-500/20">Save Profile</Button>
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
                  <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-1">{setting.label}</p>
                    <p className="text-xs text-neutral-400">Update your {setting.label.toLowerCase()} settings.</p>
                  </div>
                  
                  <div className="flex-shrink-0 w-full md:w-auto">
                    {setting.type === "toggle" && (
                      <button className={`w-12 h-6 rounded-full transition-all relative ${setting.default ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.default ? 'right-1' : 'left-1'}`} />
                      </button>
                    )}
                    
                    {setting.type === "input" && (
                      <Input 
                        type="text" 
                        defaultValue={setting.default}
                        containerClassName="w-full md:w-64"
                      />
                    )}

                    {setting.type === "textarea" && (
                      <textarea 
                        defaultValue={setting.default}
                        className="w-full md:w-64 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm text-neutral-900 dark:text-neutral-50 focus:border-primary-500 transition-colors h-24 resize-none"
                      />
                    )}

                    {setting.type === "select" && (
                      <select className="w-full md:w-64 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm text-neutral-900 dark:text-neutral-50 focus:border-primary-500 transition-colors appearance-none cursor-pointer">
                        {setting.options.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-10 rounded-[2.5rem] bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20">
           <div className="flex items-center gap-4 mb-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 text-primary-600 shadow-sm border border-primary-100 dark:border-primary-900/30">
               <ShieldCheck size={20} />
             </div>
             <h3 className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">Identity Verified</h3>
           </div>
           <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-0 max-w-2xl leading-relaxed">
             Your account is fully verified. You have access to all AI-curated curriculum and personalized mentor feedback sessions.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
