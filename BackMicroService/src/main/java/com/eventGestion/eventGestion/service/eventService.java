package com.eventGestion.eventGestion.service;

import org.springframework.stereotype.Service;
import com.eventGestion.eventGestion.Repository.eventRepository;
import com.eventGestion.eventGestion.model.event;

import java.util.List;

@Service
public class eventService {
    final eventRepository eventRepository;

    public eventService(eventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    //createEvent return Id of the created event
    public Long createEvent(event event) {
        event savedEvent = eventRepository.save(event);
        return savedEvent.getId();
    }

    //modification d'un event
    public event modifyEvent(event event) {
        event existingEvent = eventRepository.findById(event.getId()).get();
        if (existingEvent != null) {
            existingEvent.setTitle(event.getTitle());
            existingEvent.setDate(event.getDate());
            existingEvent.setLocation(event.getLocation());
            existingEvent.setDescription(event.getDescription());
            // Mettre à jour d'autres champs si nécessaire
            return eventRepository.save(existingEvent);
        }
        return null;
    }

    //suppression d'un event
    public boolean deleteEvent(Long eventId) {
        event ExistingEvent = eventRepository.findById(eventId).orElse(null);
        if (ExistingEvent != null) {
            eventRepository.deleteById(eventId);
            return true;
        }
        return false;
    }

    //findAllEvents
    public List<event> findAllEvents() {
        return eventRepository.findAll();
    }
}
