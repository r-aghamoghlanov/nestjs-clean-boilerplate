export class User {
  constructor(
    private readonly _id: number | null,
    public email: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  // Business logic methods
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }
  equals(other: User) {
    return this._id === other._id;
  }

  get id() {
    return this._id;
  }
  get isNew(): boolean {
    return this.id === null;
  }
  get isPersistent(): boolean {
    return this.id !== null;
  }
}
