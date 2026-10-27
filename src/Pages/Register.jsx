import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateRegister } from "../utils/validators";

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    document.title = "Create account • ChatStans";
    if (user) navigate("/chat", { replace: true });
  }, [user, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateRegister(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      await register(form.name, form.email);
      navigate("/chat", { replace: true });
    } catch {
      setServerError("Could not create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/logo2-removebg-preview.png" alt="ChatStans Logo" className="auth-brand__logo-img" />
          <h1 className="auth-brand__title">Create account</h1>
          <p className="auth-brand__subtitle">Join ChatStans in seconds</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="form-error form-error--banner">{serverError}</div>}

          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "is-invalid" : ""}
              placeholder="Jane Doe"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "is-invalid" : ""}
              placeholder="you@example.com"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "is-invalid" : ""}
              placeholder="At least 6 characters"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
              className={errors.confirm ? "is-invalid" : ""}
              placeholder="Repeat password"
            />
            {errors.confirm && <span className="form-error">{errors.confirm}</span>}
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}