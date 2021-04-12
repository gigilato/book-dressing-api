import { Migration } from '@mikro-orm/migrations'

export class Migration20210412211330 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" add column "description" text null;')
  }
}
