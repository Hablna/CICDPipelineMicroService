package com.eventGestion.eventGestion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.eventGestion.eventGestion.service.eventService;
import com.eventGestion.eventGestion.model.event;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*") //Pour CORS
@Controller
public class eventController {
    @Autowired
    eventService eventService;

    @PostMapping("/createEvent")
    public ResponseEntity<Long> createEvent(@RequestBody event event){
        Long createdEventId = eventService.createEvent(event);
        return ResponseEntity.ok(createdEventId);
    }

    @PostMapping("/updateEvent")
    public ResponseEntity<event> updateEvent(@RequestBody event event){
        event updatedEvent = eventService.modifyEvent(event);
        return ResponseEntity.ok(updatedEvent);
    }

    //dele
    @DeleteMapping("/deleteEvent")
    public ResponseEntity<Boolean> deleteEvent(@RequestBody Long eventId){
        Boolean isDeleted = eventService.deleteEvent(eventId);
        return ResponseEntity.ok(isDeleted);
    }

    @GetMapping("/getEvents" )
    public ResponseEntity<Iterable<event>> getAllEvents() {
        Iterable<event> events = eventService.findAllEvents();
        return ResponseEntity.ok(events);
    }
}
