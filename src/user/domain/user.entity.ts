export class User {
  constructor(
    private readonly id: number | null,
    private email: string,
    private name: string,
    private readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  // Business logic methods
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }

  getId(): number | null {
    return this.id;
  }
  getEmail(): string {
    return this.email;
  }
  getName(): string {
    return this.name;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // State checks
  get isNew(): boolean {
    return this.id === null;
  }
  get isPersistent(): boolean {
    return this.id !== null;
  }
}
