import { IComponent } from '../interfaces/i-component';

//NewsletterComponent
export class NewsletterComponent implements IComponent{

  public render(): HTMLElement {
    const newsletterSection = document.createElement('section');
    newsletterSection.classList.add('newsletter-section');

    const container = document.createElement('div');
    container.classList.add('container');
    newsletterSection.appendChild(container);

    const description = document.createElement('div');
    description.classList.add('newsletter-description');
    container.appendChild(description);

    description.appendChild(this.createColumnsData());

    return newsletterSection;
  }

  private createColumnsData(): HTMLElement {
    const columns = document.createElement('div');
    columns.classList.add('newsletter-columns');

    const title = document.createElement('h2');
    title.textContent = 'Sign up to receive the latest updates and news';

    const form = document.createElement('form');
    form.action = '#';

    const input = document.createElement('input');
    input.placeholder = 'Enter your email';
    input.type = 'email';
    input.name = 'email';

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Submit';

    // Building form structure
    form.appendChild(input);
    form.appendChild(button);

    // Building columns structure
    columns.appendChild(title);
    columns.appendChild(form);

    return columns;
  }
}