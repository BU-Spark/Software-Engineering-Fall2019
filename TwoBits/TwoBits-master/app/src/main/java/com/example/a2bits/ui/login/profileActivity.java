package com.example.a2bits.ui.login;

import android.animation.ArgbEvaluator;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.a2bits.R;
import com.example.a2bits.ui.Adaptor;
import com.example.a2bits.ui.Model;

import java.util.ArrayList;
import java.util.List;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

public class profileActivity extends AppCompatActivity {

    ViewPager viewPager;
    Adaptor adaptor;
    List<Model> models;
    Integer[] colors = null;
    ArgbEvaluator argbEvaluator = new ArgbEvaluator();

    public void goToCategories(){
        Intent intent = new Intent(this, categoriesActivity.class);
        startActivity(intent);
    }

    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile);

        Button toCategories = findViewById(R.id.button7);
        toCategories.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToCategories();
            }
        });

    }
}
