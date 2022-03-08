package com.alpha01;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

//expo imports
import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;

//bootsplash imports
import com.zoontek.rnbootsplash.RNBootSplash;

//notifee
import io.invertase.notifee.NotifeeApiModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  // @Override
  // protected String getMainComponentName() {
  //   return "alpha01";
  // }
  

  //notifeee
  @Override
  protected String getMainComponentName() {
    return NotifeeApiModule.getMainComponent("alpha01");
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  //expo code:
  
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this,
      new ReactActivityDelegate(this, getMainComponentName()){
        @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    }
    );
  }
}
