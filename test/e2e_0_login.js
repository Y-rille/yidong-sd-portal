// import ReactSelector from 'testcafe-react-selectors';
import { Selector } from 'testcafe';

fixture`Login test`
    .page('http://localhost:9001/#/login/');

test('Login', async t => {
    await t
        .typeText(Selector('#email'), 'lisi@cmp.com')
        .typeText(Selector('#password'), '111111', { speed: 0.5 })
        .click(Selector('span').withText('登录').parent('button'))
        .expect('登录成功！').ok()

        // .navigateTo('http://localhost:9001/#/performance/4/current')
        // .wait(5000000)

        // 系统管理
        // .click(Selector('span').withText('系统管理').parent())
        // .expect(Selector('h1').innerText).eql('用户管理')

        // 面包屑 ‘用户管理’跳转
        // .click(Selector('span').withText('新建用户').parent())
        // .expect(Selector('h1').innerText).eql('创建用户')
        // .click(Selector('.ant-breadcrumb-link').find('a').withText('用户管理'))
        // .expect(Selector('h1').innerText).eql('用户管理')
        // '取消创建'
        // .click(Selector('span').withText('新建用户').parent())
        // .expect(Selector('h1').innerText).eql('创建用户')
        // .click(Selector('span').withText('取 消').parent())
        // .expect(Selector('h1').innerText).eql('用户管理')
        //  新建用户测试
        // .click(Selector('span').withText('新建用户').parent())
        // .expect(Selector('h1').innerText).eql('创建用户')
        // .typeText(Selector('#email'), 'zhan21@hpe.com')
        // .typeText(Selector('#name'), '张三21')
        // .typeText(Selector('#password'), '11112111')
        // .typeText(Selector('#mobile'), '15811001101')
        // .click(Selector('.ant-select'))
        // .click(Selector('.ant-select-dropdown-menu').find('li').nth(1))
        // .click(Selector('.ant-select-dropdown-menu').find('li').nth(2))
        // 点击两次 删除角色
        // .click(Selector('.ant-select-dropdown-menu').find('li').nth(1))
        // .wait(500)
        // .click(Selector('.ant-select-dropdown-menu').find('li').nth(0))
        // .click(Selector('.ant-select-dropdown-menu').find('li').nth(3))
        // 点击‘x’删除角色
        // .click(Selector('.ant-select-selection__choice__remove').nth(0))
        // .wait(500)
        // .typeText(Selector('#remark'), '新建功能，试一试~')
        // .click(Selector('span').withText('确 定').parent())
        // .expect('创建成功！').ok()
        // .wait(500)

        // .navigateTo('http://localhost:9001/#/setting/user')
        // .expect(Selector('h1').innerText).eql('用户管理')
        // .wait(500)
        // 编辑用户
        // .click(Selector('tbody').find('tr').nth(0).find('td').nth(4).find('a').withText('编辑'))
        // .expect(Selector('h1').innerText).eql('编辑用户')
        // .typeText(Selector('#email'), 'zhan@hpe.com', { caretPos: 0, replace: true })
        // .typeText(Selector('#remark'), '修改备注测试...', { caretPos: 0, replace: true })
        // .click(Selector('span').withText('确 定').parent())
        // .expect('编辑成功！').ok()
        // .wait(500)
        // .expect(Selector('h1').innerText).eql('用户管理')
        // 删除用户
        // .click(Selector('tbody').find('tr').nth(0).find('td').nth(4).find('a').withText('删除'))
        // .wait(500)
        // .click(Selector('span').withText('确 定').parent('button'))
        // .expect('删除成功！').ok()
        // .wait(500)
        // .expect(Selector('h1').innerText).eql('用户管理')
        // 修改密码
        // .click(Selector('tbody').find('tr').nth(0).find('td').nth(4).find('a').withText('修改密码'))
        // .expect(Selector('.ant-modal-title').innerText).eql('修改密码')
        // .typeText(Selector('#password'), '111111')
        // .typeText(Selector('#confirmpassword'), '111111')
        // .click(Selector('span').withText('确 定').parent())
        // .expect('修改成功！').ok()
        // .wait(500)
        // .expect(Selector('h1').innerText).eql('用户管理')
        // 翻页
        //     .typeText(Selector('.ant-pagination-options-quick-jumper').find('input'), '2')
        //     .wait(200)
        //     .pressKey('enter')
        // const location = await t.eval(() => window.location)
        // await t.expect(location.hash).eql('#/setting/user?page_num=2&page_size=5&query_key=')
        //     .wait(500)

        // 资源管理
        .click(Selector('span').withText('资源管理').parent())
        .expect(Selector('h1').innerText).eql('概览')
        // 编辑资源结构组织
        .click(Selector('span').withText('VIM1').parent('div').find('a').nth(1))
        .wait(500)
        .expect(Selector('.ant-modal-title').innerText).eql('编辑资源结构组织')
        .typeText(Selector('#name'), 'VIM', { caretPos: 0, replace: true })
        .click(Selector('span').withText('确 定').parent('button'))
        .expect(Selector('h1').innerText).eql('概览')
        .wait(500)
        // 主机管理
        .click(Selector('span').withText('VIM01').parent('span'))
        .wait(500)
        .click(Selector('li').withText('主机管理').nth(1))
        .expect(Selector('h1').innerText).eql('主机管理')
        .wait(500)
        // 查询
        .click(Selector('.ant-select').nth(0))
        .click(Selector('.ant-select-dropdown-menu').nth(0).find('li').nth(1))
        .wait(300)
        .click(Selector('.ant-select').nth(1))
        .wait(300)
        .click(Selector('.ant-select-dropdown-menu').nth(1).find('li').nth(2))
        .wait(300)
        .click(Selector('.ant-select').nth(2))
        .click(Selector('.ant-select-dropdown-menu').nth(2).find('li').nth(1))
        .wait(100)
        .click(Selector('span').withText('查 询').parent('button'))
        .wait(500)
        // tab切换
        .click(Selector('.ant-tabs-tab').withText('计算节点'))
        .wait(1000)
        .click(Selector('.ant-tabs-tab').withText('存储节点'))
        .wait(1000)
        .click(Selector('.ant-tabs-tab').withText('控制节点'))
        .wait(1000)
        .click(Selector('tbody').find('tr').nth(0).find('td').nth(0).find('a'))
        .expect(Selector('h1').innerText).eql('主机详情')
        .wait(1000)


});