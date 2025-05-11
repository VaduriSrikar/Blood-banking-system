package bb.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import bb.rep.UsersRepository;


@Service
public class UsersManager 
{
	@Autowired
    UsersRepository UR;
	@Autowired
	EmailManager EM;
	@Autowired
	JWTManager JWT;
	public String addUsers(Users U)
	{
		if(UR.validateEmail(U.getEmail())>0) {
			return "401::Email Id alreaady existed";
		}
		UR.save(U);
		return "200::User Registered Successfully";
	}
	public String recoverPassword(String email)
	{
		Users U=UR.findById(email).get();
		String message=String.format("Dear %s \n\n Your Password is:%s",U.getFullname(),U.getPassword());
		return EM.sendEmail(U.getEmail(), "Job-portal Recovered Password", message);
	}
	
	public String validateCredentials(String email, String password)
	{
	  if(UR.validatecredentials(email,password)>0)
	  {
		 String token=JWT.generateToken(email); 
		 return "200::"+token;
	  }
	  else
	  {
		  return "401:: Invalid Crendentials";
	  }
 		
	}
	public String getFullname(String token)
	{
		String email =JWT.validateToken(token);
		if(email.compareTo("401")==0)
		{
			return "401::Token Expired";
		}
		else {
			Users U= UR.findById(email).get();
			return U.getFullname();
		}
		
	}
	
	
}
