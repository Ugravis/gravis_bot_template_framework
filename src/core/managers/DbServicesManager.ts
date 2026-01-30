import Container from "typedi"

type ServiceClass = new (...args: any[]) => any
type ServiceDefinitions = Record<string, ServiceClass>

type InstantiateServices<T extends ServiceDefinitions> = {
  [K in keyof T]: InstanceType<T[K]>
}

export class DbServicesManager<T extends ServiceDefinitions> {
  private _services = new Map<Function, any>()
  public services!: InstantiateServices<T>

  constructor(
    private database: any, 
    private serviceDefinitions: T
  ) {}

  public init(): void {
    const services: any = {}

    for (const [key, ServiceClass] of Object.entries(this.serviceDefinitions)) {
      const instance = Container.get(ServiceClass)
      this._services.set(ServiceClass, instance)
      services[key] = instance
    }
    this.services = services
  }

  public get<S>(
    cls: new (...args: any[]) => S
  ): S {
    return this._services.get(cls)
  }
}