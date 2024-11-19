import { IComponent, ISocialLink } from '../interfaces';

//FooterComponent
export class FooterComponent implements IComponent {
  private policyLinks: string[] = ['Privacy policy', 'Cookie policy'];
  private socialLinks: ISocialLink[] = [
    { iconSrc: 'img/twitter.svg', alt: 'twitter' },
    { iconSrc: 'img/instagram.svg', alt: 'instagram' },
    { iconSrc: 'img/facebook.svg', alt: 'facebook' }
  ];

  public render(): HTMLElement {
    // footer
    const footerElement = document.createElement('footer');
    footerElement.classList.add('footer');

    const container = document.createElement('div');
    container.classList.add('container');
    footerElement.appendChild(container);

    // footerLinks container
    const footerLinks = document.createElement('div');
    footerLinks.classList.add('footer-links');

    // add methods for policy and social links
    footerLinks.appendChild(this.createPolicyLinks());
    footerLinks.appendChild(this.createSocialLinks());

    container.appendChild(footerLinks);

    return footerElement;
  }

  // Method for PolicyLinks
  private createPolicyLinks(): HTMLElement {
    const policyList = document.createElement('ul');
    policyList.classList.add('policy');

    this.policyLinks.forEach(text => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.textContent = text;
      anchor.href = '#';

      listItem.appendChild(anchor);
      policyList.appendChild(listItem);
    });
    return policyList;
  }

  // Method for SocialLinks
  private createSocialLinks(): HTMLElement {
    const socialList = document.createElement('ul');
    socialList.classList.add('social-media');

    this.socialLinks.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = '#';

      const icon = document.createElement('img');
      icon.src = link.iconSrc;
      icon.alt = link.alt;

      anchor.appendChild(icon);
      listItem.appendChild(anchor);
      socialList.appendChild(listItem);
    });
    return socialList;
  }
}