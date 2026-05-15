import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginUser from "../scripts/services/loginUser";

//components
import LoginStrip from "../components/headers/LoginStrip";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await loginUser({
        email,
        password,
      });

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      if(user.RegType !== 'Admin'){
        toast.error('Invalid registration type. Only admins can login here.');
        setEmail('');
        setPassword('');
        navigate('/login');
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success('Login Successful!!!');

      setTimeout(()=>{
        switch (user.RegType) {
          case "Admin":
            navigate("/dashboard");
            break;
          default:
            console.error('Invalid registration type'); 
        }
      }, 3000);

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 background">
        <LoginStrip/>
        <div
          className="card shadow p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h1 className="h3 mb-4 text-center fw-bold page-title">Login</h1>

          {error && (
            <div className="alert login-alert py-2 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label login-label">Email</label>
              <input
                type="email"
                className="form-control blue reg-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label login-label">Password</label>
              <input
                type="password"
                className="form-control blue reg-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}