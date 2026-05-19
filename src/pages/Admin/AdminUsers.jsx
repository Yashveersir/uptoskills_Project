import { useState, useMemo } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import { Search, UserPlus, Shield, UserX, Edit2, Mail, Calendar, ChevronDown, Filter, Download, Archive, Trash2, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  
  // Table Enhancements State
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [users, setUsers] = useState([
    { id: 1, name: "Ayan Khan", email: "ayan@example.com", role: "Student", joined: "2026-05-12", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Student", joined: "2026-05-10", status: "Active" },
    { id: 3, name: "Rahul Sharma", email: "rahul@example.com", role: "Student", joined: "2026-05-08", status: "Active" },
    { id: 4, name: "John Admin", email: "admin@example.com", role: "Admin", joined: "2026-05-01", status: "Active" },
    { id: 5, name: "Jessica Doe", email: "jessica@example.com", role: "Student", joined: "2026-04-28", status: "Suspended" },
    { id: 6, name: "Mike Ross", email: "mike@example.com", role: "Student", joined: "2026-04-15", status: "Active" },
    { id: 7, name: "Rachel Zane", email: "rachel@example.com", role: "Student", joined: "2026-04-10", status: "Active" },
  ]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === currentRows.length && currentRows.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentRows.map(u => u.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} user(s)?`)) {
      setUsers(users.filter(u => !selectedIds.includes(u.id)));
      setSelectedIds([]);
      toast.success("Selected users deleted successfully.");
      setCurrentPage(1);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success("User deleted successfully.");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
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

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        
        {/* Toolbar */}
        <div className="p-6 md:px-8 md:py-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-96">
            <Input 
              type="text" 
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              icon={Search}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto items-center">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                className="w-full px-6 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 text-sm outline-none text-neutral-600 dark:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors appearance-none cursor-pointer pr-12 min-h-[44px]"
              >
                <option>All Roles</option>
                <option>Student</option>
                <option>Admin</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
            </div>
            <Button variant="outline" className="hidden sm:flex items-center gap-2 whitespace-nowrap">
              <Filter size={16} /> Advanced Filters
            </Button>
          </div>
        </div>

        {/* Bulk Actions Banner */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-50 dark:bg-primary-500/10 border-b border-primary-100 dark:border-primary-500/20 px-8 py-3 flex justify-between items-center overflow-hidden"
            >
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{selectedIds.length} user(s) selected</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white text-xs gap-1 hidden sm:flex"><Download size={14}/> Export</Button>
                <Button variant="outline" size="sm" className="bg-white text-xs gap-1"><Archive size={14}/> Suspend</Button>
                <Button variant="danger" size="sm" className="text-xs gap-1" onClick={handleBulkDelete}><Trash2 size={14}/> Delete</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-background-header dark:bg-neutral-800/30 border-b border-neutral-200 dark:border-neutral-800">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer" 
                    checked={currentRows.length > 0 && selectedIds.length === currentRows.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('name')}>
                  Learner {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('role')}>
                  Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('joined')}>
                  Joined {sortConfig.key === 'joined' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 cursor-pointer hover:text-primary-500 transition-colors" onClick={() => handleSort('status')}>
                  Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {currentRows.map((user) => (
                <motion.tr 
                  layout
                  key={user.id} 
                  className={`hover:bg-primary-50 dark:hover:bg-neutral-800/40 transition-colors group ${selectedIds.includes(user.id) ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                >
                  <td className="px-8 py-6">
                    <input 
                      type="checkbox" 
                      className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleSelect(user.id)} 
                    />
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 font-bold text-sm shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50 leading-none mb-1.5 group-hover:text-primary-600 transition-colors">{user.name}</p>
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
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary-50 dark:bg-secondary-500/10 border border-secondary-100 dark:border-secondary-500/20">
                          <Shield size={14} className="text-secondary-600 dark:text-secondary-400" />
                          <span className="text-[10px] font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-widest">{user.role}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 px-2">{user.role}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      <Calendar size={14} />
                      {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      user.status === "Active" 
                        ? "bg-status-success/10 text-status-success border-status-success/20"
                        : "bg-status-error/10 text-status-error border-status-error/20"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 relative group/menu">
                      <button className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 hover:bg-primary-500/10 text-neutral-400 hover:text-primary-600 transition-all focus-visible:ring-2 focus-visible:ring-primary-500 outline-none">
                        <MoreVertical size={16} />
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 origin-top-right transform scale-95 group-hover/menu:scale-100">
                        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"><Edit2 size={14}/> Edit Profile</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-status-warning hover:bg-status-warning/10 flex items-center gap-2"><Archive size={14}/> Suspend User</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-status-error hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2" onClick={() => handleDeleteUser(user.id)}><UserX size={14}/> Delete Account</button>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="py-12 px-4">
              <EmptyState 
                title="No Users Found" 
                desc="We couldn't find any users matching your current search or filters."
                icon={Search}
              />
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredUsers.length > 0 && (
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-neutral-50/50 dark:bg-neutral-800/20">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing <span className="font-bold text-neutral-900 dark:text-neutral-100">{indexOfFirstRow + 1}</span> to <span className="font-bold text-neutral-900 dark:text-neutral-100">{Math.min(indexOfLastRow, filteredUsers.length)}</span> of <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredUsers.length}</span> users
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminUsers;