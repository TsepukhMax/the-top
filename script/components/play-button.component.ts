import { IComponent } from '../Interfaces/i-component';

// PlayButtonComponent
export class PlayButtonComponent implements IComponent {
  private playing: boolean = false;
  private button: HTMLButtonElement | null = null; // Вказано тип HTMLButtonElement або null
  private onClick: (playing: boolean) => void;

  constructor(cbOnClick: (playing: boolean) => void) {
    this.onClick = cbOnClick;
  }

  // method for render PlayButtonComponent
  public render(): HTMLButtonElement {
    this.button = document.createElement('button');
    this.button.classList.add('button-play');

    this.button.addEventListener('click', () => {
      this.playing = !this.playing;

      if (this.playing) {
        this.button.classList.add('button-stop');
      } else {
        this.button.classList.remove('button-stop');
      }

      this.onClick(this.playing);
    });

    return this.button;
  }

  // method for reset PlayButtonComponent
  public reset(): void {
    this.playing = false; // reset for false(no play)
    this.button.classList.remove('button-stop'); // remove "button-stop"
  }
}