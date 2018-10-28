class Lock {
  tryLockCalls: number = 0;
  locked: boolean = false;

  tryLock(): boolean {
    this.tryLockCalls++;
    this.locked = true;

    return true;
  }

  releaseLock(): void {
    this.locked = false;
  }
}

export class LockServiceMock {
  scriptLock: Lock;

  constructor() {
    this.scriptLock = new Lock();
  }

  getScriptLock(): Lock {
    return this.scriptLock;
  }
}
