import { Services } from "../interfaces";

export class ServiceContainer {
  private static container: Partial<Record<Services, unknown>> = {};

  public static register(key: Services, service: unknown): void {
    this.container[key] = service;
  }

  public static inject<T>(key: Services): T {
    return this.container[key] as T;
  }
}