package com.example.spring.contorllers;

import com.example.spring.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DashboardController {

    private DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBooks() {
        Map<String,Object> response = dashboardService.getBooks();
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<Map<String,Object>>(response, status);
    }

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBook(@PathVariable int id) {
        Map<String,Object> response = dashboardService.getBook(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteBooks(@PathVariable int id) {
        Map<String, Object> response = dashboardService.deleteBook(id);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK :
                response.get("Status").equals(400) ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewBook(@RequestBody String object) {
        Map<String, Object> response = dashboardService.addNewBook(object);
        HttpStatus status = response.get("Status").equals(200) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(response, status);
    }
}
