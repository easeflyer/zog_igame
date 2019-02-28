/**
 *  只要写到 __tests__ 目录里都会被 jest 监测到进行测试
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../../components/card';
//import Card from '../../../components/Card'

describe("测试 Card", () => {
    test("测试 jest 是否启用card", () => {
      //const component = renderer.create(<div>333</div>);
      const component = renderer.create(<Card
        active={2}
        // key={22}
        index={22}
        seat={'S'}
        animation={''}
        card={'S2'}
        size={171.54}
        position={{ x: 476, y: 10 }}
        zIndex={2}
          />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
});
