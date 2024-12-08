class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const style = `
            <style>
                :host {
                    display: inline-block;
                    width: 350px;
                    height: 500px;
                    background: var(--card-bg-color, #fff);
                    border: 10px solid var(--border-color, #fcd12a); /* Yellow border */
                    border-radius: 16px;
                    font-family: 'Arial', sans-serif;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    position: relative;
                    box-sizing: border-box;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px;
                    background: var(--header-color, #f00);
                    color: white;
                    font-weight: bold;
                    font-size: 1.2rem;
                    text-transform: uppercase;
                    border-bottom: 4px solid var(--border-color, #fcd12a);
                }

                .card-body {
                    padding: 15px;
                    text-align: center;
                    height: calc(100% - 130px); /* Adjust height for header/footer */
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .image-container {
                    margin: 10px auto;
                    padding: 5px;
                    border: 2px solid var(--border-color, #fcd12a);
                    border-radius: 8px;
                    background: #fff;
                    width: 80%;
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-container img {
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 8px;
                }

                .description, .abilities {
                    margin: 10px 0;
                    text-align: left;
                    font-size: 0.9rem;
                    color: #333;
                }

                .footer {
                    padding: 10px;
                    font-size: 0.8rem;
                    text-align: center;
                    color: #666;
                    border-top: 2px solid var(--border-color, #fcd12a);
                    background: #fafafa;
                }
            </style>
        `;

        const template = `
            <div class="card">
                <div class="card-header">
                    <slot name="title">Card Title</slot>
                    <slot name="stats"></slot>
                </div>
                <div class="card-body">
                    <div class="image-container">
                        <slot name="image"></slot>
                    </div>
                    <div class="description">
                        <slot name="description">Default card description.</slot>
                    </div>
                    <div class="abilities">
                        <slot name="abilities"></slot>
                    </div>
                </div>
                <div class="footer">
                    <slot name="footer">Footer text here.</slot>
                </div>
            </div>
        `;

        this.shadowRoot.innerHTML = `${style}${template}`;
    }

    static get observedAttributes() {
        return ['theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'theme') {
            const themes = {
                fire: {
                    '--card-bg-color': '#ffe6e6',
                    '--header-color': '#f00',
                    '--border-color': '#fcd12a',
                },
                water: {
                    '--card-bg-color': '#e6f7ff',
                    '--header-color': '#007bff',
                    '--border-color': '#0056b3',
                },
            };
            const theme = themes[newValue] || themes.fire;
            Object.entries(theme).forEach(([key, value]) => {
                this.style.setProperty(key, value);
            });
        }
    }

    connectedCallback() {
        if (this.getAttribute('theme')) {
            this.attributeChangedCallback('theme', null, this.getAttribute('theme'));
        }
    }
}

customElements.define('card-component', CardComponent);
