/*

TBD:  2018-11-29
attr(). m2m no flash
unlink , to remove from cls._instances
*/


const fields_get = async (rpc, model,allfields,attributes)=>{
        const method = 'fields_get'
        const data = await rpc.call({ model, method,args:[allfields,attributes] })
        const {code} = data
        if(!code){
            const {result} = data
            return result
        }
        else{
            return {}
        }
}

const modelCreator = (options)=>{
    const {model, fields: fields_raw, rpc, env} = options
    
    class cls {
        
        constructor(ids,vals){
            if(typeof(ids) === 'object' ){
                this._ids = ids
                this._instances = ids.reduce((acc,cur)=>{
                    acc[cur] = new cls(cur)
                    return acc
                },{})
            }
            else{
                this._id = ids
                if(vals){
                    const old = cls._records[ids] || {}
                    cls._records[ids] = {...old, ...vals}
                }
                
                cls._instances[ids] = this
            }
            
        }
        
        // only for multi
        list(){ // only for multi
            return Object.values( this._instances )
        }
        
        // only for multi
        byid(id){ // only for multi
            return this._instances[id]
        }
        
        // TBD for flash
        // only for single. 
        attr(attr,flash=0 ){ // only for single
            const raw = ( cls._records[this._id] || {} )[attr]
            const {type,relation} = cls._fields[attr] || {}
            
            if(['many2one','one2many', 'many2many'].indexOf(type)<0 ){
                return raw
            }
            
            return cls.env(relation).init().then(ref_cls=>{
              if( type === 'many2one'){
                if(flash){
                    return ref_cls.read(raw[0])
                }
                
                const [id, name] = raw
                const vals = {id,name,display_name:name}
                const ref_ins = new ref_cls(raw[0],vals)
                return ref_ins
              }
              else{
                //  TBD flash=1
                return ref_cls.read(raw)
              }
                
            })
            
            
        }
        
        async write( vals){
            return cls.write(this._id, vals)
        }
        
        async unlink(){
            return cls.unlink(this._id)
        }
                
    }
    
    Object.defineProperty(cls, 'name', {value: model, configurable: true} )

    cls._name = model
    cls._rpc = rpc
    cls._env = env
    cls._records = {}
    cls._instances = {}
    cls._fields = { id: { type: 'integer' }, name: { type: 'char' } }

    cls._fields_raw = fields_raw || ['id','name']
    cls._inited = 0
    
    cls.init = async() => {
        if(cls._inited){
            return cls
        }
        
        const fs = cls._fields_raw
        const get_fields = async ()=>{
            const fields0 = await fields_get(rpc, model,fs,['type','relation'])
            return Object.keys(fields0).reduce( (acc,cur)=>{
                if(fs.indexOf(cur)>=0 ){
                    acc[cur] = fields0[cur]
                } 
                return acc
            },{})
        }
    
        cls._fields = await get_fields()
        cls._inited = 1
        
        return cls
    }

    cls.env = (relation) => {
        let ref_cls = cls._env[relation]

        if(!ref_cls){
                ref_cls = modelCreator({
                    model:relation, 
                    rpc: cls._rpc, 
                    env:cls._env
                })
                cls._env[relation] = ref_cls
        }
            
        return ref_cls
        
    }

    cls.call = async (method, args=[], kwargs={} ) =>{
            const params = {
                model:cls._name,
                method, args, kwargs
            }
            const data = await cls._rpc.call(params)
            const {code} = data
            
            if(!code){
                const {result} = data
                return result
            }
            
            // TBD error save in class
            return null 
    }
        
    cls.list2instance = (result)=> {
            const res = result.reduce((acc, cur)=>{
                acc[cur.id] = ( new  cls(cur.id, cur) )
                return acc
            },{})
                
            const ids = Object.keys(res)
            const instance = new cls(ids)
                
            return instance
    }

    cls.search = async (domain)=>{
        await cls.init()
        const fields = Object.keys(cls._fields)
        const data = await cls.call('search_read',[domain,fields ])
        return cls.list2instance( data ? data : [] )
    }
        
    cls.read = async (ids)=>{
        await cls.init()
        const fields = Object.keys(cls._fields)
        const data0 = await cls.call('read',[ids,fields ])
        const data = data0 ? data0 : []
            
        if (typeof ids ==='object'){
                return cls.list2instance( data)
        }
        else{
            const vals = data.length ? data[0] : {}
            return new cls(ids, vals)

        }
    }
        
    cls.create = async (vals)=>{
        const data = await cls.call('create',[ vals ])
        if(data){
            return cls.read(data)
        }
        return data
    }
        
    cls.write = async (id, vals)=>{
        const data = await cls.call('write',[ id, vals ])
        if(data){
            return cls.read(id)
        }
        return data
    }

    //TBD
    cls.unlink = async (id) => {
        const data = await cls.call('unlink',[ id ])
        if(data){
            //TBD
            return data
        }
                
        return data
                
    }
    
    cls.view = (id) => {
        return cls._instances[id]
    }

    return cls

}

export default modelCreator

