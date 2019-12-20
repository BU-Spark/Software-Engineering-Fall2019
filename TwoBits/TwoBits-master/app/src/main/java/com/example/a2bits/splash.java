package com.example.a2bits;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;

import android.os.Bundle;

import com.example.a2bits.ui.login.LoginActivity;

/***************************************************************************************
 *    Title: <Splash Screen Tutorial With Example In Android Studio>
 *    Author: <Abhi Android>
 *    Date: <2019>
 *    Code version: <Java SE 13>
 *    Availability: <https://abhiandroid.com/programming/splashscreen#Splash_Screen_Implementation_Method_In_Android>
 *
 ***************************************************************************************/
public class splash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        /****** Create Thread that will sleep for 5 seconds****/
        Thread background = new Thread() {
            public void run() {
                try {

                    sleep(3*1000);
                    Intent i=new Intent(getBaseContext(), LoginActivity.class);
                    startActivity(i);

                    //Remove activity
                    finish();
                } catch (Exception e) {
                }
            }
        };
        // start thread
        background.start();
    }

}
