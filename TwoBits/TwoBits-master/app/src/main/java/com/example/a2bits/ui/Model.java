package com.example.a2bits.ui;

public class Model {

    private int logo;
    private String notificationTitle;
    private String charityTitle;
    private String charityEmail;

    public Model(int logo, String notificationTitle, String charityTitle, String charityEmail) {
        this.logo = logo;
        this.notificationTitle = notificationTitle;
        this.charityTitle = charityTitle;
        this.charityEmail = charityEmail;
    }

    public int getLogo() {
        return logo;
    }

    public void setLogo(int logo) {
        this.logo = logo;
    }

    public String getNotificationTitle() {
        return notificationTitle;
    }

    public void setNotificationTitle(String notificationTitle) {
        this.notificationTitle = notificationTitle;
    }

    public String getCharityTitle() {
        return charityTitle;
    }

    public void setCharityTitle(String charityTitle) {
        this.charityTitle = charityTitle;
    }

    public String getCharityEmail() {
        return charityEmail;
    }

    public void setCharityEmail(String charityEmail) {
        this.charityEmail = charityEmail;
    }


}
