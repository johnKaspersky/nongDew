package com.example.demo;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity

public class Hospital{
private @Id @GeneratedValue Long  id;
  private String HName;

 

  private Hospital(){} // many to many

  public Hospital(String HName){
      this.HName = HName;
    
      
  }
}


