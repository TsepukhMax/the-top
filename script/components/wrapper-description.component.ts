import { IComponent } from '../interfaces';
import { ListenButtonComponent } from './listen-button.components';

export class WrapperDescriptionComponent implements IComponent {
  private title: string;
  private rating: string;
  private description: string;
  private listenButtonComponent: ListenButtonComponent;

  constructor(title: string, rating: string, description: string, listenButtonComponent: ListenButtonComponent) {
    this.title = title;
    this.rating = rating;
    this.description = description;
    this.listenButtonComponent = listenButtonComponent;
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

    // render and append the listen button
    const listenButtonElement = this.listenButtonComponent.render();
    wrapperText.appendChild(listenButtonElement);
    
    wrapperColoms.appendChild(wrapperText);

    // add elements
    wrapperDescription.appendChild(h2);
    wrapperDescription.appendChild(wrapperColoms);

    return wrapperDescription;
  }
}