// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('menuPersance', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('menuPersance', async function() {
    await driver.get("http://localhost:8080/#/")
    await driver.manage().window().setRect({ width: 1050, height: 666 })
    await driver.findElement(By.css(".p-button-outlined > .p-button-label")).click()
    await driver.findElement(By.id("textArea")).click()
    await driver.findElement(By.id("textArea")).sendKeys("game levi marcus")
    await driver.sleep(2000)
    await driver.findElement(By.css(".btn-p-button-outlined > .p-button-label")).click()
    await driver.sleep(2000)
    await driver.findElement(By.css(".p-dialog-header-close-icon")).click()
    await driver.findElement(By.css(".p-button-icon")).click()
    await driver.findElement(By.css(".p-splitbutton-menubutton")).click()
    await driver.findElement(By.css(".pi-chevron-down")).click()
    await driver.findElement(By.linkText("Cadastrar palavra")).click()
    await driver.findElement(By.css(".p-button-icon")).click()
    await driver.findElement(By.linkText("Sair")).click()
    await driver.sleep(2000)
  })
})