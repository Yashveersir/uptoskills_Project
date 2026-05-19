import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Archive, Calendar, Eye, Mail, MoreVertical, Pencil, Shield, Trash2, UserPlus, UserX } from "lucide-react";
import Button from "../../components/common/Button";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import DataTable from "../../components/common/DataTable";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { adminClasses } from "../../designTokens";

const initialUsers = [
  { id: 1, name: "Ayan Khan", email: "ayan@example.com", role: "Student", joined: "2026-05-12", status: "Active", cohortSize: 120 },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Student", joined: "2026-05-10", status: "Active", cohortSize: 80 },
  { id: 3, name: "Rahul Sharma", email: "rahul@example.com", role: "Intern", joined: "2026-05-08", status: "Pending", cohortSize: 42 },
  { id: 4, name: "John Admin", email: "admin@example.com", role: "Admin", joined: "2026-05-01", status: "Active", cohortSize: 12 },
  { id: 5, name: "Jessica Doe", email: "jessica@example.com", role: "Student", joined: "2026-04-28", status: "Suspended", cohortSize: 63 },
  { id: 6, name: "Mike Ross", email: "mike@example.com", role: "Mentor", joined: "2026-04-15", status: "Active", cohortSize: 210 },
  { id: 7, name: "Rachel Zane", email: "rachel@example.com", role: "Student", joined: "2026-04-10", status: "Active", cohortSize: 96 },
];

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
  const [users, setUsers] = useState(initialUsers);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    cohortSize: "50",
  });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const nameValid = formData.name.trim().length >= 2;
  const passwordScore = getPasswordScore(formData.password);
  const passwordValid = passwordScore >= 3;
  const cohortNumber = Number(formData.cohortSize);
  const cohortValid = Number.isFinite(cohortNumber) && cohortNumber >= 1 && cohortNumber <= 500;
  const canSubmit = nameValid && emailValid && passwordValid && cohortValid;

  const handleInvite = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setUsers((current) => [
      {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        joined: new Date().toISOString().slice(0, 10),
        status: "Pending",
        cohortSize: cohortNumber,
      },
      ...current,
    ]);
    setFormData({ name: "", email: "", password: "", role: "Student", cohortSize: "50" });
    setIsInviteOpen(false);
    toast.success("Invitation created successfully.");
  };

  const handleBulkDelete = (ids, clearSelection) => {
    setUsers((current) => current.filter((user) => !ids.includes(user.id)));
    clearSelection([]);
    toast.success("Selected users deleted.");
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
      render: (user) => user.role === "Admin" ? (
        <span className="inline-flex items-center gap-2 rounded-lg border border-secondary-500/20 bg-secondary-500/10 px-3 py-1 text-xs font-semibold text-secondary-600 dark:text-secondary-300">
          <Shield size={14} />
          {user.role}
        </span>
      ) : user.role,
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
      render: (user) => (
        <span className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Calendar size={14} />
          {new Date(user.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user) => (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "border-status-success/20 bg-status-success/10 text-status-success" : user.status === "Pending" ? "border-status-warning/20 bg-status-warning/10 text-status-warning" : "border-status-error/20 bg-status-error/10 text-status-error"}`}>
          {user.status}
        </span>
      ),
    },
    { key: "cohortSize", header: "Cohort", sortable: true },
  ], []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={adminClasses.label}>Access control</p>
          <h1 className={`${adminClasses.heading} mt-2`}>User Directory</h1>
          <p className={`${adminClasses.body} mt-2`}>Manage learners, interns, mentors, and admin permissions.</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setIsInviteOpen(true)}>
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
          { key: "role", label: "Role", options: ["Student", "Intern", "Mentor", "Admin"], multiple: true },
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
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Eye size={14} /> View</button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Pencil size={14} /> Edit</button>
              <button onClick={() => setDeleteTarget(user)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-status-error hover:bg-status-error/10"><UserX size={14} /> Delete</button>
            </div>
          </div>
        )}
        emptyTitle="No users found"
        emptyDescription="Clear filters or invite a new user to continue."
      />

      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite user"
        description="Real-time validation helps admins correct fields before submit."
        size="lg"
        footer={(
          <>
            <Button variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button type="submit" form="invite-form" variant="primary" disabled={!canSubmit}>Send Invite</Button>
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
              required
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
              <option>Student</option>
              <option>Intern</option>
              <option>Mentor</option>
              <option>Admin</option>
            </select>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setUsers((current) => current.filter((user) => user.id !== deleteTarget.id));
          toast.success("User deleted.");
        }}
        title="Delete user?"
        message={`This removes ${deleteTarget?.name || "this user"} from the admin directory.`}
        confirmText="Delete User"
        isDanger
      />
    </div>
  );
};

export default AdminUsers;
