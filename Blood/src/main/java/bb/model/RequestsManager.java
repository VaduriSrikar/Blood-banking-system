package bb.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;


import bb.rep.RequestsRepository;
import bb.rep.DonorsRepository;

@Service
public class RequestsManager 
{
	@Autowired
	RequestsRepository RR;
	@Autowired
	DonorsRepository DR;
	

	public String insertrequest(Requests R)
	{
	   try {
		   RR.save(R);
		  return "200::new Request Added successfully";
	   }
	   catch(Exception e) {
		   return "401::"+e.getMessage();
	   }
	   
		
	}
	public String readrequest() {
		try 
		{
		  List<Requests> requestList = RR.findAll();
		  return new GsonBuilder().create().toJson(requestList);
			
		} 
		catch (Exception e) 
		{
			return "401::"+e.getMessage();
		}
	}
	public String getRequestDetailsbyId(Long id) {
		try 
		{
			Requests R=RR.findById(id).get();
			return new GsonBuilder().create().toJson(R); 
			
		} 
		catch (Exception e)
		{
			return "401::"+e.getMessage();
		}
	}

	public String updaterequest(Requests R) 
	{
		try
		{
		    RR.save(R);
		    return "200 :: Request details are updated";	
		} 
		catch (Exception e)
		{
			return "401::"+e.getMessage();
		}
	}
	public String deleterequest(Long id) {
	try 
	{
		RR.deleteById(id);
		return "200::Request details deleted successfully";
	}
	catch (Exception e) 
	{
		return "401::"+e.getMessage();
	}
	
	}
	
	public String getInventory() {
	    try {
	        List<Donors> donors = DR.findAll(); // Get all donors
	        List<Requests> requests = RR.findAll(); // Get all requests

	        // Group donors by bloodgroup+rhfactor
	        Map<String, Long> donorInventory = donors.stream()
	            .collect(Collectors.groupingBy(
	                d -> d.getBloodgroup() + d.getRhfactor(),
	                Collectors.counting()
	            ));

	        // Group requests by bloodgroup+rhfactor
	        Map<String, Long> requestInventory = requests.stream()
	            .collect(Collectors.groupingBy(
	                r -> r.getBloodgroup() + r.getRhfactor(),
	                Collectors.counting()
	            ));

	        // Status update per request
	        for (Requests r : requests) {
	            String key = r.getBloodgroup() + r.getRhfactor();
	            long availableDonors = donorInventory.getOrDefault(key, 0L);

	            if (availableDonors > 0) {
	                r.setStatus("accepted");
	            } else {
	                r.setStatus("pending");
	            }

	            RR.save(r); // Save updated request status
	        }

	        // Prepare a difference map for reporting
	        Map<String, Long> differenceMap = new HashMap<>();
	        for (String key : requestInventory.keySet()) {
	            long donorCount = donorInventory.getOrDefault(key, 0L);
	            long requestCount = requestInventory.get(key);
	            differenceMap.put(key, Math.abs(donorCount - requestCount));
	        }

	        // Return the result as JSON
	        return new GsonBuilder().setPrettyPrinting().create().toJson(differenceMap);

	    } catch (Exception e) {
	        return "401::" + e.getMessage();
	    }
	}


	

}
