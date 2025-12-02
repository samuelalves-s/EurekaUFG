 package poo.EurekaUFG.repositories;

 import org.springframework.data.jpa.repository.JpaRepository;
 import poo.EurekaUFG.model.entity.Item;

 public interface ItemRepository extends JpaRepository<Item,Long> {
 }
