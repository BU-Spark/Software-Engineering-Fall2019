package com.example.a2bits.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;

import com.android.volley.AuthFailureError;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;

import com.example.a2bits.R;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class healthActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("runnn", "0");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.health);
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
            UserPlaidActivity.auhtorizePlaidUser(donateButton, healthActivity.this);
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
