export function GlobalStyles({ t }) {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: ${t.bg}; color: ${t.text}; font-family: 'Inter','Segoe UI',sans-serif; transition: background .25s, color .25s; }
      input, select, button { font-family: inherit; }
      input::placeholder { color: ${t.textFaint}; }
      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: ${t.surface}; }
      ::-webkit-scrollbar-thumb { background: ${t.border2}; border-radius: 4px; }
      @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      @keyframes spin    { to { transform: rotate(360deg); } }
      @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      .card-h:hover { transform: translateY(-2px); border-color: ${t.accent} !important; box-shadow: 0 6px 24px rgba(79,70,229,.18); }
      .card-h { transition: transform .18s, border-color .18s, box-shadow .18s; }
      .row-h:hover { background: ${t.surface2} !important; }
      .nav-h:hover { background: ${t.surface3} !important; color: ${t.accentSoft} !important; }
      .ibtn:hover { opacity: .7; }
    `}</style>
  );
}
