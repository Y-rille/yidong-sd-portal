// import ReactSelector from 'testcafe-react-selectors';
import { Selector } from 'testcafe';

fixture`Login test`
    .page('http://localhost:9001/#/login/');

test('Login', async t => {
    await t
        .typeText(Selector('#email'), 'test@hpe.com')
        .typeText(Selector('#password'), '111111', { speed: 0.5 })
        .click(Selector('span').withText('登录').parent('button'))
        .expect('登录成功！').ok()
    // .navigateTo('http://localhost:9001/#/performance/4/current');
    // .click(Selector('span').withText('系统管理').parent())
    // .expect(Selector('h1').innerText).eql('用户管理')
    // .click(Selector('span').withText('新建用户').parent())
    // .expect(Selector('h1').innerText).eql('创建用户')
});