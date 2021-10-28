import VisitCardiologist from "./visit/VisitCardiologist.js";
import VisitDentist from "./visit/VisitDentist.js";
import VisitTherapist from "./visit/VisitTherapist.js";
import { formData } from "./constants.js";

export default function createNewVisit(data) {
    switch (data.doctor) {
        case formData.VISIT_FORM.FORM_DOCTORS.DANTIST: {
            const newVisit = new VisitDentist(data);
            newVisit.render();
            break;
        }
        case formData.VISIT_FORM.FORM_DOCTORS.CARDIOLOGIST: {
            const newVisit = new VisitCardiologist(data);
            newVisit.render();
            break;
        }
        case formData.VISIT_FORM.FORM_DOCTORS.THERAPIST: {
            const newVisit = new VisitTherapist(data);
            newVisit.render();
            break;
        }
    }
}