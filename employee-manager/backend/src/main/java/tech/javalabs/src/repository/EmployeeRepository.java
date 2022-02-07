package tech.javalabs.src.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tech.javalabs.src.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
