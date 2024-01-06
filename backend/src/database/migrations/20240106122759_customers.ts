import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table) => {
    table.bigIncrements('id').primary()
    table.string('name', 100).notNullable()
    table.string('email').notNullable()
    table.string('cpf', 50).notNullable()
    table.string('phone').notNullable()
    table.timestamps(true, true)
    table.timestamp('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('customers')
}
