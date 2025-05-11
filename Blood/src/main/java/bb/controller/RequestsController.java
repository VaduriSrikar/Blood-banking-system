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

import bb.model.Requests;
import bb.model.RequestsManager;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins="*")
public class RequestsController 
{
	@Autowired
	RequestsManager RM;
	
	@PostMapping("/insert")
	public String insert(@RequestBody Requests R)
	{
		return RM.insertrequest(R);
	}
	
	@GetMapping("/readrequest")
	public String readrequest() {
		return RM.readrequest();		
	}
	@GetMapping("/getrequest/{id}")
	public String getrequestbyid(@PathVariable("id") Long id) 
	{ return RM.getRequestDetailsbyId(id);
		
	}
	
	@PutMapping("/update")
	public String updaterequest(@RequestBody Requests R) 
	{
		return RM.updaterequest(R);
	}
	@DeleteMapping("/delete/{id}")
	public String deleterequest(@PathVariable("id") Long id) {
		return RM.deleterequest(id);
	}
	
	@PutMapping("/accept")
	public String acceptRequest() {
	    return RM.getInventory();
	}

}
