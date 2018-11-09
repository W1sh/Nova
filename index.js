// jshint esversion: 6
let table;

window.onload = function onload() {
    initSidebar();
    initPane();

    populateTable();
}; // onload

function initSidebar() {
    let navItems = document.getElementsByClassName("nav-group-item");
    Array.from(navItems).forEach(function (navItem) {
        if (navItem.parentElement.id === "categoriesNavGroup") {
            navItem.addEventListener('mousedown', function () {
                focus(this, navItem.parentElement.getElementsByClassName("nav-group-item"));
            });
        } else {
            navItem.addEventListener('mousedown', function (e) {
                if (e.button > 0) return;
                let deckNavBar = $("deckNavBar");
                let newAElement = document.createElement("a");
                newAElement.className = "nav-group-item";
                newAElement.onmousedown = function (e) {
                    if (e.button === 0) {
                        focus(this, this.parentElement.getElementsByClassName("nav-group-item"));
                    } else if (e.button === 2) {
                        this.parentElement.removeChild(this);
                    }
                }; // newAElement.onmousedown
                let txtA = document.createTextNode("New deck");
                newAElement.appendChild(txtA);
                deckNavBar.appendChild(newAElement);
            });
        }
    });
} // initSidebar

function initPane() {
    let textSearchBar = $("searcher");
    textSearchBar.onkeyup = function (e) {
        if (e.keyCode === 13) {
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            populateTable(this.value);
        }
    }; // textSearchBar.onkeyup
    table = document.getElementsByTagName("tbody")[0];
    let thName = $("thName");
    thName.onclick = function () {
        sortColumn(1);
    }; // thName.onclick
    let thType = $("thType");
    thType.onclick = function () {
        sortColumn(2);
    }; // thType.onclick
    let thSet = $("thSet");
    thSet.onclick = function () {
        sortColumn(3);
    }; // thSet.onclick
    let thPowerToughness = $("thPowerToughness");
    thPowerToughness.onclick = function () {
        //sortColumn(5);
    }; // thSet.onclick
    function sortColumn(columnNumber) {
        let switching, shouldSwitch, rows, x, y;
        switching = true;
        rows = table.getElementsByTagName("tr");
        while (switching) {
            switching = false;
            shouldSwitch = false;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("td")[columnNumber];
                y = rows[i + 1].getElementsByTagName("td")[columnNumber];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentElement.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    } // sortColumn
} // initPane

function insertTableRow(name, manaCost, type, set, rarity, power, toughness) {
    let row = table.insertRow(0);
    row.onclick = function () {
        if (this.classList.contains("selected")) {
            row.classList.remove("selected");
        } else {
            for (let row of this.parentElement.getElementsByTagName("tr")) {
                if (row.classList.contains("selected")) {
                    row.classList.remove("selected");
                }
            }
            row.classList.add("selected");
        }
    }; // row.onclick

    let cellManaCost = row.insertCell(0);
    cellManaCost.className = "cell-align-right";
    cellManaCost.appendChild(document.createTextNode(manaCost));

    let cellName = row.insertCell(1);
    cellName.appendChild(document.createTextNode(name));

    let cellType = row.insertCell(2);
    cellType.appendChild(document.createTextNode(type));

    let cellSet = row.insertCell(3);
    cellSet.className = "cell-center";
    cellSet.appendChild(document.createTextNode(set));

    let cellRarity = row.insertCell(4);
    cellRarity.className = "cell-center";
    let iconRarity = document.createElement("span");
    iconRarity.className = "icon icon-record " + rarity;
    cellRarity.appendChild(iconRarity);

    let cellPT = row.insertCell(5);
    let powerToughnessString = (power === undefined ? "" : power + "|" + toughness);
    cellPT.className = "cell-center";
    cellPT.appendChild(document.createTextNode(powerToughnessString));
} // insertTableRow

function focus(objectToFocus, objectsToUnfocus) {
    if (objectToFocus !== undefined) {
        if (objectToFocus.classList.contains("active")) {
            objectToFocus.classList.remove("active");
        } else {
            objectToFocus.classList.add("active");
        }
        for (let object of objectsToUnfocus) {
            if (object !== objectToFocus && object.classList.contains("active")) {
                object.classList.remove("active");
            }
        }
    } else {
        for (let object of objectsToUnfocus) {
            object.classList.remove("active");
        }
    }
} // focus

function $(query) {
    let element = document.getElementById(query);
    let bool = element !== null;
    if (!bool) {
        alert("Could not load element with id: " + query);
        failed = true;
        return;
    }
    return element;
} // $