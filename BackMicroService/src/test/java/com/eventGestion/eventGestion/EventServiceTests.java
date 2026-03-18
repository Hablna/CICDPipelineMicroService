package com.eventGestion.eventGestion;

import com.eventGestion.eventGestion.Repository.eventRepository;
import com.eventGestion.eventGestion.model.event;
import com.eventGestion.eventGestion.service.eventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
class EventServiceTests {

	@Autowired
	private eventRepository repository;

	@Autowired
	private eventService service;

	@BeforeEach
	void cleanDatabase() {
		repository.deleteAll();
	}

	@Test
	void testModifyEvent() {
		// Arrange
		event existingEvent = new event();
		existingEvent.setTitle("Old Title");
		existingEvent = repository.save(existingEvent);

		event updatedEvent = new event();
		updatedEvent.setId(existingEvent.getId());
		updatedEvent.setTitle("New Title");

		// Act
		event result = service.modifyEvent(updatedEvent);

		// Assert
		assertNotNull(result);
		assertEquals("New Title", result.getTitle());
	}

	@Test
	void testFindAllEvents() {
		// Arrange
		event event1 = new event();
		event1.setTitle("Event 1");
		repository.save(event1);

		event event2 = new event();
		event2.setTitle("Event 2");
		repository.save(event2);

		// Act
		List<event> events = service.findAllEvents();

		// Assert
		assertNotNull(events);
		assertEquals(2, events.size());
		List<String> titles = events.stream().map(event::getTitle).collect(Collectors.toList());
		assertTrue(titles.contains("Event 1"));
		assertTrue(titles.contains("Event 2"));
	}

	@Test
	void testCreateEvent() {
		// Arrange
		event newEvent = new event();
		newEvent.setTitle("New Event");
		newEvent.setDescription("Description of the new event");
		newEvent.setLocation("Location A");

		// Act
		Long eventId = service.createEvent(newEvent);

		// Assert
		assertNotNull(eventId);
		event savedEvent = repository.findById(eventId).orElse(null);
		assertNotNull(savedEvent);
		assertEquals("New Event", savedEvent.getTitle());
		assertEquals("Description of the new event", savedEvent.getDescription());
		assertEquals("Location A", savedEvent.getLocation());
	}

	@Test
	void testDeleteEvent() {
		// Arrange
		event eventToDelete = new event();
		eventToDelete.setTitle("Event to Delete");
		eventToDelete = repository.save(eventToDelete);

		Long eventId = eventToDelete.getId();

		// Act
		boolean isDeleted = service.deleteEvent(eventId);

		// Assert
		assertTrue(isDeleted);
		assertFalse(repository.findById(eventId).isPresent());
	}
}
