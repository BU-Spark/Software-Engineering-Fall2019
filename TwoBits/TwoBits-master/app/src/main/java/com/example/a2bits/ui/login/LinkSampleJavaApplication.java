package com.example.a2bits.ui.login;

import android.app.Application;
import android.content.Intent;
import android.util.Log;

import com.plaid.link.BuildConfig;
import com.plaid.link.Plaid;
import com.plaid.linkbase.models.PlaidOptions;
import com.plaid.linkbase.models.PlaidEnvironment;
import com.plaid.plog.LogLevel;

public class LinkSampleJavaApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        PlaidOptions plaidOptions = new PlaidOptions.Builder()
                .environment(PlaidEnvironment.SANDBOX)
                .logLevel(BuildConfig.DEBUG ? LogLevel.DEBUG : LogLevel.ASSERT)
                .build();

        Log.d("TEST", "Plaid user created!");

        Plaid.create(this, plaidOptions);

    }

}
