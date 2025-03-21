package com.example.taskmanager.db.repository;

import com.example.taskmanager.db.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
}
