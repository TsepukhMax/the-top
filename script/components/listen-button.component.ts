import { IComponent } from '../interfaces';

//ListenButtonComponent
export class ListenButtonComponent implements IComponent {
  private button: HTMLButtonElement;
  private onClick: () => void | Promise<void>;

  constructor(onClick: () => void | Promise<void>) {
    this.onClick = onClick;
  }

  // render
  public render(): HTMLElement {
    this.button = document.createElement('button');
    this.button.classList.add('button');
    this.button.textContent = 'listen';

    // add event for click
    this.button.addEventListener('click', this.onClick);

    return this.button;
  }
}