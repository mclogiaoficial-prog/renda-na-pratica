const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

document.getElementById('year')?.append(new Date().getFullYear());

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('calcProfit')?.addEventListener('click', () => {
  const revenue = Math.max(0, Number(document.getElementById('revenue').value) || 0);
  const costs = Math.max(0, Number(document.getElementById('costs').value) || 0);
  const profit = revenue - costs;
  const panel = document.getElementById('profitResult');
  panel.querySelector('strong').textContent = money(profit);
  panel.querySelector('small').textContent = profit < 0
    ? 'Atenção: seus custos informados são maiores que o valor recebido.'
    : 'Esse é o resultado antes de eventuais impostos ou custos não informados.';
  panel.querySelector('strong').style.color = profit < 0 ? '#a33232' : '#102b24';
});

document.getElementById('calcGoal')?.addEventListener('click', () => {
  const goal = Math.max(0, Number(document.getElementById('monthlyGoal').value) || 0);
  const days = Math.min(31, Math.max(1, Number(document.getElementById('workingDays').value) || 1));
  const perDay = goal / days;
  const panel = document.getElementById('goalResult');
  panel.querySelector('strong').textContent = money(perDay);
  panel.querySelector('small').textContent = `Para chegar à meta de ${money(goal)} em ${days} dias. É uma meta de planejamento, não uma promessa de ganho.`;
});

document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
}));

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('siteSearch');
searchForm?.addEventListener('submit', event => {
  event.preventDefault();
  const term = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const items = [...document.querySelectorAll('.searchable')];
  let shown = 0;
  items.forEach(item => {
    const match = !term || (item.innerText + ' ' + (item.dataset.search || '')).toLocaleLowerCase('pt-BR').includes(term);
    item.classList.toggle('hidden', !match);
    if (match) shown++;
  });
  const noResults = document.getElementById('noResults');
  noResults?.classList.toggle('hidden', shown > 0);
  if (term && shown > 0) {
    document.querySelector('.section:has(.searchable:not(.hidden))')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (!term) {
    document.querySelectorAll('.searchable').forEach(item => item.classList.remove('hidden'));
  }
});
searchInput?.addEventListener('input', () => {
  if (!searchInput.value.trim()) {
    document.querySelectorAll('.searchable').forEach(item => item.classList.remove('hidden'));
    document.getElementById('noResults')?.classList.add('hidden');
  }
});
