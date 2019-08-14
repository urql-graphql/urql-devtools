export class BackgroundEventTarget<T extends any = any> {
  private listeners: Record<string, Handler<T> | undefined> = {};

  public addEventListener(source: string, callback: Handler<T>) {
    console.log("adding lsitenet", source);
    this.listeners[source] = callback;
  }

  public removeEventListener(source: string) {
    this.listeners[source] = undefined;
  }

  /** Dispatches event to all listeners excluding source */
  public dispatchEvent(source: string, event: T) {
    console.log("dispatching event", source, event);
    const targets = { ...this.listeners, [source]: undefined };
    Object.values(targets).forEach(f => f && f(event));
  }

  public connectedSources() {
    return Object.keys(this.listeners);
  }
}

type Handler<T> = (e: T) => void;
