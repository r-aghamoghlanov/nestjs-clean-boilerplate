import { BaseEntity } from '@api/core/common/base.entity';

export class User extends BaseEntity {
  constructor(
    protected _id: number | null,
    public email: string,
    public name: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super(_id);
  }

  // Business logic methods
  updateName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }
}
