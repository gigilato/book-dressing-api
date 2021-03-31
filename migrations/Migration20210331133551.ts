import { Migration } from '@mikro-orm/migrations'

export class Migration20210331133551 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "loan" drop constraint if exists "loan_finished_at_check";')
    this.addSql(
      'alter table "loan" alter column "finished_at" type timestamptz(0) using ("finished_at"::timestamptz(0));'
    )
    this.addSql('alter table "loan" alter column "finished_at" drop not null;')
  }
}
