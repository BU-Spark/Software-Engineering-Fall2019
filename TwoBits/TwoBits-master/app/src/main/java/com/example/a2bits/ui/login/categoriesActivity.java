package com.example.a2bits.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.a2bits.R;

import androidx.appcompat.app.AppCompatActivity;

public class categoriesActivity extends AppCompatActivity {
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.categories);

        Button animalButton = findViewById(R.id.button1);
        animalButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openAnimal();
            }
        });

        Button healthButton = findViewById(R.id.button3);
        healthButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openHealth();
            }
        });
    }

    public void openHealth(){
        Intent i = getIntent();
        Intent intent = new Intent(this, healthActivity.class);
        intent.putExtra("token", i.getStringExtra("token"));
        intent.putExtra("id", i.getStringExtra("id"));
        startActivity(intent);
    }

    public void openAnimal(){
        Intent i = getIntent();
        Intent intent = new Intent(this, animalActivity.class);
        intent.putExtra("token", i.getStringExtra("token"));
        intent.putExtra("id", i.getStringExtra("id"));
        startActivity(intent);
    }
}
