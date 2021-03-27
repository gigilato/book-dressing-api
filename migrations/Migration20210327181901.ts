import { Migration } from '@mikro-orm/migrations'

export class Migration20210327181901 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table `user` modify `firstname` varchar(255) null, modify `lastname` varchar(255) null;'
    )
  }
}
