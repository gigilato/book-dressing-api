import { Migration } from '@mikro-orm/migrations'

export class Migration20210407155553 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" add column "picture_url" text null;')

    this.addSql(
      'alter table "book" add column "description" text not null, add column "picture_url" text null;'
    )
  }
}
