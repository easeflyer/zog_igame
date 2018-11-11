import {testFunc} from '../App/libs/layout'

test("测试 jest 是否启用",()=>{
    expect(testFunc(5,3)).toBe(8);
})