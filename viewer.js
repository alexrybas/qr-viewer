
function displayEquipment(data) {
    const tableBody = document.getElementById("equipment-data");

    tableBody.replaceChildren();

    for (const [name, value] of Object.entries(data)) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const valueCell = document.createElement("td");
        valueCell.textContent = value;

        row.append(nameCell, valueCell);
        tableBody.appendChild(row);
    }
}

function loadEquipment() {
    const encodedData = window.location.hash.slice(1);

    if (!encodedData) {
        return;
    }

    try {
        const json = decodeURIComponent(encodedData);
        const data = JSON.parse(json);

        if (
            data === null ||
            typeof data !== "object" ||
            Array.isArray(data) ||
            Object.values(data).some(value => typeof value !== "string")
        ) {
            throw new Error("Invalid equipment data");
        }

        displayEquipment(data);
    } catch (error) {
        console.error("Cannot load equipment:", error);
    }
}

window.addEventListener("hashchange", loadEquipment);
loadEquipment();
