import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('watch_lists', (table) => {
        table.string('id').primary();
        table.string('code').unique();
        table.string('min_price');
        table.string('max_price');
        table.dateTime('created_date');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('watch_lists');
}

