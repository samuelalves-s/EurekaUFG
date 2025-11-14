package poo.EurekaUFG;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;
import java.util.List;

public class Main {

    static Scanner scanner = new Scanner(System.in);
    public static void main(String[] args) {

        int opcao;
        do {
            exibirMenu();
            opcao = Integer.parseInt(scanner.nextLine());
            switch (opcao) {
                case 0 -> salvarProduto();
                case 1 -> buscarTodosProdutos();
                case 2 -> buscarProdutoPorId();
                case 3 -> atualizarProduto();
                case 4 -> excluirProduto();
                case 5 -> System.exit(0);
                default -> System.out.println("Opção inválida!");
            }
        } while (opcao != 0);

    }

    private static void exibirMenu() {
        System.out.println("\n### Menu de Operações ###");
        System.out.println("0. Salvar novo produto");
        System.out.println("1. Buscar todos produtos");
        System.out.println("2. Buscar produto por ID");
        System.out.println("3. Atualizar produto");
        System.out.println("4. Excluir produto");
        System.out.println("5. Sair do programa");
        System.out.print("Escolha uma opção: ");
    }

    private static void salvarProduto() {
        var url = "jdbc:mysql://localhost:3306/eureka.db";
        try (var connection = DriverManager.getConnection(url,"root","")){
            System.out.println("Conectado com sucesso!");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private static void buscarTodosProdutos() {

    }

    private static void buscarProdutoPorId() {

    }

    private static void atualizarProduto() {

    }

    private static void excluirProduto() {}

}