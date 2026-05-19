import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle, CheckCircle2, Eye, Image as ImageIcon, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { getCourses } from "../../api/courseApi";
import { mentors } from "../../constants/mentorData";
import Button from "../../components/common/Button";
import DataTable from "../../components/common/DataTable";
import ErrorState from "../../components/common/ErrorState";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { adminClasses } from "../../designTokens";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    teacherId: mentors[0].id,
    enrollmentLimit: "500",
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getCourses();
      setCourses(data.map((course, index) => ({
        ...course,
        id: course.id || index + 1,
        status: index % 3 === 0 ? "Pending" : "Live",
        category: index % 2 === 0 ? "Development" : "Career",
        enrollment: Math.floor(Math.random() * 5000),
      })));
    } catch (err) {
      console.error("Course load failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourses();
  }, [fetchCourses]);

  const titleValid = formData.title.trim().length >= 3;
  const descriptionValid = formData.description.trim().length >= 10;
  const enrollmentNumber = Number(formData.enrollmentLimit);
  const enrollmentValid = Number.isFinite(enrollmentNumber) && enrollmentNumber >= 10 && enrollmentNumber <= 10000;
  const canSubmit = titleValid && descriptionValid && enrollmentValid;

  const handleCreateCourse = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    const selectedMentor = mentors.find((mentor) => mentor.id === formData.teacherId);
    const newCourse = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      teacher: selectedMentor.name,
      status: "Live",
      category: "Development",
      enrollment: 0,
    };

    setCourses((current) => [newCourse, ...current]);
    setFormData({ title: "", description: "", image: "", teacherId: mentors[0].id, enrollmentLimit: "500" });
    setIsModalOpen(false);
    toast.success("Course created successfully.");
  };

  const handleBulkDelete = (ids, clearSelection) => {
    setCourses((current) => current.filter((course) => !ids.includes(course.id)));
    clearSelection([]);
    toast.success("Selected courses deleted.");
  };

  const columns = useMemo(() => [
    {
      key: "title",
      header: "Course",
      sortable: true,
      render: (course) => (
        <div className="flex items-center gap-4">
          <img
            src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop"}
            alt=""
            className="h-12 w-12 rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
          />
          <div>
            <p className="font-semibold text-neutral-900 dark:text-neutral-50">{course.title}</p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{course.category}</p>
          </div>
        </div>
      ),
    },
    { key: "teacher", header: "Mentor", sortable: true },
    { key: "enrollment", header: "Enrollments", sortable: true, render: (course) => course.enrollment.toLocaleString() },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (course) => (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${course.status === "Live" ? "border-status-success/20 bg-status-success/10 text-status-success" : "border-status-warning/20 bg-status-warning/10 text-status-warning"}`}>
          {course.status}
        </span>
      ),
    },
  ], []);

  if (error) {
    return <ErrorState onRetry={fetchCourses} title="Unable to load courses" message="Course data could not be loaded. Please retry the request." />;
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={adminClasses.label}>Content operations</p>
          <h1 className={`${adminClasses.heading} mt-2`}>Course Management</h1>
          <p className={`${adminClasses.body} mt-2`}>Review, approve, and organize learning content.</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Course
        </Button>
      </header>

      <DataTable
        data={courses}
        columns={columns}
        searchableKeys={["title", "teacher", "category"]}
        searchPlaceholder="Search courses, mentors, or categories..."
        filters={[
          { key: "status", label: "Status", options: ["Live", "Pending"], multiple: true },
          { key: "category", label: "Category", options: ["Development", "Career"], multiple: false },
        ]}
        bulkActions={[
          { label: "Delete", icon: Trash2, variant: "danger", onClick: handleBulkDelete },
        ]}
        rowActions={(course) => (
          <div className="relative inline-flex group/menu">
            <Button variant="ghost" size="sm" className="px-2" aria-label={`Actions for ${course.title}`}>
              <MoreVertical size={16} />
            </Button>
            <div className="invisible absolute right-0 top-full z-20 mt-2 w-44 origin-top-right scale-95 rounded-lg border border-neutral-200 bg-white py-2 text-left opacity-0 shadow-overlay transition-all group-hover/menu:visible group-hover/menu:scale-100 group-hover/menu:opacity-100 dark:border-neutral-800 dark:bg-neutral-900">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Eye size={14} /> View</button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"><Pencil size={14} /> Edit</button>
              {course.status === "Pending" && (
                <button
                  onClick={() => {
                    setCourses((current) => current.map((item) => item.id === course.id ? { ...item, status: "Live" } : item));
                    toast.success("Course approved.");
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-status-success hover:bg-status-success/10"
                >
                  <CheckCircle2 size={14} /> Approve
                </button>
              )}
              <button onClick={() => setDeleteTarget(course)} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-status-error hover:bg-status-error/10"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        )}
        isLoading={loading}
        emptyTitle="No courses found"
        emptyDescription="Create a course or clear filters to see more content."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create course"
        description="Add a production-ready course with validated fields."
        size="lg"
        footer={(
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" form="course-form" variant="primary" disabled={!canSubmit}>Launch Course</Button>
          </>
        )}
      >
        <form id="course-form" onSubmit={handleCreateCourse} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Course title"
            value={formData.title}
            onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
            isValid={titleValid}
            error={formData.title && !titleValid ? "Use at least 3 characters." : ""}
            required
          />
          <Input
            label="Cover image URL"
            type="url"
            icon={ImageIcon}
            value={formData.image}
            onChange={(event) => setFormData((current) => ({ ...current, image: event.target.value }))}
            helperText="Optional. Unsplash or CDN links work well."
          />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
              className={`min-h-32 w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-neutral-900 dark:text-neutral-50 ${formData.description && !descriptionValid ? "border-status-error" : "border-neutral-200 dark:border-neutral-800"} ${descriptionValid ? "border-status-success" : ""}`}
              required
            />
            {formData.description && !descriptionValid && <p className="mt-1 flex items-center gap-1 text-xs text-status-error"><AlertCircle size={12} /> Description must be at least 10 characters.</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Mentor</label>
            <select
              value={formData.teacherId}
              onChange={(event) => setFormData((current) => ({ ...current, teacherId: event.target.value }))}
              className="min-h-[44px] w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
            >
              {mentors.map((mentor) => <option key={mentor.id} value={mentor.id}>{mentor.name}</option>)}
            </select>
          </div>
          <Input
            label="Enrollment cap"
            type="number"
            min="10"
            max="10000"
            value={formData.enrollmentLimit}
            onChange={(event) => setFormData((current) => ({ ...current, enrollmentLimit: event.target.value }))}
            isValid={enrollmentValid}
            error={formData.enrollmentLimit && !enrollmentValid ? "Enter a value between 10 and 10,000." : ""}
            required
          />
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          setCourses((current) => current.filter((course) => course.id !== deleteTarget.id));
          toast.success("Course deleted.");
        }}
        title="Delete course?"
        message={`This will remove ${deleteTarget?.title || "this course"} from the admin catalog.`}
        confirmText="Delete Course"
        isDanger
      />
    </div>
  );
};

export default AdminCourses;
