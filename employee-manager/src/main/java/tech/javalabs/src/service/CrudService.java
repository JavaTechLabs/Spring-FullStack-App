package tech.javalabs.src.service;

import java.util.List;

public interface CrudService<T> {

    public T save(T object);

    public T update(T object);

    public void delete(int id);

    public T findById(int id);

    public List<T> findAll();

}
