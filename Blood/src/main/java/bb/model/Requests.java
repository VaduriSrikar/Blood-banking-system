package bb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="requests")
public class Requests 
{  
  @Id
  @Column(name= "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  Long id;
  
  @Column(name= "name")
  String name;
  
  @Column(name= "organisation")
  String organisation;
  
  @Column(name= "location")
  String location;
  
  @Column(name= "bloodgroup")
  String bloodgroup;
  
  @Column(name= "rhfactor")
  String rhfactor;
  
  @Column(name= "medicalhistory")
  String medicalhistory;
  
  @Column(name = "status")
  String status = "pending"; // default status


public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getOrganisation() {
	return organisation;
}

public void setOrganisation(String organisation) {
	this.organisation = organisation;
}

public String getLocation() {
	return location;
}

public void setLocation(String location) {
	this.location = location;
}

public String getBloodgroup() {
	return bloodgroup;
}

public void setBloodgroup(String bloodgroup) {
	this.bloodgroup = bloodgroup;
}

public String getRhfactor() {
	return rhfactor;
}

public void setRhfactor(String rhfactor) {
	this.rhfactor = rhfactor;
}

public String getMedicalhistory() {
	return medicalhistory;
}

public void setMedicalhistory(String medicalhistory) {
	this.medicalhistory = medicalhistory;
}
public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}


}