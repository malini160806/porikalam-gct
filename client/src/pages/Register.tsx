import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, UserPlus } from 'lucide-react';
import { RegistrationWizard } from '@/components/auth/RegistrationWizard';
import { RegistrationSuccess } from '@/components/auth/RegistrationSuccess';
import gctBuilding from '@/assets/heritage/gct-building.webp.png';

export default function Register() {
  const navigate = useNavigate();

  const [result, setResult] = useState<{
    username: string;
    fullName: string;
  } | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-deep">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-navy-deep" />

        <div className="absolute inset-0 bp-grid-bg opacity-20" />

        <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />

        <div className="absolute bottom-[-10%] right-[10%] h-[450px] w-[450px] rounded-full bg-tech-blue/10 blur-[140px]" />
      </div>


      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}
      <section className="relative z-10 flex min-h-screen items-center px-5 py-10 sm:px-8 lg:px-12">

        <div className="mx-auto grid w-full max-w-7xl overflow-hidden border border-gold/20 bg-navy/40 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm lg:grid-cols-[0.8fr_1.4fr]">


          {/* =====================================================
              LEFT — EVENT BRANDING
          ===================================================== */}
          <div className="relative hidden min-h-[760px] overflow-hidden lg:flex">

            {/* GCT Building */}
            <motion.img
              src={gctBuilding}
              alt="Government College of Technology"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.35, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/80" />

            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />


            {/* Content */}
            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

              {/* Top */}
              <div>

                <div className="flex items-center gap-3">

                  <span className="h-px w-10 bg-gold" />

                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
                    Porikkalam 2026
                  </span>

                </div>


                <h1 className="mt-8 max-w-md font-heading text-5xl font-semibold leading-[1.05] tracking-wide text-cream xl:text-6xl">
                  Begin Your
                  <br />
                  <span className="text-gold">Journey.</span>
                </h1>


                <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-beige/75">
                  Create your participant profile once and unlock
                  access to every event, competition and activity
                  at Porikkalam 2026.
                </p>

              </div>


              {/* Middle decorative element */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-deep/70 text-gold">
                  <UserPlus size={20} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-gold">
                    One Profile
                  </p>

                  <p className="mt-1 font-body text-xs text-beige/60">
                    One username for every event
                  </p>
                </div>

              </div>


              {/* Bottom stats */}
              <div>

                <div className="mb-8 flex items-center gap-3">

                  <Sparkles size={16} className="text-gold" />

                  <span className="font-body text-xs uppercase tracking-[0.2em] text-beige/65">
                    Built For Engineers
                  </span>

                </div>


                <div className="grid max-w-md grid-cols-3 gap-3">

                  <div className="border border-gold/20 bg-navy-deep/60 p-4 backdrop-blur-sm">
                    <p className="font-heading text-2xl text-gold">
                      10+
                    </p>

                    <p className="mt-1 font-body text-[9px] uppercase tracking-wider text-beige/60">
                      Events
                    </p>
                  </div>


                  <div className="border border-gold/20 bg-navy-deep/60 p-4 backdrop-blur-sm">
                    <p className="font-heading text-2xl text-gold">
                      50+
                    </p>

                    <p className="mt-1 font-body text-[9px] uppercase tracking-wider text-beige/60">
                      Colleges
                    </p>
                  </div>


                  <div className="border border-gold/20 bg-navy-deep/60 p-4 backdrop-blur-sm">
                    <p className="font-heading text-2xl text-gold">
                      1
                    </p>

                    <p className="mt-1 font-body text-[9px] uppercase tracking-wider text-beige/60">
                      Profile
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>


          {/* =====================================================
              RIGHT — REGISTRATION
          ===================================================== */}
          <div className="relative flex min-h-[760px] items-center justify-center bg-cream p-5 sm:p-8 lg:p-10">

            {/* Paper grid */}
            <div className="pointer-events-none absolute inset-0 bp-grid-bg opacity-25" />

            {/* Corner decoration */}
            <div className="absolute right-0 top-0 h-32 w-32 border-l border-b border-gold/20" />

            <div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-gold/20" />


            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-4xl"
            >

              {!result ? (

                <>
                  {/* Header */}
                  <div className="mb-8 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white text-brown shadow-[0_0_30px_-8px_rgba(212,175,55,0.7)]">
                      <UserPlus size={24} strokeWidth={1.4} />
                    </div>


                    <p className="mt-5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-brown">
                      Participant Registration
                    </p>


                    <h2 className="mt-2 font-heading text-3xl font-semibold tracking-wide text-navy sm:text-4xl">
                      Create Your Profile
                    </h2>


                    <p className="mx-auto mt-2 max-w-lg font-body text-sm text-slate">
                      Register once and use your participant username
                      to access every Porikkalam event.
                    </p>


                    <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                      <span className="h-px w-12 bg-gold/50" />

                      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />

                      <span className="h-px w-12 bg-gold/50" />
                    </div>

                  </div>


                  {/* Registration wizard */}
                  <div className="border border-navy/10 bg-white/60 p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] sm:p-8">

                    <RegistrationWizard onSuccess={setResult} />

                  </div>


                  {/* Login link */}
                  <div className="mt-6 flex items-center justify-center gap-2">

                    <span className="font-body text-xs text-slate">
                      Already registered?
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="group inline-flex items-center gap-1 font-body text-xs font-semibold text-brown transition-colors hover:text-gold"
                    >
                      Sign in
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                  </div>

                </>

              ) : (

                /* Registration success */
                <div className="border border-navy/10 bg-white/60 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] sm:p-10">

                  <RegistrationSuccess
                    username={result.username}
                    fullName={result.fullName}
                    onContinue={() => navigate('/login')}
                  />

                </div>

              )}


              {/* Footer */}
              <p className="mt-6 text-center font-body text-[9px] uppercase tracking-[0.2em] text-slate/50">
                Government College of Technology · Coimbatore
              </p>

            </motion.div>

          </div>

        </div>

      </section>
    </main>
  );
}