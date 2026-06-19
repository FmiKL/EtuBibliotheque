package com.openclassrooms.etudiant.service;

import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.repository.StudentRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class StudentServiceTest {
    private static final Long ID = 1L;
    private static final String FIRST_NAME = "John";
    private static final String LAST_NAME = "Doe";
    private static final String EMAIL = "john.doe@example.com";

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    public void test_create_student() {
        // GIVEN
        Student student = new Student();
        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        student.setEmail(EMAIL);

        when(studentRepository.save(student)).thenReturn(student);

        // WHEN
        Student createdStudent = studentService.create(student);

        // THEN
        assertThat(createdStudent).isEqualTo(student);
        verify(studentRepository).save(student);
    }

    @Test
    public void test_find_all_students() {
        // GIVEN
        Student student = new Student();
        student.setId(ID);
        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        student.setEmail(EMAIL);

        when(studentRepository.findAll()).thenReturn(List.of(student));

        // WHEN
        List<Student> students = studentService.findAll();

        // THEN
        assertThat(students).containsExactly(student);
    }

    @Test
    public void test_find_student_by_id() {
        // GIVEN
        Student student = new Student();
        student.setId(ID);
        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        student.setEmail(EMAIL);

        when(studentRepository.findById(ID)).thenReturn(Optional.of(student));

        // WHEN
        Student foundStudent = studentService.findById(ID);

        // THEN
        assertThat(foundStudent).isEqualTo(student);
    }

    @Test
    public void test_update_student() {
        // GIVEN
        Student existingStudent = new Student();
        existingStudent.setId(ID);
        existingStudent.setFirstName(FIRST_NAME);
        existingStudent.setLastName(LAST_NAME);
        existingStudent.setEmail(EMAIL);

        Student newStudent = new Student();
        newStudent.setFirstName("Jane");
        newStudent.setLastName("Smith");
        newStudent.setEmail("jane.smith@example.com");

        when(studentRepository.findById(ID))
                .thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(existingStudent))
                .thenReturn(existingStudent);

        // WHEN
        Student updatedStudent = studentService.update(ID, newStudent);

        // THEN
        assertThat(updatedStudent.getFirstName()).isEqualTo("Jane");
        assertThat(updatedStudent.getLastName()).isEqualTo("Smith");
        assertThat(updatedStudent.getEmail())
                .isEqualTo("jane.smith@example.com");
        verify(studentRepository).save(existingStudent);
    }

    @Test
    public void test_delete_student() {
        // GIVEN
        Student student = new Student();
        student.setId(ID);
        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        student.setEmail(EMAIL);

        when(studentRepository.findById(ID)).thenReturn(Optional.of(student));

        // WHEN
        studentService.delete(ID);

        // THEN
        verify(studentRepository).delete(student);
    }
}
