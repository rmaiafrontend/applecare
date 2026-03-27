// Aplicar tema antes do React montar para evitar flash branco
(function() {
  var theme = localStorage.getItem('admin-theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
