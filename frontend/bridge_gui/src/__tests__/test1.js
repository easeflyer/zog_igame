import { testFunc } from '../App/libs/layout'
import { Exception } from 'handlebars';
describe("实验性测试", () => {
    test("测试 jest 是否启用", () => {
        expect(testFunc(5, 3)).toBe(8);
    });
    test("promise1:", () => {
        expect.assertions(1);
        async function fun1(data) {
            if (data) return "hello word!";
            else throw "error";
        }
        fun1(0).then(
            data => {
                expect(data).toBe('hello word!');
            },
            data => {
                expect(data).toBe('error');
            }
        )

    });
    test("promise2:", async () => {
        expect.assertions(2);
        async function fun1(data) {
            if (data) return "hello word!";
            else throw "error";
        };
        await expect(fun1(1)).resolves.toBe('hello word!');
        await expect(fun1(0)).rejects.toBe('error');
    });    
});
