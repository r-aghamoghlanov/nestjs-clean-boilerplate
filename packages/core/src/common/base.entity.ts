export abstract class BaseEntity {
  protected constructor(protected readonly _id: number | null) {}

  get id() {
    return this._id;
  }

  get isNew(): boolean {
    return this.id === null;
  }

  get isPersistent(): boolean {
    return this.id !== null;
  }

  equals(other: BaseEntity): boolean {
    return this._id === other._id;
  }
}
