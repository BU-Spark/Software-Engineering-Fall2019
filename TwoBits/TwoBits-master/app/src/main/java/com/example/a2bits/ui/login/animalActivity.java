package com.example.a2bits.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.a2bits.R;

public class animalActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.animalrights);
        boolean is_donator = isDonator();
        Intent i = getIntent();


        String token = LoginActivity.getToken();
        String id = LoginActivity.getId();
        if (token == null) {
            Log.d("token is null;", "");
        }
        if (id == null) {
            Log.d("id is null;", "");
        }

        if (token == null) {
            token = RegistrationActivity.getToken();
        }
        Log.d("runnn token", token);


        if (is_donator == false) { //if not subscribed
            Log.d("DONATE button: ", "start plaid authorization ");
            Button donateButton = findViewById(R.id.donateHealth);
            UserPlaidActivity.auhtorizePlaidUser(donateButton, animalActivity.this);
        } else { //if already Plaid authorized
            // add categroy/charity to user's subscribed categories
            // go to "Thank you" page
            Log.d("DONATE button: ", "User is already authorized");
        }

    }

    @Override
    protected void onActivityResult(
            int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d("runnn", "1");
        UserPlaidActivity.PlaidOnActivityResult(requestCode, resultCode, data);
        if (UserPlaidActivity.getResult() == true) {
            Log.d("AFTERDONATE button: ", "true");
            goToPlaidsuccess();
        }
        Log.d("AFTERDONATE button: ", "false");
    }

    public boolean isDonator(){
        return UserPlaidActivity.getResult();
    }

    public void goToPlaidsuccess(){
        Intent intent = new Intent(this, plaidsuccess.class);
        startActivity(intent);
    }

}
