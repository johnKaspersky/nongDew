package com.example.demo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity

public class Symptom{
private @Id @GeneratedValue Long id;
    private String symptom;
   

  private Symptom(){}

  public Symptom(String symptom){
      this.symptom = symptom;
      
  }
}


