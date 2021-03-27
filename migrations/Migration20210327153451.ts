import { Migration } from '@mikro-orm/migrations'

export class Migration20210327153451 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `user` (`id` int unsigned not null auto_increment primary key, `uuid` varchar(255) not null, `first_name` json not null, `last_name` json not null, `status` enum('Active', 'Deleted') not null, `picture_url` varchar(255) null, `email` varchar(255) not null) default character set utf8mb4 engine = InnoDB;"
    )
  }
}
