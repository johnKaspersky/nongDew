package com.example.demo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity

public class Doctor{
private @Id @GeneratedValue Long id;
    private String name;
   
  private Doctor(){} // many to many

  public Doctor(String name){
      this.name = name;
      
  }
}


