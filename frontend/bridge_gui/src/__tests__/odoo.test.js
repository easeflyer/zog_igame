import ODOO from '../App/libs/odoo/odoo-rpc'

describe("ODOO",()=>{
  //const host = '/api'
  const host = 'http://192.168.1.114:8069';
  const db = 'TT'
  const models = {
          'res.users': ['name','partner_id','company_id','category_id'],
          'res.company': ['name','email'],
          'res.country': ['name' ],
  }
  
  test("login:",()=>{
    //expect(1).toBe(1);
    // 测试语法问题？
    expect.assertions(1);
    //return user.getUserName(4).then(data => expect(data).toEqual('Mark'));    
    const odoo = new ODOO({host,db,models})
    return odoo.login({login:'admin', password:'123'}).then(
      data => expect(data.code).toBe(0)
    )

  });
});