package bb.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;

import bb.rep.MenusRepository;
import bb.rep.UsersRepository;


@Service
public class MenusManager
{
	@Autowired
	MenusRepository MR;
	@Autowired
	JWTManager JWT;
	@Autowired
	UsersRepository UR;
	public String getMenus() 
	{
		List<String> menulist=new ArrayList<String>();
		for(Menus M:MR.findAll()) 
		{
			menulist.add(new GsonBuilder().create().toJson(M));
		}
		return menulist.toString();
	}
	
	public String getMenusByRole(String token)
	{
		String email=JWT.validateToken(token);
		if(email.equals("401"))
		{
			return "401:: Invalid Token";
		}
		Users U=UR.findById(email).get();
		List<Menus> menuitems= MR.findbyRole(U.getRole());
		
		return new GsonBuilder().create().toJson(menuitems).toString();
		
		
		
	}

}
