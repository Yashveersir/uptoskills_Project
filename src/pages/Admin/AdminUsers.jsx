import { useCallback, useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Archive, Calendar, Eye, Mail, MoreVertical, Pencil, Shield, Trash2, UserPlus, UserX } from "lucide-react";
import Button from "../../components/common/Button";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import DataTable from "../../components/common/DataTable";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import ErrorState from "../../components/common/ErrorState";
import { createUser, getAdminUsers, deleteUser, updateUser } from "../../api";
import { adminClasses } from "../../designTokens";

const getPasswordScore = (password) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  return checks.filter(Boolean).length;
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    cohortSize: "50",
  });

  const openInviteModal = () => {
    setEditTarget(null);
    setFormData({ name: "", email: "", password: "", role: "student", cohortSize: "50" });
    setIsInviteOpen(true);
  };

  const openEditModal = (user) => {
    setEditTarget(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "student",
      cohortSize: user.cohortSize?.toString() || "50",
    });
    setIsInviteOpen(true);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const nameValid = formData.name.trim().length >= 2;
  const passwordScore = getPasswordScore(formData.password);
  const passwordValid = passwordScore >= 3;
  const cohortNumber = Number(formData.cohortSize);
  const cohortValid = Number.isFinite(cohortNumber) && cohortNumber >= 1 && cohortNumber <= 500;
  // In edit mode, password is optional (leave blank to keep existing)
  const canSubmit = nameValid && emailValid && cohortValid && (editTarget ? (formData.password === "" || passwordValid) : passwordValid);

  const handleInvite = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (editTarget) {
      try {
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          cohortSize: Number(formData.cohortSize),
        };
        // Only include password if the admin filled it in
        if (formData.password) updateData.password = formData.password;

        await updateUser(editTarget.id, updateData);
        setUsers((current) =>
          current.map((u) =>
            u.id === editTarget.id
              ? { ...u, name: formData.name, email: formData.email, role: formData.role, cohortSize: Number(formData.cohortSize) }
              : u
          )
        );
        setIsInviteOpen(false);
        setEditTarget(null);
        toast.success("User updated successfully.");
      } catch (err) {
        console.error("Update user failed:", err);
        toast.error(err.response?.data?.error || "Failed to update user.");
      }
      return;
    }

    try {
      const createdUser = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        cohortSize: cohortNumber,
      });

      setUsers((current) => [{ ...createdUser, cohortSize: cohortNumber }, ...current]);
      setFormData({ name: "", email: "", password: "", role: "student", cohortSize: "50" });
      setIsInviteOpen(false);
      toast.success("User created successfully.");
    } catch (err) {
      console.error("Create user failed:", err);
      toast.error(err.response?.data?.error || "Failed to create user.");
    }
  };

  const handleBulkDelete = async (ids, clearSelection) => {
    try {
      await Promise.all(ids.map((id) => deleteUser(id)));
      setUsers((current) => current.filter((user) => !ids.includes(user.id)));
      clearSelection([]);
      toast.success("Selected users deleted.");
    } catch (err) {
      console.error("Bulk delete failed:", err);
      toast.error("Failed to delete users.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(deleteTarget.id);
      setUsers((current) => current.filter((user) => user.id !== deleteTarget.id));
      toast.success("User deleted.");
    } catch (err) {
      console.error("Delete user failed:", err);
      toast.error("Failed to delete user.");
    }
  };

  const columns = useMemo(() => [
    {
      key: "name",
      header: "User",
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary-100 bg-secondary-50 text-sm font-semibold text-secondary-700 dark:border-secondary-500/20 dark:bg-secondary-500/10 dark:text-secondary-300">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-50">{user.name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"><Mail size={12} /> {user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (user) => user.role === "admin" ? (
        <span className="inline-flex items-center gap-2 rounded-lg border border-secondary-500/20 bg-secondary-500/10 px-3 py-1 text-xs font-semibold text-secondary-600 dark:text-secondary-300">
          <Shield size={14} />
          {user.role}
        </span>
      ) : (
        <span className="capitalize text-neutral-600 dark:text-neutral-300">{user.role}</span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
      render: (user) => (
        <span className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Calendar size={14} />
          {user.joined}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user) => (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "border-status-success/20 bg-status-success/10 text-status-success" : "border-status-warning/20 bg-status-warning/10 text-status-warning"}`}>
          {user.status}
        </span>
      ),
    },
    { key: "cohortSize", header: "Cohort", sortable: true },
  ], []);

  if (error) {
    return (
      <div className="space-y-8">
        <ErrorState 
          title="Unable to load users"
          message="We couldn't fetch the user directory. Please try again."
          onRetry={fetchUsers}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={adminClasses.label}>Access control</p>
          <h1 className={`${adminClasses.heading} mt-2`}>User Directory</h1>
          <p className={`${adminClasses.body} mt-2`}>Manage learners, interns, mentors, and admin permissions.</p>
        </div>
        <Button variant="primary" size="lg" onClick={openInviteModal}>
          <UserPlus size={18} />
          Invite New User
        </Button>
      </header>

      <DataTable
        data={users}
        columns={columns}
        searchableKeys={["name", "email", "role", "status"]}
        searchPlaceholder="Search by name, email, role, or status..."
        filters={[
          { key: "role", label: "Role", options: ["student", "intern", "mentor", "admin"], multiple: true },
          { key: "status", label: "Status", options: ["Active", "Pending", "Suspended"], multiple: false },
        ]}
        bulkActions={[
          { label: "Suspend", icon: Archive, variant: "outline", onClick: (ids, clearSelection) => {
            setUsers((current) => current.map((user) => ids.includes(user.id) ? { ...user, status: "Suspended" } : user));
            clearSelection([]);
            toast.success("Selected users suspended.");
          }},
          { label: "Delete", icon: Trash2, variant: "danger", onClick: handleBulkDelete },
        ]}
        rowActions={(user) => (
          <div className="relative inline-flex group/menu">
            <Button variant="ghost" size="sm" className="px-2" aria-label={`Actions for ${user.name}`}>
              <MoreVertical size={16} />
            </Button>
            <div className="invisible absolute right-0 top-full z-20 mt-2 w-44 origin-top-right scale-95 rounded-lg border border-neutral-200 bg-white py-2 text-left opacity-0 shadow-overlay transition-all group-hover/menu:visible group-hover/menu:scale-100 group-hover/menu:opacity-100 dark:border-neutral-800 dark:bg-neutral-900">
              <button onClick={() => setViewTarget(user)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Eye size={14} /> View</button>
              <button onClick={() => openEditModal(user)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Pencil size={14} /> Edit</button>
              <button onClick={() => setDeleteTarget(user)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-status-error hover:bg-status-error/10"><UserX size={14} /> Delete</button>
            </div>
          </div>
        )}
        isLoading={loading}
        emptyTitle="No users found"
        emptyDescription="Clear filters or invite a new user to continue."
      />

      <Modal
        isOpen={isInviteOpen}
        onClose={() => { setIsInviteOpen(false); setEditTarget(null); }}
        title={editTarget ? "Edit User" : "Invite user"}
        description={editTarget ? "Update user details below." : "Real-time validation helps admins correct fields before submit."}
        size="lg"
        footer={(
          <>
            <Button variant="ghost" onClick={() => { setIsInviteOpen(false); setEditTarget(null); }}>Cancel</Button>
            <Button type="submit" form="invite-form" variant="primary" disabled={!canSubmit}>{editTarget ? "Save Changes" : "Send Invite"}</Button>
          </>
        )}
      >
        <form id="invite-form" onSubmit={handleInvite} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Full name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            isValid={nameValid}
            error={formData.name && !nameValid ? "Name is required." : ""}
            required
          />
          <Input
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            isValid={emailValid}
            error={formData.email && !emailValid ? "Enter a valid email address." : ""}
            required
          />
          <div>
            <Input
              label="Temporary password"
              type="password"
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
              isValid={passwordValid}
              error={formData.password && !passwordValid ? "Use 8+ chars with upper, number, or symbol." : ""}
              required={!editTarget}
            />
            <div className="mt-2 grid grid-cols-4 gap-1" aria-label="Password strength">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`h-1.5 rounded-full ${passwordScore >= step ? step < 3 ? "bg-status-warning" : "bg-status-success" : "bg-neutral-200 dark:bg-neutral-800"}`} />
              ))}
            </div>
          </div>
          <Input
            label="Cohort capacity"
            type="number"
            min="1"
            max="500"
            value={formData.cohortSize}
            onChange={(event) => setFormData((current) => ({ ...current, cohortSize: event.target.value }))}
            isValid={cohortValid}
            error={formData.cohortSize && !cohortValid ? "Capacity must be between 1 and 500." : ""}
            required
          />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Role</label>
            <select
              value={formData.role}
              onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}
              className="min-h-[44px] w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
            >
              <option>student</option>
              <option>intern</option>
              <option>mentor</option>
              <option>admin</option>
            </select>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteUser}
        title="Delete user?"
        message={`This removes ${deleteTarget?.name || "this user"} from the admin directory.`}
        confirmText="Delete User"
        isDanger
      />

      {/* User Details View Modal */}
      <Modal
        isOpen={Boolean(viewTarget)}
        onClose={() => setViewTarget(null)}
        title="User Details"
        description="Read-only overview of the selected user account."
        size="md"
        footer={<Button variant="ghost" onClick={() => setViewTarget(null)}>Close</Button>}
      >
        {viewTarget && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-secondary-100 bg-secondary-50 text-xl font-bold text-secondary-700 dark:border-secondary-500/20 dark:bg-secondary-500/10 dark:text-secondary-300">
                {viewTarget.name?.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{viewTarget.name}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{viewTarget.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: "Role", value: viewTarget.role },
                { label: "Status", value: viewTarget.status },
                { label: "Joined", value: viewTarget.joined },
                { label: "Cohort Size", value: viewTarget.cohortSize },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
                  <p className="mt-1 text-sm font-medium capitalize text-neutral-900 dark:text-neutral-50">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminUsers;
