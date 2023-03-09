import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Robot {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  purpose: string;

  @Column()
  avatarUrl: string;
}
