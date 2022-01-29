package com.example.Projekt1.util;

import javax.servlet.ServletContext;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class Utils {

    public static String downloadTemplate(String file, ServletContext context) throws IOException
    {
        StringBuffer output = new StringBuffer("");
        String text = "";
        InputStream is = context.getResourceAsStream("/WEB-INF/"+file);
        if (is != null) {
            InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
            BufferedReader reader = new BufferedReader(isr);
            while (  (text = reader.readLine()) != null ) {
                output.append(text).append("\n");
            }
        }
        else output.append("No File "+file);
        return output.toString();
    }

    public static String completeTeplate(String template, String maker, String file, ServletContext context) throws IOException
    {
        StringBuffer output = new StringBuffer("");
        String text = "";
        InputStream is = context.getResourceAsStream("/WEB-INF/"+file+".html");
        if (is != null) {
            InputStreamReader isr = new InputStreamReader(is, StandardCharsets.UTF_8);
            BufferedReader reader = new BufferedReader(isr);
            while ( (text = reader.readLine()) != null ) {
                output.append(text).append("\n");
            }
        }
        else output.append("No File "+file);
        return template.replace("[["+maker+"]]", output.toString());
    }

}
