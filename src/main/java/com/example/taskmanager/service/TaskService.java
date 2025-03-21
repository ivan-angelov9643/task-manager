package com.example.taskmanager.service;

import com.example.taskmanager.db.model.Task;
import com.example.taskmanager.db.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTask(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task newTask) {
        return taskRepository.findById(id)
            .map(existingTask -> {
                existingTask.setTitle(newTask.getTitle());
                existingTask.setDescription(newTask.getDescription());
                existingTask.setCompleted(newTask.isCompleted());
                return taskRepository.save(existingTask);
            })
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
