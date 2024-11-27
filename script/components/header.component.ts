import { IComponent } from "../interfaces";
import { generateSectionId, formatRating } from "../utils";
import { DataService } from "../services/data.service";
import { ServiceContainer } from "../services/service-container";
import { Services } from "../interfaces";
import { ScrollService } from "../services/scroll.service";

export class HeaderComponent implements IComponent {
  private dataService: DataService;
  private burgerContent: HTMLElement;
  private navigationalList: HTMLElement;
  private scrollService: ScrollService; // add ScrollService

  constructor() {
    // Inject DataService from ServiceContainer
    this.dataService = ServiceContainer.inject<DataService>(Services.DataService);
    this.scrollService = ServiceContainer.inject<ScrollService>(Services.ScrollService); // add ScrollService
  }

  public render(): HTMLElement {
    const header = document.createElement("header");
    header.classList.add("header");

    const container = document.createElement("div");
    container.classList.add("container", "clearfix");

    container.appendChild(this.createLogo());
    container.appendChild(this.createNavigationMenu());

    header.appendChild(container);

    return header;
  }

  private createLogo(): HTMLElement {
    const logo = document.createElement("div");
    logo.classList.add("logo");

    const link = document.createElement("a");
    link.href = "#";

    const img = document.createElement("img");
    img.src = "img/the-top.svg";
    img.alt = "logo";

    link.appendChild(img);
    logo.appendChild(link);

    return logo;
  }

  private createNavigationMenu(): HTMLElement {
    const nav = document.createElement("nav");
    nav.classList.add("navigational-menu");

    const burger = document.createElement("div");
    burger.classList.add("burger");

    // Initialization burgerContent
    this.burgerContent = document.createElement("span");
    burger.appendChild(this.burgerContent);

    // Menu open/close event
    burger.addEventListener("click", () => {
      this.burgerContent.classList.toggle("burger-content-open");
      this.navigationalList.classList.toggle("navigational-list-visible");
    });

    // Closing the menu when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (!nav.contains(target) && !burger.contains(target)) {
        this.burgerContent.classList.remove("burger-content-open");
        this.navigationalList.classList.remove("navigational-list-visible");
      }
    });

    this.navigationalList = this.createNavigationalList();

    nav.appendChild(burger);
    nav.appendChild(this.navigationalList);

    return nav;
  }

  private createNavigationalList(): HTMLElement {
    const list = document.createElement("ul");
    list.classList.add("navigational-list");

    const links = ["search", "add to the favorites", "faq"];
    links.forEach((text) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = text;
      li.appendChild(link);
      list.appendChild(li);
    });

    const goToLi = document.createElement("li");
    const goToLink = document.createElement("a");
    goToLink.href = "#";
    goToLink.textContent = "go to";

    const submenu = this.createSubmenu();
    goToLi.appendChild(goToLink);
    goToLi.appendChild(submenu);

    list.appendChild(goToLi);

    return list;
  }

  private createSubmenu(): HTMLElement {
    const submenu = document.createElement("ul");
    submenu.classList.add("submenu");

    const movies = this.dataService.getMovieData();
    movies.forEach((movie) => {
      const li = document.createElement("li");

      const link = document.createElement("a");
      link.href = `#${generateSectionId(movie.id)}`;
      link.textContent = formatRating(movie.rating); // Dynamic text based on rating

      // Attach smooth scroll
      link.addEventListener("click", (event) => {
        event.preventDefault();
        this.scrollService.scrollToMovieSection(movie.id); // use ScrollService
        // close burger menu and navigationalList
        this.burgerContent.classList.remove("burger-content-open");
        this.navigationalList.classList.remove("navigational-list-visible");
      });

      li.appendChild(link);
      submenu.appendChild(li);
    });

    return submenu;
  }
}