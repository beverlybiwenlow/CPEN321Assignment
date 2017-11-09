import wd from 'wd';
class Helper {
  setup() {
    const capabilities = {
       platformName: 'Android',
       deviceName: 'Android Emulator',
    //    platformVersion: '10.2',
       app: 'C:\Users\Beverly\Desktop\CPEN321Assignment\PhotoRank\android\app\build\outputs\apk\app-debug.apk',
    };
    this.driver = wd.promiseChainRemote('0.0.0.0', 4723);
    return this.driver.init(capabilities);
  }
    teardown() {
        return this.driver.quit();
    }
  }
  const helper = new Helper();
  describe('--> Greet Button <--', () => {
     beforeEach(() => helper.setup());
     afterEach(() => helper.teardown());
     test('shows greeting when tapped', () => {
        return helper
           .driver
           .elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.support.v4.view.ViewPager/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.Switch")
           .tap()
           .waitForElementById("//android.widget.TextView[@text=\'ON\']");
     });  });