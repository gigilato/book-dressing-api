import { Migration } from '@mikro-orm/migrations'

export class Migration20210407155457 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "picture_url";')

    this.addSql('alter table "book" drop column "description";')
    this.addSql('alter table "book" drop column "picture_url";')
  }
}
