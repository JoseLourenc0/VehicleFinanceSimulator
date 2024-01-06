import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vehicles', (table) => {
    table.bigIncrements('id').primary()
    table.string('model', 100).notNullable()
    table.string('brand', 100).notNullable()
    table.string('color', 100).notNullable()
    table.timestamps(true, true)
    table.timestamp('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('vehicles')
}
