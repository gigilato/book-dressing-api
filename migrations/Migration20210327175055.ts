import { Migration } from '@mikro-orm/migrations'

export class Migration20210327175055 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `uuid` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `firstname` varchar(255) not null, `lastname` varchar(255) not null, `username` varchar(255) not null, `picture_url` varchar(255) null, `email` varchar(255) not null) default character set utf8mb4 engine = InnoDB;'
    )
    this.addSql('alter table `user` add index `user_uuid_index`(`uuid`);')
    this.addSql('alter table `user` add index `user_username_index`(`username`);')
    this.addSql('alter table `user` add index `user_email_index`(`email`);')

    this.addSql(
      'create table `book` (`id` int unsigned not null auto_increment primary key, `uuid` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `isbn` varchar(255) not null, `title` varchar(255) not null, `title_slug` varchar(255) not null, `author` varchar(255) not null, `author_slug` varchar(255) not null, `description` varchar(255) not null, `picture_url` varchar(255) null, `owner_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;'
    )
    this.addSql('alter table `book` add index `book_uuid_index`(`uuid`);')
    this.addSql('alter table `book` add index `book_title_slug_index`(`title_slug`);')
    this.addSql('alter table `book` add index `book_author_slug_index`(`author_slug`);')
    this.addSql('alter table `book` add index `book_owner_id_index`(`owner_id`);')

    this.addSql(
      'create table `loan` (`id` int unsigned not null auto_increment primary key, `uuid` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `status` tinyint not null, `finished_at` datetime not null, `notified_at` datetime not null, `user_id` int(11) unsigned not null, `book_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;'
    )
    this.addSql('alter table `loan` add index `loan_uuid_index`(`uuid`);')
    this.addSql('alter table `loan` add index `loan_user_id_index`(`user_id`);')
    this.addSql('alter table `loan` add index `loan_book_id_index`(`book_id`);')

    this.addSql(
      'alter table `book` add constraint `book_owner_id_foreign` foreign key (`owner_id`) references `user` (`id`) on update cascade;'
    )

    this.addSql(
      'alter table `loan` add constraint `loan_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;'
    )
    this.addSql(
      'alter table `loan` add constraint `loan_book_id_foreign` foreign key (`book_id`) references `book` (`id`) on update cascade;'
    )
  }
}
