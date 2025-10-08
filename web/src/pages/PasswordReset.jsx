import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice";

const LockKeyhole = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13V7a3 3 0 0 1 3-3h2M10 13a2 2 0 0 1-2-2v-1M10 13h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M9 11l3 3L22 4" />
  </svg>
);

const Loader2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// simple client-side password checks (no Zod)
const validatePassword = (pw) => {
  const errs = [];
  if (!pw) {
    errs.push("Password is required.");
    return errs;
  }
  if (pw.length < 8) errs.push("At least 8 characters.");
  if (pw.length > 64) errs.push("At most 64 characters.");
  if (!/[A-Z]/.test(pw)) errs.push("At least one uppercase letter.");
  if (!/[a-z]/.test(pw)) errs.push("At least one lowercase letter.");
  if (!/[0-9]/.test(pw)) errs.push("At least one number.");
  if (!/[^A-Za-z0-9]/.test(pw)) errs.push("At least one special character.");
  return errs;
};

const PasswordReset = ({ email }) => {
  const { token } = useParams(); // make sure route is /reset-password/:token
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    newPassword: [],
    confirmPassword: [],
    general: [],
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // live validation when typing
  const onNewPasswordChange = (e) => {
    const v = e.target.value;
    setNewPassword(v);

    const pwErrs = validatePassword(v);
    const confirmErrs = confirmPassword && v !== confirmPassword ? ["Passwords do not match."] : [];
    setFieldErrors({ ...fieldErrors, newPassword: pwErrs, confirmPassword: confirmErrs, general: [] });
  };

  const onConfirmPasswordChange = (e) => {
    const v = e.target.value;
    setConfirmPassword(v);

    const confirmErrs = newPassword !== v ? ["Passwords do not match."] : [];
    setFieldErrors({ ...fieldErrors, confirmPassword: confirmErrs, general: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear general server messages
    setFieldErrors({ newPassword: [], confirmPassword: [], general: [] });

    // client-side validate before dispatch
    const pwErrs = validatePassword(newPassword);
    const confirmErrs = newPassword !== confirmPassword ? ["Passwords do not match."] : [];

    if (pwErrs.length || confirmErrs.length) {
      setFieldErrors({ newPassword: pwErrs, confirmPassword: confirmErrs, general: [] });
      return;
    }

    setIsLoading(true);

    try {
      // important: send password & confirmPassword keys (server expects these)
      await dispatch(resetPassword({ token, email, password: newPassword, confirmPassword })).unwrap();

      setIsSuccess(true);
      setIsLoading(false);

      // navigate to login after small delay
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setIsLoading(false);

      // server might return different shapes — handle safely
      // 1) array style: err.errors = [{ param: 'password'|'confirmPassword'|..., msg: '...' }]
      if (Array.isArray(err?.errors)) {
        const server = { newPassword: [], confirmPassword: [], general: [] };
        err.errors.forEach((it) => {
          const msg = it.msg || it.message || JSON.stringify(it);
          // common validator param could be 'password' or 'confirmPassword' or 'newPassword'
          const param = it.param || it.field || ""; 
          if (param.toLowerCase().includes("confirm")) server.confirmPassword.push(msg);
          else if (param.toLowerCase().includes("pass")) server.newPassword.push(msg);
          else server.general.push(msg);
        });
        setFieldErrors(server);
      }
      // 2) single message
      else if (err?.message) {
        setFieldErrors((prev) => ({ ...prev, general: [err.message] }));
      }
      // 3) string
      else if (typeof err === "string") {
        setFieldErrors((prev) => ({ ...prev, general: [err] }));
      } else {
        setFieldErrors((prev) => ({ ...prev, general: ["Something went wrong."] }));
      }
    }
  };

  const handleBackToLogin = () => navigate("/login");

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <div className="max-w-md w-full p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 space-y-6">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-teal-400 mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white text-center">Password Updated!</h2>
            <p className="text-sm text-slate-400 text-center">You can now log in with your new password.</p>
          </div>
          <button onClick={handleBackToLogin} className="w-full py-3 rounded-xl font-semibold bg-teal-400 text-slate-900 hover:bg-teal-300 transition">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="max-w-md w-full p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="p-3 bg-teal-500/20 rounded-full mb-4">
            <LockKeyhole className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Set New Password</h2>
          <p className="text-sm text-slate-400 text-center">Choose a strong password with at least 8 characters.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-sm text-slate-300 mb-1">New Password</label>
            <input id="new-password" type="password" value={newPassword} onChange={onNewPasswordChange}
              className="w-full px-4 py-3 border border-slate-700 bg-slate-700 text-white rounded-xl placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••" disabled={isLoading} />
            {/* field errors */}
            {fieldErrors.newPassword.length > 0 && (
              <div className="mt-2 space-y-1">
                {fieldErrors.newPassword.map((m, i) => <p key={i} className="text-xs text-red-400">• {m}</p>)}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm text-slate-300 mb-1">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={onConfirmPasswordChange}
              className="w-full px-4 py-3 border border-slate-700 bg-slate-700 text-white rounded-xl placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••" disabled={isLoading} />
            {fieldErrors.confirmPassword.length > 0 && (
              <div className="mt-2 space-y-1">
                {fieldErrors.confirmPassword.map((m, i) => <p key={i} className="text-xs text-red-400">• {m}</p>)}
              </div>
            )}
          </div>

          {/* general/server errors */}
          {fieldErrors.general.length > 0 && (
            <div className="space-y-1">
              {fieldErrors.general.map((m, i) => <p key={i} className="text-sm text-red-400">• {m}</p>)}
            </div>
          )}

          <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center transition ${isLoading ? "bg-teal-600 opacity-75 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-400 text-slate-900"}`}>
            {isLoading ? (<><Loader2 className="animate-spin mr-2 h-5 w-5 text-slate-900" />Updating...</>) : ("Change Password")}
          </button>
        </form>

        <div className="text-center">
          <button onClick={handleBackToLogin} className="text-sm text-slate-500 hover:text-teal-400">← Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
