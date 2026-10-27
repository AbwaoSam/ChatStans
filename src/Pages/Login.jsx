import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/chat";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // If already logged in, bounce away from login
  useEffect(() => {
    document.title = "Login • ChatStans";
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateLogin(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      await login(form.email);
      navigate(redirectTo, { replace: true });
    } catch {
      setServerError("Could not log you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/logo2-removebg-preview.png" alt="ChatStans Logo" className="auth-brand__logo-img" />
          <h1 className="auth-brand__title">ChatStans</h1>
          <p className="auth-brand__subtitle">Sign in to continue chatting</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="form-error form-error--banner">{serverError}</div>}

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
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "is-invalid" : ""}
              placeholder="••••••••"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}