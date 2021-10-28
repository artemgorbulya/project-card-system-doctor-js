const formData = {
    LOGIN_FORM: {
        TITLE: "Вход в систему",
        SUBMIT_BTN_CLASSLIST: ["btn", "btn-primary", "btn-lg"],
        CANCEL_BTN_CLASSLIST: ["btn", "btn-secondary", "btn-lg"],
    },
    VISIT_FORM: {
        FORM_ELS: {
            URGENCY: ['','Обычная', 'Приоритетная', 'Неотложная']
        },
        FORM_DOCTORS: {
            UNSELECTED: "",
            DANTIST: "Дантист",
            THERAPIST: "Терапевт",
            CARDIOLOGIST: "Кардиолог",
        }
    },
    FORM_TYPES: {
        CREATE_VISIT: "createVisit",
        CREATE_LOGIN: "login",
        CREATE_FILTER: "filter",
        EDIT_CARD: "card"
    },
    FILTER_FORM: {
        STATUS: ['','Открыта', 'Закрыта'],
    }
}

const reqData = {
    BASE_URL: 'http://cards.danit.com.ua',
    ENDPOINTS: {
        CARDS: '/cards',
        LOGIN: '/login'
    }
}

const cardPrefix = {
    RU: {
        doctor: "Врач",
        visitDate: "Дата визита",
        description: 'Краткое описание',
        urgency: "Срочность",
        target: "Цель визита",
        pressure: "Обычное давление",
        massIndex: "Индекс массы тела",
        heartIllness: "Перенесенные заболевания ССС",
        age: "Возраст",
        date: "Дата последнего визита",
    } 
}

export {
    reqData,
    formData,
    cardPrefix,
}