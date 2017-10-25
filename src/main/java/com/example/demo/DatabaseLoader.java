package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final PatientRepository patientRepository;
	private final DoctorRepository doctorRepository;
	private final AmbulanceRepository ambulanceRepository;
	private final HospitalRepository hospitalRepository;
    @Autowired
    public DatabaseLoader(DoctorRepository repository1,PatientRepository repository2,AmbulanceRepository repository3,HospitalRepository repository4) {
        this.doctorRepository = repository1;
	   this.patientRepository = repository2;
	   this.ambulanceRepository = repository3;
	     this.hospitalRepository = repository4;
    }
	
	@Override
	public void run(String... strings) throws Exception {
 	this.patientRepository.save(new Patient("Bancha","HOT head"));
		this.doctorRepository.save(new Doctor("Banchon"));
		this.ambulanceRepository.save(new Ambulance("AB-213"));
		this.hospitalRepository.save(new Hospital("SUT"));
	}

	
}