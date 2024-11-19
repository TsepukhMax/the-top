import { IComponent } from '../interfaces';

export class WrapperDescriptionComponent implements IComponent {
  private title: string;
  private rating: string;
  private description: string;

  constructor(title: string, rating: string, description: string) {
    this.title = title;
    this.rating = rating;
    this.description = description;
  }

  //HTML
  public render(): HTMLElement {
    // main container
    const wrapperDescription = document.createElement('div');
    wrapperDescription.classList.add('wrapper-description');

    // title
    const h2 = document.createElement('h2');
    const span = document.createElement('span');
    span.textContent = this.rating;
    h2.appendChild(span);
    h2.appendChild(document.createTextNode(this.title));

    // container wrapper-coloms
    const wrapperColoms = document.createElement('div');
    wrapperColoms.classList.add('wrapper-coloms');
    // container for text
    const wrapperText = document.createElement('div');
    wrapperText.classList.add('wrapper-text');
    // describe
    const paragraph = document.createElement('p');
    paragraph.textContent = this.description;
    // add describe elements
    wrapperText.appendChild(paragraph);
    wrapperColoms.appendChild(wrapperText);

    // add elements
    wrapperDescription.appendChild(h2);
    wrapperDescription.appendChild(wrapperColoms);

    return wrapperDescription;
  }
}