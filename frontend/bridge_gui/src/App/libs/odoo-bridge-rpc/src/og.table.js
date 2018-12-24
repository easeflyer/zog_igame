import modelCreator from '../odoo-rpc/models'

const creator = (options) => {
  // const cls = modelCreator(options)
  const Base = modelCreator(options)
  const { model } = options
  class cls extends Base {
    get_doing_table(id) {
      const instances = this.list().filter(
        ins => ins.attr('game_id').attr('id') === id
      )
      console.log('gameId:',id)
      if (instances.length === 0) {
        return null
      }
      return instances[0]
    }

  }
  Object.defineProperty(cls, 'name', { value: model, configurable: true })
  return cls
}



export default creator

