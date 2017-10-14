package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
@Controller

public class MakeHistoryController {
    @Autowired
    HistoryRepository historyRepository;
    @Autowired
    PatientRepository patientRepository;
     @ResponseBody
    @RequestMapping(path = "/vote/{id}/point/{point}" , method = RequestMethod.GET)   
     public String history(@PathVariable Long id,@PathVariable String point){
        Patient patient = this.patientRepository.findOne(id);
        History historys = new History(patient,point);
        this.historyRepository.save(historys);
         return "{\"status\":\"Voted\"}";
    }
}