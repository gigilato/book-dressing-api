import { Migration } from '@mikro-orm/migrations'

export class Migration20210331180807 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "loan" drop constraint if exists "loan_notified_at_check";')
    this.addSql(
      'alter table "loan" alter column "notified_at" type timestamptz(0) using ("notified_at"::timestamptz(0));'
    )
    this.addSql('alter table "loan" alter column "notified_at" drop not null;')
  }
}
