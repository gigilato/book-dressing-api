import { Migration } from '@mikro-orm/migrations'

export class Migration20210329095106 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" add column "firebase_id" varchar(255) not null;')
    this.addSql('create index "user_firebase_id_index" on "user" ("firebase_id");')
  }
}
