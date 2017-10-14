package com.example.demo;



import lombok.Data;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;

@Data
@Entity
public class History {

	private @Id
	@GeneratedValue
	Long id;
	@ManyToOne
	private Patient diagnosesymptom;
    private String  diagnose;

	private History() {}

	public History(Patient diagnosesymptom, String diagnose) {
		this.diagnosesymptom = diagnosesymptom;
		this.diagnose = diagnose;
	}
}