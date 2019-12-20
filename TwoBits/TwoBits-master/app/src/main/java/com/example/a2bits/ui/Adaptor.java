package com.example.a2bits.ui;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.a2bits.R;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.viewpager.widget.PagerAdapter;

public class Adaptor extends PagerAdapter {

    private List<Model> models;
    private LayoutInflater layoutInflater;
    private Context context;

    public Adaptor(List<Model> models, Context context) {
        this.models = models;
        this.context = context;
    }


    @Override
    public int getCount() {
        return models.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view.equals(object);
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        layoutInflater = LayoutInflater.from(context);
        View view = layoutInflater.inflate(R.layout.notification, container, false);

        ImageView imageView;
        TextView notificationTitle, chairtyTitle, charityEmail;

        imageView = view.findViewById(R.id.redCrossLogo);
        notificationTitle = view.findViewById(R.id.notificationTitle1);
        chairtyTitle = view.findViewById(R.id.charityTitle);
        charityEmail = view.findViewById(R.id.charityEmail);

        imageView.setImageResource(models.get(position).getLogo());
        notificationTitle.setText(models.get(position).getNotificationTitle());
        chairtyTitle.setText(models.get(position).getCharityTitle());
        charityEmail.setText(models.get(position).getCharityEmail());

        container.addView(view, 0);

        return view;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView((View)object);
    }
}
