package com.openclassrooms.etudiant.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.etudiant.dto.StudentDTO;
import com.openclassrooms.etudiant.entities.Student;
import com.openclassrooms.etudiant.entities.User;
import com.openclassrooms.etudiant.repository.StudentRepository;
import com.openclassrooms.etudiant.repository.UserRepository;
import com.openclassrooms.etudiant.service.UserService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
public class StudentControllerTest {

    private static final String URL = "/api/students";
    private static final String FIRST_NAME = "John";
    private static final String LAST_NAME = "Doe";
    private static final String EMAIL = "john.doe@example.com";
    private static final String LOGIN = "login";
    private static final String PASSWORD = "password";

    @Container
    static MySQLContainer mySQLContainer = new MySQLContainer("mysql:8.0");

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    private String token;

    @DynamicPropertySource
    static void configureTestProperties(DynamicPropertyRegistry registry) {
        // Connecte Spring au conteneur MySQL temporaire.
        registry.add("spring.datasource.url", () -> mySQLContainer.getJdbcUrl());
        registry.add("spring.datasource.username", () -> mySQLContainer.getUsername());
        registry.add("spring.datasource.password", () -> mySQLContainer.getPassword());
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create");
    }

    @BeforeEach
    public void beforeEach() {
        User user = new User();
        user.setFirstName(FIRST_NAME);
        user.setLastName(LAST_NAME);
        user.setLogin(LOGIN);
        user.setPassword(PASSWORD);

        userService.register(user);

        // Génère un vrai token nécessaire pour les routes étudiants protégées.
        token = userService.login(LOGIN, PASSWORD);
    }

    @AfterEach
    public void afterEach() {
        studentRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void createStudentSuccessful() throws Exception {
        // GIVEN
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setFirstName(FIRST_NAME);
        studentDTO.setLastName(LAST_NAME);
        studentDTO.setEmail(EMAIL);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.post(URL)
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(studentDTO))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName")
                        .value(FIRST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName")
                        .value(LAST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email")
                        .value(EMAIL));
    }

    @Test
    public void findAllStudentsSuccessful() throws Exception {
        // GIVEN
        Student student = createStudent();

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(URL)
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id")
                        .value(student.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName")
                        .value(FIRST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName")
                        .value(LAST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email")
                        .value(EMAIL));
    }

    @Test
    public void findStudentByIdSuccessful() throws Exception {
        // GIVEN
        Student student = createStudent();

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(URL + "/" + student.getId())
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id")
                        .value(student.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName")
                        .value(FIRST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName")
                        .value(LAST_NAME))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email")
                        .value(EMAIL));
    }

    @Test
    public void updateStudentSuccessful() throws Exception {
        // GIVEN
        Student student = createStudent();

        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setFirstName("Jane");
        studentDTO.setLastName("Smith");
        studentDTO.setEmail("jane.smith@example.com");

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put(URL + "/" + student.getId())
                        .header("Authorization", "Bearer " + token)
                        .content(objectMapper.writeValueAsString(studentDTO))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName")
                        .value("Jane"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName")
                        .value("Smith"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email")
                        .value("jane.smith@example.com"));
    }

    @Test
    public void deleteStudentSuccessful() throws Exception {
        // GIVEN
        Student student = createStudent();

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete(URL + "/" + student.getId())
                        .header("Authorization", "Bearer " + token))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    private Student createStudent() {
        Student student = new Student();
        student.setFirstName(FIRST_NAME);
        student.setLastName(LAST_NAME);
        student.setEmail(EMAIL);

        return studentRepository.save(student);
    }
}
