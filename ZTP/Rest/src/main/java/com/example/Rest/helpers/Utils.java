package com.example.Rest.helpers;

import java.util.Base64;

public class Utils {

    public static String getBase64FromString(String str) {
        return Base64.getEncoder().encodeToString(str.getBytes());
    }

}
