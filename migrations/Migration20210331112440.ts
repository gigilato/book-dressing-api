import { Migration } from '@mikro-orm/migrations'

export class Migration20210331112440 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "book" drop constraint if exists "book_isbn_check";')
    this.addSql(
      'alter table "book" alter column "isbn" type varchar(255) using ("isbn"::varchar(255));'
    )
    this.addSql('alter table "book" alter column "isbn" drop not null;')
  }
}
