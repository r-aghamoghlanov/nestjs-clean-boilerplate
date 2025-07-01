import { Entity, Column } from 'typeorm';
import { BaseTypeOrmModel } from './base.model';
import { TABLE_NAMES } from './table-names';

@Entity(TABLE_NAMES.USER)
export class UserTypeOrmModel extends BaseTypeOrmModel {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;
}
