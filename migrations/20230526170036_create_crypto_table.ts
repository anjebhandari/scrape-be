import  Knex  from '../src/platforms/config/knex';

export async function up(knex: typeof Knex): Promise<void> {
    return knex.schema.createTable('crypto', (table) => {
        table.string('id').primary();
        table.string('code');
        table.string('name');
        table.string('image');
        table.string('Price');
        table.string('Market Cap');
        table.string('24H');
        table.dateTime('updated_date');
        table.dateTime('created_date')
    });
}


export async function down(knex: typeof Knex): Promise<void> {
    return knex.schema.dropTable('crypto');
}

