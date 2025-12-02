package poo.EurekaUFG;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//import poo.EurekaUFG.repository.ItemRepository;
// import poo.EurekaUFG.model.entity.Item;

import java.util.List;

@SpringBootApplication
@RestController
public class EurekaUfgApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaUfgApplication.class, args);
	}

}