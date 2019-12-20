package com.example.a2bits;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

public class navigation extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.navigation_home:
                        Toast.makeText(navigation.this, "Home", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.navigation_categories:
                        Toast.makeText(navigation.this, "Categories", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.navigation_chat:
                        Toast.makeText(navigation.this, "Chat", Toast.LENGTH_SHORT).show();
                        break;
                    case R.id.navigation_profile:
                        Toast.makeText(navigation.this, "Profile", Toast.LENGTH_SHORT).show();
                        break;
                }
                return true;
            }
        });
    }
}

