package bb.rep;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bb.model.Donors;

@Repository
public interface DonorsRepository extends JpaRepository<Donors, Long>{
	 // Count available donors matching blood group and Rh factor
    @Query("SELECT COUNT(d) FROM Donors d WHERE d.bloodgroup = :bloodgroup AND d.rhfactor = :rhfactor")
  
    List<Donors> findMatchingDonors(String bloodgroup, String rhfactor);


}
