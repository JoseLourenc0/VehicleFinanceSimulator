import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('simulations', (table) => {
    table.bigIncrements('id').primary()
    table
      .bigInteger('client_id')
      .unsigned()
      .references('customers.id')
      .onDelete('CASCADE')
    table
      .bigInteger('vehicle_id')
      .unsigned()
      .references('vehicles.id')
      .onDelete('CASCADE')
    table.integer('score').nullable().defaultTo(null)
    table.boolean('processed').defaultTo(false)
    table.string('key', 100)
    table.text('access_key')
    table.timestamps(true, true)
    table.timestamp('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('simulations')
}
