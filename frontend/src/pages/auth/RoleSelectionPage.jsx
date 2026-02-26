import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import Icon from '../../components/ui/Icon.jsx';

function RoleSelectionPage() {
  const navigate = useNavigate();
  const { loginAsRole } = useAuth();

  const handleSelectRole = (role) => {
    loginAsRole(role);
    if (role === 'pharmacist') navigate(ROUTES.PHARMACIST.DASHBOARD);
    if (role === 'doctor') navigate(ROUTES.DOCTOR.DASHBOARD);
    if (role === 'patient') navigate(ROUTES.PATIENT.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background-light dark:bg-background-dark font-display">
      {/* Left: Branding */}
      <div className="lg:w-1/2 bg-deep-purple flex flex-col justify-center p-8 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-pink/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-md shadow-primary/20">
              <Icon name="shield_moon" size={24} className="text-white" />
            </div>
            <h2 className="text-white text-3xl font-black tracking-tight">RxGuard AI</h2>
          </div>
          <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight mb-6">
            AI-Powered Prescription Risk Intelligence
          </h1>
          <div className="flex flex-wrap gap-3 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-border/40">
              <Icon name="document_scanner" size={16} className="text-accent-pink" />
              <span className="text-white text-sm font-medium">OCR Scanning</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-border/40">
              <Icon name="pill" size={16} className="text-accent-pink" />
              <span className="text-white text-sm font-medium">Interaction Check</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-border/40">
              <Icon name="database" size={16} className="text-accent-pink" />
              <span className="text-white text-sm font-medium">FHIR Integration</span>
            </div>
          </div>
          <div className="bg-surface/5 backdrop-blur-md border border-border/40 rounded-2xl p-6 max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Icon name="warning" size={20} className="text-primary" />
                <span className="text-primary font-bold text-sm uppercase tracking-wider">
                  High Risk Alert
                </span>
              </div>
              <span className="text-white/40 text-xs">Just Now</span>
            </div>
            <p className="text-white text-lg font-semibold mb-2">Drug-Drug Interaction Detected</p>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Interaction between <span className="text-white font-medium italic">Warfarin</span> and{' '}
              <span className="text-white font-medium italic">Aspirin</span> may increase the risk of
              bleeding.
            </p>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Role selection + login form (static except role buttons) */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-foreground text-3xl font-bold mb-2">
              Welcome Back
            </h2>
            <p className="text-muted">
              Please select your role and sign in to your account.
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-foreground text-sm font-bold mb-4">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleSelectRole('pharmacist')}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 text-primary group transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                  <Icon name="local_pharmacy" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Pharmacist</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectRole('doctor')}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 text-muted hover:text-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-muted text-muted group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center">
                  <Icon name="medical_services" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Doctor</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectRole('patient')}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 text-muted hover:text-primary transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-surface-muted text-muted group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center">
                  <Icon name="person" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide">Patient</span>
              </button>
            </div>
          </div>

          {/* Static sign-in form UI (non-functional placeholder) */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-foreground text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted pointer-events-none">
                  <Icon name="mail" size={20} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="user@hospital.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-foreground text-sm font-bold"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-primary text-xs font-bold hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted pointer-events-none">
                  <Icon name="lock" size={20} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted cursor-pointer">
                  <Icon name="visibility" size={20} />
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-muted"
              >
                Remember this device
              </label>
            </div>
            <button
              type="button"
              onClick={() => handleSelectRole('pharmacist')}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform active:scale-[0.98]"
            >
              Quick Sign In as Pharmacist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionPage;

