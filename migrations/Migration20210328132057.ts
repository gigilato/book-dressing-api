import { Migration } from '@mikro-orm/migrations'

export class Migration20210328132057 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "firstname" varchar(255) null, "lastname" varchar(255) null, "username" varchar(255) not null, "picture_url" varchar(255) null, "email" varchar(255) not null);'
    )
    this.addSql('create index "user_uuid_index" on "user" ("uuid");')
    this.addSql('create index "user_username_index" on "user" ("username");')
    this.addSql('create index "user_email_index" on "user" ("email");')

    this.addSql(
      'create table "book" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "isbn" varchar(255) not null, "title" varchar(255) not null, "title_slug" varchar(255) not null, "author" varchar(255) not null, "author_slug" varchar(255) not null, "description" varchar(255) not null, "picture_url" varchar(255) null, "owner_id" int4 not null);'
    )
    this.addSql('create index "book_uuid_index" on "book" ("uuid");')
    this.addSql('create index "book_title_slug_index" on "book" ("title_slug");')
    this.addSql('create index "book_author_slug_index" on "book" ("author_slug");')

    this.addSql(
      'create table "loan" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "status" int2 not null, "finished_at" timestamptz(0) not null, "notified_at" timestamptz(0) not null, "user_id" int4 not null, "book_id" int4 not null);'
    )
    this.addSql('create index "loan_uuid_index" on "loan" ("uuid");')

    this.addSql(
      'alter table "book" add constraint "book_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;'
    )

    this.addSql(
      'alter table "loan" add constraint "loan_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "loan" add constraint "loan_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade;'
    )
  }
}
