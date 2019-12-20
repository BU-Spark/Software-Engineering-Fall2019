package com.example.a2bits.ui.login;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.view.View;

import java.util.ArrayList;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;


import com.plaid.link.Plaid;
import com.plaid.linkbase.models.LinkConfiguration;
import com.plaid.linkbase.models.LinkConnection;
import com.plaid.linkbase.models.LinkConnectionMetadata;
import com.plaid.linkbase.models.PlaidProduct;

public class UserPlaidActivity extends AppCompatActivity{
    private static final int LINK_REQUEST_CODE = 1;
    private TextView contentTextView;
    private static boolean result;

    public static void auhtorizePlaidUser(Button button, AppCompatActivity activity) {
        button.setOnClickListener(view -> {

            Log.d("donate button pressed", "PROCESS initiated");
            ArrayList<PlaidProduct> products = new ArrayList<>();
            products.add(PlaidProduct.TRANSACTIONS);
            Plaid.openLink(activity,
                    new LinkConfiguration.Builder("TwoBits Donations", products).build(),
                    LINK_REQUEST_CODE);
        });
    }

    public static void PlaidOnActivityResult(
            int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == LINK_REQUEST_CODE && data != null) {
            Log.d("ProfileActivityEvent2", "Plaid done");
            if (Plaid.RESULT_SUCCESS == resultCode) {
                Log.d("resultCode", "RESULT_SUCCESS");
                LinkConnection item = (LinkConnection) data.getSerializableExtra(Plaid.LINK_RESULT);
                if (item != null) {
                    LinkConnectionMetadata metadata = item.getLinkConnectionMetadata();
                    Log.d("Public token = ", item.getPublicToken());
                }
                result=true;
                // Upon success -> update UserProfile is_donator = True
            }
            else if (Plaid.RESULT_CANCELLED == resultCode) {
                Log.d("resultCode", "RESULT_CANCELLED");
            }
            else if (Plaid.RESULT_EXIT == resultCode) {
                Log.d("resultCode", "RESULT_EXIT");
            }
            else if (Plaid.RESULT_EXCEPTION == resultCode) {
                Log.d("resultCode", "RESULT_EXCEPTION");
            }
        }

    }

    public static boolean getResult(){
        return result;
    }

}

