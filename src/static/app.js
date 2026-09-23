document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");
  const languageSelect = document.getElementById("language-select");

  const translations = {
    en: {
      language: "Language",
      schoolName: "Mergington High School",
      subtitle: "Extracurricular Activities",
      availableActivities: "Available Activities",
      signupTitle: "Sign Up for an Activity",
      emailLabel: "Student Email:",
      activityLabel: "Select Activity:",
      activityPlaceholder: "-- Select an activity --",
      submit: "Sign Up",
      loading: "Loading activities...",
      failedToLoad: "Failed to load activities. Please try again later.",
      scheduleLabel: "Schedule:",
      availabilityLabel: "Availability:",
      participantsLabel: "Participants:",
      noParticipants: "No participants yet.",
      spotsLeft: "spots left",
      signupFailure: "Failed to sign up. Please try again.",
      genericError: "An error occurred",
      studentAlreadySignedUp: "Student is already signed up",
      activityNotFound: "Activity not found",
      signedUp: "Signed up",
      forText: "for",
      languageEnglish: "English",
      languageSpanish: "Español"
    },
    es: {
      language: "Idioma",
      schoolName: "Escuela Secundaria Mergington",
      subtitle: "Actividades Extracurriculares",
      availableActivities: "Actividades Disponibles",
      signupTitle: "Inscribirse a una Actividad",
      emailLabel: "Correo del estudiante:",
      activityLabel: "Selecciona una actividad:",
      activityPlaceholder: "-- Selecciona una actividad --",
      submit: "Inscribirse",
      loading: "Cargando actividades...",
      failedToLoad: "No se pudieron cargar las actividades. Inténtalo de nuevo más tarde.",
      scheduleLabel: "Horario:",
      availabilityLabel: "Disponibilidad:",
      participantsLabel: "Participantes:",
      noParticipants: "Aún no hay participantes.",
      spotsLeft: "cupos disponibles",
      signupFailure: "No se pudo registrar. Inténtalo de nuevo.",
      genericError: "Ocurrió un error",
      studentAlreadySignedUp: "El estudiante ya está inscrito",
      activityNotFound: "Actividad no encontrada",
      signedUp: "Inscrito",
      forText: "para",
      languageEnglish: "English",
      languageSpanish: "Español"
    }
  };

  const activityTranslations = {
    "Chess Club": {
      en: { name: "Chess Club", description: "Learn strategies and compete in chess tournaments", schedule: "Fridays, 3:30 PM - 5:00 PM" },
      es: { name: "Club de Ajedrez", description: "Aprende estrategias y compite en torneos de ajedrez", schedule: "Viernes, 3:30 PM - 5:00 PM" }
    },
    "Programming Class": {
      en: { name: "Programming Class", description: "Learn programming fundamentals and build software projects", schedule: "Tuesdays and Thursdays, 3:30 PM - 4:30 PM" },
      es: { name: "Clase de Programación", description: "Aprende fundamentos de programación y crea proyectos de software", schedule: "Martes y jueves, 3:30 PM - 4:30 PM" }
    },
    "Gym Class": {
      en: { name: "Gym Class", description: "Physical education and sports activities", schedule: "Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM" },
      es: { name: "Clase de Gimnasia", description: "Educación física y actividades deportivas", schedule: "Lunes, miércoles y viernes, 2:00 PM - 3:00 PM" }
    },
    "Basketball Team": {
      en: { name: "Basketball Team", description: "Practice basketball skills and compete in school games", schedule: "Tuesdays and Thursdays, 4:00 PM - 5:30 PM" },
      es: { name: "Equipo de Baloncesto", description: "Practica habilidades de baloncesto y compite en juegos escolares", schedule: "Martes y jueves, 4:00 PM - 5:30 PM" }
    },
    "Track and Field": {
      en: { name: "Track and Field", description: "Train for running, jumping, and throwing events", schedule: "Mondays and Wednesdays, 3:30 PM - 5:00 PM" },
      es: { name: "Atletismo", description: "Entrena para carreras, saltos y lanzamientos", schedule: "Lunes y miércoles, 3:30 PM - 5:00 PM" }
    },
    "Art Club": {
      en: { name: "Art Club", description: "Explore drawing, painting, and other visual art techniques", schedule: "Wednesdays, 3:30 PM - 5:00 PM" },
      es: { name: "Club de Arte", description: "Explora dibujo, pintura y otras técnicas de arte visual", schedule: "Miércoles, 3:30 PM - 5:00 PM" }
    },
    "Drama Club": {
      en: { name: "Drama Club", description: "Develop acting skills and perform plays for the school community", schedule: "Tuesdays, 3:30 PM - 5:00 PM" },
      es: { name: "Club de Teatro", description: "Desarrolla habilidades de actuación y presenta obras para la comunidad escolar", schedule: "Martes, 3:30 PM - 5:00 PM" }
    },
    "Science Club": {
      en: { name: "Science Club", description: "Conduct experiments and explore fascinating scientific topics", schedule: "Thursdays, 3:30 PM - 5:00 PM" },
      es: { name: "Club de Ciencias", description: "Realiza experimentos y explora temas científicos fascinantes", schedule: "Jueves, 3:30 PM - 5:00 PM" }
    },
    "Debate Club": {
      en: { name: "Debate Club", description: "Build research, public speaking, and critical thinking skills", schedule: "Fridays, 3:30 PM - 5:00 PM" },
      es: { name: "Club de Debate", description: "Desarrolla habilidades de investigación, expresión oral y pensamiento crítico", schedule: "Viernes, 3:30 PM - 5:00 PM" }
    }
  };

  let currentLanguage = localStorage.getItem("language") || "en";

  function getActivityData(name, details) {
    const translation = activityTranslations[name]?.[currentLanguage];
    return {
      name: translation?.name || name,
      description: translation?.description || details.description,
      schedule: translation?.schedule || details.schedule
    };
  }

  function applyTranslations() {
    const t = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.getElementById("app-title").textContent = t.schoolName;
    document.getElementById("page-subtitle").textContent = t.subtitle;
    document.getElementById("activities-heading").textContent = t.availableActivities;
    document.getElementById("signup-heading").textContent = t.signupTitle;
    document.getElementById("email-label").textContent = t.emailLabel;
    document.getElementById("activity-label").textContent = t.activityLabel;

    const activityPlaceholder = document.getElementById("activity-placeholder");
    if (activityPlaceholder) {
      activityPlaceholder.textContent = t.activityPlaceholder;
    }
    if (activitySelect.options.length > 0) {
      activitySelect.options[0].textContent = t.activityPlaceholder;
    }

    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
      submitButton.textContent = t.submit;
    }

    const loadingMessage = document.getElementById("loading-message");
    if (loadingMessage) {
      loadingMessage.textContent = t.loading;
    }

    document.getElementById("language-label").textContent = t.language;
    document.getElementById("footer-text").textContent = `© 2023 ${t.schoolName}`;
    languageSelect.value = currentLanguage;
  }

  function formatSignedUpMessage(message) {
    if (currentLanguage === "en") {
      return message;
    }

    const match = message.match(/Signed up (.+) for (.+)$/);
    if (!match) {
      return message;
    }

    const [, email, activityName] = match;
    const translatedActivity = activityTranslations[activityName]?.es?.name || activityName;
    return `Te has inscrito ${email} en ${translatedActivity}`;
  }

  function translateErrorMessage(message) {
    if (currentLanguage === "en") {
      return message || translations.en.genericError;
    }

    const spanishMessages = {
      "Student is already signed up": translations.es.studentAlreadySignedUp,
      "Activity not found": translations.es.activityNotFound,
      "An error occurred": translations.es.genericError,
      "Failed to sign up. Please try again.": translations.es.signupFailure
    };

    return spanishMessages[message] || message || translations.es.genericError;
  }

  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      activitiesList.innerHTML = "";
      activitySelect.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = translations[currentLanguage].activityPlaceholder;
      activitySelect.appendChild(defaultOption);

      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const participants = Array.isArray(details.participants) ? details.participants : [];
        const spotsLeft = details.max_participants - participants.length;
        const activityData = getActivityData(name, details);
        const participantsList = participants.length
          ? `<ul class="participants-list">${participants
              .map(
                (participant) => `
                  <li class="participant-item">
                    <span class="participant-name">${participant}</span>
                    <button
                      type="button"
                      class="delete-participant-btn"
                      data-activity-name="${name}"
                      data-email="${participant}"
                      aria-label="Remove ${participant} from ${activityData.name}"
                      title="Remove participant"
                    >
                      ✕
                    </button>
                  </li>
                `
              )
              .join("")}</ul>`
          : `<p class="participants-empty">${translations[currentLanguage].noParticipants}</p>`;

        activityCard.innerHTML = `
          <h4>${activityData.name}</h4>
          <p>${activityData.description}</p>
          <p><strong>${translations[currentLanguage].scheduleLabel}</strong> ${activityData.schedule}</p>
          <p><strong>${translations[currentLanguage].availabilityLabel}</strong> ${spotsLeft} ${translations[currentLanguage].spotsLeft}</p>
          <div class="participants-section">
            <h5>${translations[currentLanguage].participantsLabel}</h5>
            ${participantsList}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        const option = document.createElement("option");
        option.value = name;
        option.textContent = activityData.name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = `<p>${translations[currentLanguage].failedToLoad}</p>`;
      console.error("Error fetching activities:", error);
    }
  }

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = formatSignedUpMessage(result.message);
        messageDiv.className = "success";
        signupForm.reset();
        await fetchActivities();
      } else {
        messageDiv.textContent = translateErrorMessage(result.detail || translations[currentLanguage].genericError);
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = translations[currentLanguage].signupFailure;
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  activitiesList.addEventListener("click", async (event) => {
    const deleteButton = event.target.closest(".delete-participant-btn");
    if (!deleteButton) {
      return;
    }

    const activityName = deleteButton.dataset.activityName;
    const email = deleteButton.dataset.email;

    if (!activityName || !email) {
      return;
    }

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activityName)}/participants?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        await fetchActivities();
      } else {
        messageDiv.textContent = translateErrorMessage(result.detail || translations[currentLanguage].genericError);
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = translations[currentLanguage].signupFailure;
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error removing participant:", error);
    }
  });

  languageSelect.addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    localStorage.setItem("language", currentLanguage);
    applyTranslations();
    fetchActivities();
  });

  applyTranslations();
  fetchActivities();
});
