import { Selector } from 'testcafe';

fixture`Setting List test`
    .page('http://localhost:9001/#/performance/4/current')

test('Breadcrumb Link', async t => {
    await t

});
test('User Create', async t => {
    await t
    // .click(Selector('span').withText('系统管理').parent())
    // .expect(Selector('h1').innerText).eql('用户管理')

    // // 面包屑 ‘用户管理’跳转
    // .click(Selector('span').withText('新建用户').parent())
    // .expect(Selector('h1').innerText).eql('创建用户')
    // .click(Selector('.ant-breadcrumb-link').find('a').withText('用户管理'))
    // .expect(Selector('h1').innerText).eql('用户管理')
});
test('User Edit', async t => {
    await t

});
test('User Delete', async t => {
    await t

});
test('Password Edit', async t => {
    await t

});
test('Page Turning', async t => {
    await t

});

