import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

export function AuthForm() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription?.unsubscribe();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Login realizado com sucesso.');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    } else {
      setMessage('Logout realizado com sucesso.');
    }

    setLoading(false);
  };

  return (
    <section className="bg-[#151518] border border-[#222225] rounded-3xl p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-white">Acesso ao Hub</h2>
            <p className="text-sm text-[#A3A198]">Entre para editar suas preferências e acessar o painel.</p>
          </div>
          {user ? (
            <div className="rounded-2xl bg-[#0E0E10] px-4 py-2 text-xs text-[#A3A198] border border-[#222225]">
              {user.email}
            </div>
          ) : null}
        </div>

        {user ? (
          <div className="space-y-4">
            <p className="text-sm text-[#D8D8D8]">Bem-vindo(a), <span className="font-semibold text-white">{user.email}</span>.</p>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-[#FFD43B] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#e0bf31] disabled:opacity-60"
            >
              {loading ? 'Saindo...' : 'Logout'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="grid gap-4">
            <label className="grid gap-2 text-sm text-[#A3A198]">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-2xl border border-[#222225] bg-[#0E0E10] px-4 py-3 text-sm text-white outline-none focus:border-[#FFD43B]"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#A3A198]">
              Senha
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-2xl border border-[#222225] bg-[#0E0E10] px-4 py-3 text-sm text-white outline-none focus:border-[#FFD43B]"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-[#FFD43B] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e0bf31] disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Login'}
            </button>
          </form>
        )}

        {error ? <p className="text-sm text-[#FF6B6B]">{error}</p> : null}
        {message ? <p className="text-sm text-[#B7F7B7]">{message}</p> : null}
      </div>
    </section>
  );
}
