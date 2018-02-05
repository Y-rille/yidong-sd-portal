import { Selector } from 'testcafe';

fixture`Setting List test`
    .page('http://localhost:9001/#/performance/4/current')

test('User Create', async t => {
    await t
    // .click(Selector('span').withText('系统管理').parent('li'))
    // .expect(Selector('h1').innerText).eql('用户管理')
    // .click(Selector('span').withText('新建用户').parent())
    // .expect(Selector('h1').innerText).eql('创建用户')
    // .click(Selector('span').withText('取 消').parent())
    // .expect(Selector('h1').innerText).eql('用户管理')
    // .click(Selector('span').withText('新建用户').parent())
    // .expect(Selector('h1').innerText).eql('创建用户')
    // .typeText(Selector('#email'), 'zhang@hpe.com')
    // .typeText(Selector('#name'), '张三')
    // .typeText(Selector('#password'), '111111')
    // .typeText(Selector('#mobile'), '15811001100')
    // .click(Selector('.unselectable'))
    // .typeText(Selector('#remark'), '新建功能，试一试~')
    // .click(Selector('span').withText('确 定').parent())
    // .expect(Selector('h1').innerText).eql('用户管理')

    // .expect('创建成功！').ok()
});