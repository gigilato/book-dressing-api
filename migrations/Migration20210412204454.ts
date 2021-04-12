import { Migration } from '@mikro-orm/migrations'

export class Migration20210412204454 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "firstname" to "name";')

    this.addSql('alter table "user" drop column "lastname";')
  }
}
