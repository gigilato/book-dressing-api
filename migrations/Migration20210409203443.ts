import { Migration } from '@mikro-orm/migrations'

export class Migration20210409203443 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "firebase_id" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "firstname" varchar(255) null, "lastname" varchar(255) null, "picture_url" text null);'
    )
    this.addSql('alter table "user" add constraint "user_uuid_unique" unique ("uuid");')
    this.addSql('create index "user_firebase_id_index" on "user" ("firebase_id");')
    this.addSql('create index "user_email_index" on "user" ("email");')
    this.addSql('create index "user_username_index" on "user" ("username");')

    this.addSql(
      'create table "book" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "isbn" varchar(255) null, "title" varchar(255) not null, "title_slug" varchar(255) not null, "author" varchar(255) not null, "author_slug" varchar(255) not null, "description" text not null, "status" text check ("status" in (\'Active\', \'Inactive\')) not null, "picture_url" text null, "owner_id" int4 not null);'
    )
    this.addSql('alter table "book" add constraint "book_uuid_unique" unique ("uuid");')
    this.addSql('create index "book_title_slug_index" on "book" ("title_slug");')
    this.addSql('create index "book_author_slug_index" on "book" ("author_slug");')

    this.addSql(
      'create table "loan" ("id" serial primary key, "uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "status" text check ("status" in (\'Request\', \'Active\', \'Finish\')) not null, "finished_at" timestamptz(0) null, "notified_at" timestamptz(0) null, "user_id" int4 not null, "book_id" int4 not null);'
    )
    this.addSql('alter table "loan" add constraint "loan_uuid_unique" unique ("uuid");')

    this.addSql(
      'create table "like" ("user_id" int4 not null, "book_id" int4 not null, "created_at" timestamptz(0) not null);'
    )
    this.addSql('alter table "like" add constraint "like_pkey" primary key ("user_id", "book_id");')

    this.addSql(
      'alter table "book" add constraint "book_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table "loan" add constraint "loan_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table "loan" add constraint "loan_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table "like" add constraint "like_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;'
    )
  }
}
