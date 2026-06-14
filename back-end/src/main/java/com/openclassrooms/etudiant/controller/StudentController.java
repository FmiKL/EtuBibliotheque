package com.openclassrooms.etudiant.controller;

import com.openclassrooms.etudiant.dto.StudentDTO;
import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.mapper.StudentDtoMapper;
import com.openclassrooms.etudiant.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final StudentDtoMapper studentDtoMapper;

    @PostMapping
    public ResponseEntity<StudentDTO> create(
        @Valid @RequestBody StudentDTO studentDTO
    ) {
        Student student = studentDtoMapper.toEntity(studentDTO);
        Student createdStudent = studentService.create(student);
        StudentDTO createdStudentDTO = studentDtoMapper.toDto(createdStudent);

        return new ResponseEntity<>(createdStudentDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> findAll() {
        List<StudentDTO> students = studentService.findAll()
                .stream()
                .map(studentDtoMapper::toDto)
                .toList();

        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> findById(@PathVariable Long id) {
        Student student = studentService.findById(id);
        StudentDTO studentDTO = studentDtoMapper.toDto(student);

        return ResponseEntity.ok(studentDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> update(
        @PathVariable Long id,
        @Valid @RequestBody StudentDTO studentDTO
    ) {
        Student student = studentDtoMapper.toEntity(studentDTO);
        Student updatedStudent = studentService.update(id, student);
        StudentDTO updatedStudentDTO = studentDtoMapper.toDto(updatedStudent);

        return ResponseEntity.ok(updatedStudentDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
