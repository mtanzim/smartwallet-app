const SQLite = require('react-native-sqlite-storage')

// TODO THROW ERRORS! & ERROR HANDLING
// FOREIGN KEY / PRIMARY KEY SYNTAX
// TYPES

interface Field {
  name: string
  type: string
  options?: string[]
}

interface TableOptions {
  name: string
  fields: Field[]
}

export class Storage {
  private db = SQLite
  private dbName = 'LocalSmartWalletData'

  constructor() {
    this.db.enablePromise(true)
    this.db.DEBUG(true)
  }

  async provisionTables() : Promise<void> {
    const tableData: TableOptions[] = [{
      name: 'Personas',
      fields: [{
        name: 'did',
        type: 'VARCHAR(20)',
        options: ['NOT NULL', 'UNIQUE', 'COLLATE NOCASE', 'PRIMARY KEY']
      }, {
        name: 'controllingKey',
        type: 'INTEGER'
      }, {
        name: 'FOREIGN KEY(controllingKey)',
        type: 'REFERENCES Keys(id)'
      }]
    }, {
      name: 'Keys',
      fields: [{
        name: 'id',
        type: 'INTEGER',
        options: ['PRIMRAY KEY', 'NOT NULL', 'UNIQUE']
      }, {
        name: 'wif',
        type: 'VARCHAR(20)',
        options: ['UNIQUE', 'NOT NULL']
      }, {
        name: 'path',
        type: 'VARCHAR(10)',
        options: ['NOT NULL']
      }, {
        name: 'entropySource',
        type: 'INTEGER'
      }, {
        name: 'algorithm',
        type: 'TEXT',
        options: ['NOT NULL']
      }, {
        name: 'FOREIGN KEY(entropySource)',
        type: 'REFERENCES MasterKeys(id)'
      }]
    }]

    const results = await Promise.all(tableData.map(t =>
      this.createTable(t))
    )
  }

  async createTable(options : TableOptions) : Promise<void> {
    const db = await this.getDbInstance()
    const query = this.assembleCreateTableQuery(options)
    await this.executeTransaction(db, query)
    await this.closeDbInstance(db)
  }

  private assembleCreateTableQuery(options: TableOptions) : string {
    const { name, fields } = options
    const st = `CREATE TABLE IF NOT EXISTS ${name}`
    const fieldSt = fields.map(f => {
      const { name, type, options } = f
      let fieldOptions = ''
      if (options) {
        fieldOptions = options.join(' ')
      }

      return `${name} ${type} ${fieldOptions}`
    }).join(', ')

    return `${st} (${fieldSt})`
  }


  // Not true async I think
  private async executeTransaction(db: any, query: string) : Promise<boolean> {
    await db.transaction(tx => tx.executeSql(query))
    return true
  }

  private async getDbInstance() : Promise<any> {
    return await this.db.openDatabase({ name: this.dbName })
  }

  async closeDbInstance(db: any) : Promise<boolean> {
    return await db.close()
  }


  async createDb() : Promise<boolean> {
    const result = await this.db.openDatabase({ name: this.dbName })

    /*
    await result.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Version5( version_id INTEGER PRIMARY KEY NOT NULL); ')
    })
    */

    await result.close()
    return true
  }

  async populateTables() : Promise<boolean> {
    const database = await this.db.openDatabase({ name: this.dbName })

    /*
    database.transaction(tx => {
      // tx.executeSql(query.toString())
    })
    */

    return true
  }
}