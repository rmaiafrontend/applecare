// Aplicar tema escuro apenas no admin — não afeta catálogo público
(function() {
  var isAdmin = window.location.pathname.toLowerCase().startsWith('/admin');
  if (!isAdmin) return;
  var theme = localStorage.getItem('admin-theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
