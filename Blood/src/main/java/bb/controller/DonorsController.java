package bb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bb.model.Donors;
import bb.model.DonorsManager;

@RestController
@RequestMapping("/donors")
@CrossOrigin(origins="*")
public class DonorsController 
{
	@Autowired
	DonorsManager DM;
	
	@PostMapping("/insert")
	public String insert(@RequestBody Donors D)
	{
		return DM.insertdonor(D);
	}
	
	@GetMapping("/readdonor")
	public String readdonor() {
		return DM.readdonor();		
	}
	@GetMapping("/getdonor/{id}")
	public String getdonorbyid(@PathVariable("id") Long id) 
	{ return DM.getdonorDetailsbyId(id);
		
	}
	
	@PutMapping("/update")
	public String updatedonor(@RequestBody Donors D) 
	{
		return DM.updatedonor(D);
	}
	@DeleteMapping("/delete/{id}")
	public String deletedonor(@PathVariable("id") Long id) {
		return DM.deletedonor(id);
	}
	
	@GetMapping("/inventory")
	public String getInventory() {
	    return DM.getInventory();
	}


}
