package com.example.demo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Ambulance {

  private @Id @GeneratedValue Long  id;
  private String AName;
  private Ambulance(){} // many to many

  public Ambulance(String AName){
      this.AName = AName;
           
  }
}


