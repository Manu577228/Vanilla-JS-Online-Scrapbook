document.addEventListener('DOMContentLoaded', () => {
    const scrapbook = document.getElementById('scrapbook');
    const addScrapButton = document.getElementById('addScrapButton');
    const modal = document.getElementById('modal');
    const scrapForm = document.getElementById('scrapForm');
    const cancelButton = document.getElementById('cancelButton');
  
    function saveToLocalStorage(scraps) {
      localStorage.setItem('scraps', JSON.stringify(scraps));
    }
  
    function loadFromLocalStorage() {
      return JSON.parse(localStorage.getItem('scraps')) || [];
    }
  
    function renderScraps(scraps) {
      scrapbook.innerHTML = '';
      scraps.forEach(scrap => {
        const scrapElement = document.createElement('div');
        scrapElement.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-5', 'transition', 'duration-300', 'transform', 'hover:scale-105', 'card');
        scrapElement.innerHTML = `
          <h2 class="text-2xl font-bold text-gray-800">${scrap.title}</h2>
          <p class="text-gray-600 mt-2">${scrap.description}</p>
        `;
        scrapbook.appendChild(scrapElement);
      });
    }
  
    addScrapButton.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  
    cancelButton.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    scrapForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
  
      const scraps = loadFromLocalStorage();
      scraps.push({ title, description });
      saveToLocalStorage(scraps);
      renderScraps(scraps);
  
      scrapForm.reset();
      modal.classList.add('hidden');
    });
  
    // Initial render
    renderScraps(loadFromLocalStorage());
  });
  