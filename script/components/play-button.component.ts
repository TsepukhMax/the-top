import { IComponent } from './i-component';

// PlayButtonComponent
class PlayButtonComponent implements IComponent {
  private playing: boolean = false;
  private button;
  private onClick;

  constructor(cbOnClick) {
    this.onClick = cbOnClick;
  }

  // method for render PlayButtonComponent
  render(): HTMLButtonElement {
    this.button = document.createElement('button');
    this.button.classList.add('button-play');

    this.button.addEventListener('click', () => {
      this.playing = !this.playing;

      if (this.playing) {
        this.button!.classList.add('button-stop');
      } else {
        this.button!.classList.remove('button-stop');
      }

      this.onClick(this.playing);
    });

    return this.button;
  }

  // method for reset PlayButtonComponent
  reset(): void {
    this.playing = false; // reset for false(no play)
    this.button?.classList.remove('button-stop'); // remove "button-stop"
  }
}