import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import toast from "react-hot-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateAndSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for joining our learning community!");
    setEmail("");
  };

  const footerLinks = {
    platform: [
      { label: "Courses", path: "/courses" },
      { label: "Mentors", path: "#" },
      { label: "Learning Paths", path: "#" },
      { label: "Certifications", path: "#" },
    ],
    resources: [
      { label: "Community", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Help Center", path: "#" },
      { label: "Privacy Policy", path: "#" },
    ],
    company: [
      { label: "About Us", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Contact", path: "#" },
      { label: "Partners", path: "#" },
    ]
  };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Branding & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-indigo-500 to-orange-400 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                AI <span className="text-primary-600">Learn</span>
              </h1>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm leading-relaxed text-sm">
              Experience the next generation of education. Master any skill with world-class AI mentors, anywhere, anytime. Our platform synthesizes pedagogy and technology for elite learning.
            </p>
            
            <div className="flex flex-col gap-3 max-w-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Join our learning community</p>
              <form onSubmit={validateAndSubmit} className="flex gap-2">
                <div className="flex-1">
                  <Input 
                    type="email" 
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    error={emailError}
                    containerClassName="!mb-0"
                  />
                </div>
                <Button variant="primary" size="sm" className="rounded-xl" type="submit">Join</Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50 mb-6">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-neutral-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50 mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-neutral-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-50 mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-neutral-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
            © {currentYear} AI Learn Platform. Built with ❤️ for modern learners.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
              <a key={social} href="#" className="text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-neutral-50 font-medium transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;