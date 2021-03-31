import { Migration } from '@mikro-orm/migrations'

export class Migration20210331133226 extends Migration {
  async up(): Promise<void> {
    this.addSql('drop index "user_uuid_index";')

    this.addSql('alter table "user" add constraint "user_uuid_unique" unique ("uuid");')

    this.addSql('drop index "book_uuid_index";')

    this.addSql('alter table "book" add constraint "book_uuid_unique" unique ("uuid");')

    this.addSql('drop index "loan_uuid_index";')

    this.addSql('alter table "loan" add constraint "loan_uuid_unique" unique ("uuid");')
  }
}
