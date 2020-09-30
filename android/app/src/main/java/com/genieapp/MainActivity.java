package com.genieapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = getIntent();
    String action = intent.getAction();
    Uri data = intent.getData();


  }

  @Override
  protected String getMainComponentName() {
    return "GenieApp";
  }
}
