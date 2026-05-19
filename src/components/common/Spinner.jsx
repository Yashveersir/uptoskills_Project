const Spinner = ({ size = "md", color = "primary" }) => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colors = {
    primary: "border-primary-600 border-t-transparent",
    accent: "border-accent-500 border-t-transparent",
    neutral: "border-neutral-500 border-t-transparent",
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className={`${sizes[size]} ${colors[color]} border-4 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;