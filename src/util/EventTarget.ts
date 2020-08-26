/** A shared EventTarget for dispatching messages to connected peers. */
export class BackgroundEventTarget<T extends any = any> {
  private listeners: Record<string, Handler<T> | undefined> = {};

  public addEventListener(source: string, callback: Handler<T>): void {
    this.listeners[source] = callback;
  }

  public removeEventListener(source: string): void {
    this.listeners[source] = undefined;
  }

  /** Dispatches event to all listeners excluding source */
  public dispatchEvent(source: string, event: T): void {
    const targets = { ...this.listeners, [source]: undefined };
    Object.values(targets).forEach((f) => f && f(event));
  }

  public connectedSources(): string[] {
    return Object.keys(this.listeners);
  }
}

type Handler<T> = (e: T) => void;
