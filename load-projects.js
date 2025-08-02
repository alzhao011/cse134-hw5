// load-projects.js
import './project-card.js';

function renderProjects(data) {
  const container = document.getElementById('project-container');
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('project-card');
    card.setAttribute('href', item.link);
    card.innerHTML = `
      <span slot="title">${item.title}</span>
      <img slot="image" src="${item.image}" alt="${item.alt}">
      <span slot="description">${item.description}</span>
      <span slot="link-text">View →</span>
    `;
    container.appendChild(card);
  });
}

async function loadRemote() {
  try {
    const res = await fetch('https://my-json-server.typicode.com/alzhao011/cse134-hw4/db.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { projects } = await res.json();
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects(projects);
  } catch (err) {
    console.error('Failed to load remote projects:', err);
    alert('Error loading remote projects. See console for details.');
  }
}

function loadLocal() {
  const data = JSON.parse(localStorage.getItem('projects') || '[]');
  renderProjects(data);
}

document.getElementById('load-remote').addEventListener('click', loadRemote);
document.getElementById('load-local').addEventListener('click', loadLocal);
