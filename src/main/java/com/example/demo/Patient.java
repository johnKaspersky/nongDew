package com.example.demo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;


@Data
@Entity

public class Patient {

     private @Id @GeneratedValue Long  id;
     private String name;
      private String Symptom;

     private Patient(){}

      public Patient(String name ,String Symptom){
      this.name  = name;
      this.Symptom=Symptom;
      
  }
}


