
import ODOO from '../odoo-rpc'

import boardCreator from './og.board'
import tableCreator from './og.table'

class Odoo extends ODOO {
    constructor(options){
        const creators = {
            'og.board': boardCreator ,
            'og.table':tableCreator,
        }
        super({ ...options, creators  })
    }
}

export default Odoo
