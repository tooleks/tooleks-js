import EventListener from './EventListener';

export default class EventEmitter {
  private readonly eventListeners: Map<string, EventListener[]>;

  constructor() {
    this.eventListeners = new Map();
  }

  /**
   * Returns the number of listeners listening to the event named eventName.
   */
  listenerCount(eventName: string): number {
    if (!this.eventListeners.has(eventName)) {
      return 0;
    }

    const listeners = this.eventListeners.get(eventName) as EventListener[];

    return listeners.length;
  }

  /**
   * Returns a copy of the array of listeners for the event named eventName.
   */
  listeners(eventName: string): EventListener[] {
    if (!this.eventListeners.has(eventName)) {
      return [];
    }

    const listeners = this.eventListeners.get(eventName) as EventListener[];

    return [...listeners];
  }

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName. No checks are made
   * to see if the listener has already been added. Multiple calls passing the same combination of eventName and
   * listener will result in the listener being added, and called, multiple times.
   */
  on(eventName: string, eventListener: EventListener): EventEmitter {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }

    const listeners = this.eventListeners.get(eventName) as EventListener[];

    listeners.push(eventListener);

    return this;
  }

  /**
   * Removes the specified listener from the listener array for the event named eventName.
   */
  off(eventName: string, eventListener: EventListener): EventEmitter {
    if (this.eventListeners.has(eventName)) {
      const listeners = this.eventListeners.get(eventName) as EventListener[];
      this.eventListeners.set(eventName, listeners.filter(listener => listener !== eventListener));
    }

    return this;
  }

  /**
   * Asynchronously calls each of the listeners registered for the event named eventName,
   * in the order they were registered, passing the supplied arguments to each.
   *
   * Returns a Promise with true if the event had listeners, false otherwise.
   */
  async emit(eventName: string, ...args: any[]): Promise<boolean> {
    const listenersCount = this.listenerCount(eventName);

    for (const listener of this.listeners(eventName)) {
      await listener.apply(this, args);
    }

    return listenersCount > 0;
  }
}
