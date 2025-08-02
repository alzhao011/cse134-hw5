// project-card.js
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --card-bg: var(--secondary-color, #f5f5f5);
      --card-radius: 0.5rem;
      display: block;
      background: var(--card-bg);
      border-radius: var(--card-radius);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      font-family: sans-serif;
    }
    .card { display: flex; flex-direction: column; height: 100%; }
    h2 { margin: 0.5rem; font-size: 1.25rem; }
    picture, img { width: 100%; height: auto; flex-shrink: 0; }
    p { flex: 1; padding: 0.5rem; margin: 0; }
    a { display: block; padding: 0.5rem; text-align: right; text-decoration: none; font-weight: bold; }
  </style>
  <div class="card">
    <h2><slot name="title"></slot></h2>
    <picture><slot name="image"></slot></picture>
    <p><slot name="description"></slot></p>
    <a><slot name="link-text">Learn more →</slot></a>
  </div>
`;

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    if (this.hasAttribute('href')) {
      this.shadowRoot.querySelector('a').href = this.getAttribute('href');
    }
  }
}

customElements.define('project-card', ProjectCard);
