package bb.model;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;

import bb.rep.DonorsRepository;

@Service
public class DonorsManager 
{
	@Autowired
	DonorsRepository DR;
	
	
	public String insertdonor(Donors D)
	{
	   try {
		   DR.save(D);
		  return "200::new Donor Added successfully";
	   }
	   catch(Exception e) {
		   return "401::"+e.getMessage();
	   }
	   
		
	}
	public String readdonor() {
		try 
		{
		  List<Donors> jobList = DR.findAll();
		  return new GsonBuilder().create().toJson(jobList);
			
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
	}
	public String getdonorDetailsbyId(Long id) {
		try 
		{
			Donors D=DR.findById(id).get();
			return new GsonBuilder().create().toJson(D); 
			
		} 
		catch (Exception e)
		{
			return "401::"+e.getMessage();
		}
	}

	public String updatedonor(Donors D) 
	{
		try
		{
		    DR.save(D);
		    return "200 :: donor details are updated";	
		} 
		catch (Exception e)
		{
			return "401::"+e.getMessage();
		}
	}
	public String deletedonor(Long id) {
	try 
	{
		DR.deleteById(id);
		return "200::donor details deleted successfully";
	}
	catch (Exception e) 
	{
		return "401::"+e.getMessage();
	}
	}
	public String getInventory() {
	    try {
	        List<Donors> donors = DR.findAll();
	        Map<String, Long> inventoryMap = donors.stream()
	            .collect(Collectors.groupingBy(
	                d -> d.getBloodgroup() + d.getRhfactor(),
	                Collectors.counting()
	            ));
	        return new GsonBuilder().create().toJson(inventoryMap);
	    } catch (Exception e) {
	        return "401::" + e.getMessage();
	    }
	}

	
}
