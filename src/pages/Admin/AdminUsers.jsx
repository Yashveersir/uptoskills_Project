import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { Search, UserPlus, Shield, UserX, Edit2, Mail, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  
  const users = [
    { id: 1, name: "Ayan Khan", email: "ayan@example.com", role: "Student", joined: "May 12, 2026", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Student", joined: "May 10, 2026", status: "Active" },
    { id: 3, name: "Rahul Sharma", email: "rahul@example.com", role: "Student", joined: "May 08, 2026", status: "Active" },
    { id: 4, name: "John Admin", email: "admin@example.com", role: "Admin", joined: "May 01, 2026", status: "Active" },
    { id: 5, name: "Jessica Doe", email: "jessica@example.com", role: "Student", joined: "Apr 28, 2026", status: "Suspended" },
  ];

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2 tracking-tight">User Directory</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Manage learner accounts and platform permissions.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2 rounded-2xl py-3.5 px-8 shadow-xl shadow-primary-500/20">
          <UserPlus size={18} />
          Invite New User
        </Button>
      </header>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-soft">
        <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-96">
            <Input 
              type="text" 
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 text-sm outline-none text-neutral-600 dark:text-neutral-400 focus:border-primary-500 transition-colors appearance-none cursor-pointer pr-12"
              >
                <option>All Roles</option>
                <option>Student</option>
                <option>Admin</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50/50 dark:bg-neutral-800/30">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Learner</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Role</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Joined</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredUsers.map((user) => (
                <motion.tr 
                  layout
                  key={user.id} 
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/20 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-500/10 to-orange-400/10 border border-primary-100 dark:border-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 leading-none mb-1.5">{user.name}</p>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                          <Mail size={12} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {user.role === "Admin" ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-500/10 border border-accent-100 dark:border-accent-500/20">
                          <Shield size={14} className="text-accent-600 dark:text-accent-400" />
                          <span className="text-[10px] font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">{user.role}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{user.role}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500 font-medium">
                      <Calendar size={14} />
                      {user.joined}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      user.status === "Active" 
                        ? "bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                        : "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 text-neutral-400 hover:text-primary-600 transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-500/10 text-neutral-400 hover:text-red-600 transition-all">
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-neutral-400 text-sm italic">No users found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;