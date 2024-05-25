let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(() => {
    page.close();
});

describe('Github page tests', () => {
    beforeEach(async () => {
        await page.goto('https://github.com/team');
    });
    test("The h1 header content'", async () => {
        const firstLink = await page.$('header div div a');
        await firstLink.click();
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual(
            'GitHub for teams · Build like the best teams on the planet · GitHub'
        );
    }, 60000);

    test('The first link attribute', async () => {
        const actual = await page.$eval('a', (link) =>
            link.getAttribute('href')
        );
        expect(actual).toEqual('#start-of-content');
    }, 60000);

    test('The page contains Sign in button', async () => {
        const btnSelector = '.btn-large-mktg.btn-mktg';
        await page.waitForSelector(btnSelector, {
            visible: true
        });
        const actual = await page.$eval(
            btnSelector,
            (link) => link.textContent
        );
        expect(actual).toContain('Get started with Team');
    }, 60000);
});

test("check the headers on other pages1'", async () => {
    await page.goto('https://github.com');
    //await page.evaluate(() => {
    //    debugger;
    //});

    const firstLink = await page.$(
        '.HeaderMenu-link.no-underline.px-0.px-lg-2.py-3.py-lg-2.d-block.d-lg-inline-block'
    );
    await firstLink.click();
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
}, 60000);

test("check the headers on other pages2'", async () => {
    await page.goto('https://github.com/pricing');
    const firstLink = await page.$("h1[class='h2-mktg']");
    await firstLink.click();
    const title2 = await page.title();
    expect(title2).toEqual('Pricing · Plans for every developer · GitHub');
}, 60000);

test("check the headers on other pages3'", async () => {
    await page.goto('https://github.com/login');
    const firstLink = await page.$("div[class='auth-form-header p-0'] h1");
    await firstLink.click();
    const title2 = await page.title();
    expect(title2).toEqual('Sign in to GitHub · GitHub');
}, 60000);
