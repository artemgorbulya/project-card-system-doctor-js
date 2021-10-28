export default function showNoVisitText(targetElem) {
	const msgElem = document.createElement("p");
	msgElem.innerText = "Пока что нет визитов(";
	msgElem.classList.add("text-danger");
	targetElem.append(msgElem);
}