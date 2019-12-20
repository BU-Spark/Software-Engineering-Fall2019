package com.example.a2bits.ui.login;

import android.app.Activity;

import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.a2bits.R;

import java.util.HashMap;
import java.util.Map;
import android.app.AlertDialog;
import android.content.DialogInterface;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    private LoginViewModel loginViewModel;
    private static String token;
    private static String id;

    public static String getToken(){
        return token;
    }
    public static String getId(){
        return id;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button registrationButton = findViewById(R.id.signUp);
        registrationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openRegistration();
            }
        });

        Button loginButton = findViewById(R.id.login);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });

    }

    public void openRegistration(){
        Intent intent = new Intent(this, RegistrationActivity.class);
        startActivity(intent);

    }

    public void goToProfile(String token){
        Intent intent = new Intent(this, profileActivity.class);
        intent.putExtra("token: ",token );
        intent.putExtra("id: ",token );
        Log.d("RESPONSE:", token);
        startActivity(intent);
    }

    public void createLoginAlert(){
        AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
        builder.setMessage("Wrong Username Or Password");
        AlertDialog dialog = builder.create(); builder.create();
        builder.setPositiveButton("Okay", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // User clicked OK button
            }
        });
        dialog.show();
    }
    public void attemptLogin(){
        final EditText usernameEditText = findViewById(R.id.username);
        final EditText passwordEditText = findViewById(R.id.password);

        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://10.0.2.2:8000/api/users/login/";
        JSONObject jsonObject = null;
        try {
            jsonObject = getJsonObject();
        } catch (JSONException e) {

        }
        Log.d("JSONOBJECT",jsonObject.toString());
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(
                Request.Method.POST,url, jsonObject,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(LoginActivity.this,response.toString(),Toast.LENGTH_LONG).show();
                        try {
                            token = response.getString("token");
                            goToProfile(response.getString("token"));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        }) {

            /**
             * Passing some request headers
             * */
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> headers = new HashMap<String, String>();
                headers.put("Content-Type", "application/json; charset=utf-8");
                return headers;
            }
        };

        // Add the request to the RequestQueue.
        queue.add(jsonObjReq);

    }

    private JSONObject getJsonObject() throws JSONException {
        final TextView userName = (TextView) findViewById(R.id.username);
        final TextView password = (TextView) findViewById(R.id.password);
        JSONObject userObject = new JSONObject();
        userObject.put("username",userName.getText().toString());
        userObject.put("password",password.getText().toString());
        return userObject;
    }


}
