import knex from 'knex';

class MessagesClienteSQL {

    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists('messages')
        .finally(() => {
            return this.knex.schema.createTable('messages', table => {
                table.string("mail", 50).notNullable()
                table.string("msg", 200).notNullable()
                table.string("hora", 100).notNullable()
            })
        })
    }

    insertarArticulos(mensajes) {
        return this.knex('messages').insert(mensajes)
    }

    listarArticulos() {
        return this.knex('messages').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

export default MessagesClienteSQL;