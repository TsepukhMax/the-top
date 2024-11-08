import { IComponent } from '../interfaces/i-component';
import { IClickProps } from '../interfaces/i-click-props';

//ListenButtonComponent
export class ListenButtonComponent implements IComponent {
  private button: HTMLButtonElement;
  private onClick: () => void;

  constructor(props: IClickProps) {
    this.onClick = props.onClick;
  }

  // render
  public render(): HTMLButtonElement {
    this.button = document.createElement('button');
    this.button.classList.add('button');
    this.button.textContent = 'listen';

    // add event for click
    this.button.addEventListener('click', this.onClick);

    return this.button;
  }
}