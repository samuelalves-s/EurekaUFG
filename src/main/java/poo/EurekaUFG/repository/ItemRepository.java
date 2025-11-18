// package poo.EurekaUFG.repository;

// import jakarta.persistence.EntityManager;
// import jakarta.persistence.PersistenceContext;
// import org.springframework.stereotype.Repository;
// import org.springframework.transaction.annotation.Transactional;
// import poo.EurekaUFG.model.entity.Item;

// import java.util.List;

// @Repository
// @Transactional
// public class ItemRepository {

//     @PersistenceContext
//     private EntityManager em;

//     public void salvar(Item item) {
//         em.persist(item);
//     }

//     public List<Item> listar() {
//         return em.createQuery("FROM Item", Item.class)
//                 .getResultList();
//     }

//     public Item buscarPorId(Long id) {
//         return em.find(Item.class, id);
//     }

//     public void atualizar(Item item) {
//         em.merge(item);
//     }

//     public void excluir(Long id) {
//         Item item = em.find(Item.class, id);
//         if (item != null) em.remove(item);
//     }
// }
