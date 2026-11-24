import upcomingData from './events/upcomingEvents.json' with { type: 'json' };
import pastData from './events/pastEvents.json' with { type: 'json' };

export function siteDate(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Fortaleza' }).format(now);
}

export function splitEvents(upcoming, past, today = siteDate()) {
  return {
    upcomingEvents: upcoming.filter((event) => !event.endDate || event.endDate >= today),
    pastEvents: [...upcoming.filter((event) => event.endDate && event.endDate < today), ...past],
  };
}

export function getEvents(today = siteDate()) {
  return splitEvents(upcomingData.events, pastData.events, today);
}

export function registrationIsOpen(event, today = siteDate()) {
  return Boolean(event.link && event.registrationStatus === 'open'
    && (!event.registrationDeadline || event.registrationDeadline >= today)
    && (!event.endDate || event.endDate >= today));
}

export function registrationMessage(event, today = siteDate()) {
  return registrationIsOpen(event, today) ? 'Inscrições abertas'
    : event.registrationStatus === 'closed' || (event.registrationDeadline && event.registrationDeadline < today)
      ? 'Inscrições encerradas' : 'Inscrições em breve. Acompanhe nossos canais.';
}
