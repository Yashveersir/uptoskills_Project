import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { User, Bell, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { updateUserProfile, updateUserSettings } from "../../api/authApi";
import { login as loginAction } from "../../store/slices/authSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    displayName: user?.name || "Learner Account",
    email: user?.email || "learner@example.com",
    bio: user?.bio || "Passionate learner exploring AI and Development.",
    emailNotifications: true,
    newCourseAlerts: true,
    weeklyProgressReport: false,
    twoFactorAuth: false,
    accountPrivacy: "Public",
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update profile (name + bio)
      const updatedUser = await updateUserProfile({
        name: settings.displayName,
        bio: settings.bio,
      });

      // Update settings (notifications, privacy)
      await updateUserSettings({
        emailNotifications: settings.emailNotifications,
        newCourseAlerts: settings.newCourseAlerts,
        weeklyProgressReport: settings.weeklyProgressReport,
        twoFactorAuth: settings.twoFactorAuth,
        accountPrivacy: settings.accountPrivacy,
      });

      // Sync Redux store so navbar/header reflects the new name
      dispatch(loginAction({
        token,
        user: { ...user, ...updatedUser },
        role: user?.role,
      }));

      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error("Save settings error:", err);
      toast.error(err.response?.data?.error || "Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    {
      title: "Profile Information",
      icon: <User size={20} className="text-primary-600 dark:text-primary-400" />,
      settings: [
        { key: "displayName", label: "Display Name", type: "input", default: "Learner Account" },
        { key: "email", label: "Email Address", type: "input", default: "learner@example.com" },
        { key: "bio", label: "Bio", type: "textarea", default: "Passionate learner exploring AI and Development." },
      ]
    },
    {
      title: "Notifications",
      icon: <Bell size={20} className="text-primary-600 dark:text-primary-400" />,
      settings: [
        { key: "emailNotifications", label: "Email Notifications", type: "toggle", default: true },
        { key: "newCourseAlerts", label: "New Course Alerts", type: "toggle", default: true },
        { key: "weeklyProgressReport", label: "Weekly Progress Report", type: "toggle", default: false },
      ]
    },
    {
      title: "Security",
      icon: <Lock size={20} className="text-primary-600 dark:text-primary-400" />,
      settings: [
        { key: "twoFactorAuth", label: "Two-Factor Authentication", type: "toggle", default: false },
        { key: "accountPrivacy", label: "Account Privacy", type: "select", options: ["Public", "Private", "Mentors Only"], default: "Public" },
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">Account Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Manage your profile, preferences, and account security.</p>
        </div>
        <Button variant="primary" isLoading={isSaving} onClick={handleSave} className="rounded-2xl px-8 shadow-xl shadow-primary-500/20">Save Changes</Button>
      </header>

      <div className="space-y-8 pb-20">
        {sections.map((section) => (
          <div key={section.title} className="bg-white dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-soft">
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-4 bg-neutral-50/50 dark:bg-neutral-800/30">
              <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800 text-primary-600 dark:text-primary-400">
                {section.icon}
              </div>
              <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">{section.title}</h2>
            </div>
            
            <div className="p-8 space-y-8">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 p-4 -mx-4 rounded-2xl transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-1">{setting.label}</p>
                    <p className="text-xs text-neutral-400">Update your {setting.label.toLowerCase()} settings.</p>
                  </div>
                  
                  <div className="flex-shrink-0 w-full md:w-auto">
                    {setting.type === "toggle" && (
                      <button 
                        onClick={() => handleToggle(setting.key)}
                        className={`w-12 h-6 rounded-full transition-all relative focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 outline-none ${settings[setting.key] ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                        role="switch"
                        aria-checked={settings[setting.key]}
                        aria-label={setting.label}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings[setting.key] ? 'right-1' : 'left-1'}`} />
                      </button>
                    )}
                    
                    {setting.type === "input" && (
                      <Input 
                        type="text" 
                        value={settings[setting.key]}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        containerClassName="w-full md:w-64"
                      />
                    )}

                    {setting.type === "textarea" && (
                      <textarea 
                        value={settings[setting.key]}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="w-full md:w-64 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm text-neutral-900 dark:text-neutral-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all h-24 resize-none"
                      />
                    )}

                    {setting.type === "select" && (
                      <div className="relative">
                        <select 
                          value={settings[setting.key]}
                          onChange={(e) => handleChange(setting.key, e.target.value)}
                          className="w-full md:w-64 px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 outline-none text-sm text-neutral-900 dark:text-neutral-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer text-center pr-8"
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

        <div className="p-10 rounded-[2.5rem] bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-900/30">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">Identity Verified</h3>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-0 max-w-2xl leading-relaxed">
            Your account is fully verified. You have access to all AI-curated curriculum and personalized mentor feedback sessions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Extracted ChevronDown since it was used in select
const ChevronDown = ({ className, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="m6 9 6 6 6-6"/></svg>
);

export default Settings;
