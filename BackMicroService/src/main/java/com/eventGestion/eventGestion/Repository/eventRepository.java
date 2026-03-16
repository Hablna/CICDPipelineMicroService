package com.eventGestion.eventGestion.Repository;

import com.eventGestion.eventGestion.model.event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface eventRepository extends JpaRepository<event, Long> {
    //Ici mettre mes requetes personnalisées
}
