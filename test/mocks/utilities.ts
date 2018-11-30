export class UtilitiesMock {
  lastSleepFor?: number = null;

  sleep(number): void {
    this.lastSleepFor = number;
  }
}
