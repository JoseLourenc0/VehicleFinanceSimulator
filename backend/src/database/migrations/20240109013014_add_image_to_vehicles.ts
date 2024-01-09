import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('vehicles', (table) => {
    table.string('image').nullable().defaultTo(null).after('color')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('vehicles', (table) => {
    table.dropColumn('image')
  })
}
