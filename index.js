// jshint esversion: 6
var table;
var filter = ["none", "none"];

window.onload = function onload() {
    initSidebar();
    initPane();

    populateTable();
}; // onload

function initSidebar() {
    let navItems = document.querySelectorAll(".nav-group-item");
    navItems.forEach(function (navItem) {
        switch (navItem.parentElement.id) {
            case "colorsNavGroup":
                navItem.addEventListener('mousedown', function () {
                    focusItem(navItem, navItem.parentElement.querySelectorAll(".nav-group-item"));
                    filter[0] = (filter[0] === navItem.childNodes[1].id.substring(0, 2)) ?
                        "none" : navItem.childNodes[1].id.substring(0, 2);
                    filterResults();
                });
                break;
            case "raritiesNavGroup":
                navItem.addEventListener('mousedown', function () {
                    focusItem(navItem, navItem.parentElement.querySelectorAll(".nav-group-item"));
                    filter[1] = (filter[1] === navItem.childNodes[1].id) ? "none" : navItem.childNodes[1].id;
                    filterResults();
                });
                break;
            case "deckNavGroup":
                navItem.addEventListener('mousedown', function (e) {
                    if (e.button > 0) return;
                    let deckNavBar = document.getElementById("deckNavBar");
                    let newAElement = document.createElement("a");
                    newAElement.className = "nav-group-item";
                    newAElement.onmousedown = function (e) {
                        if (e.button === 0) {
                            focusItem(this, this.parentElement.querySelectorAll(".nav-group-item"));
                        } else if (e.button === 2) {
                            this.parentElement.removeChild(this);
                        }
                    }; // newAElement.onmousedown
                    let txtA = document.createTextNode("New deck");
                    newAElement.appendChild(txtA);
                    deckNavBar.appendChild(newAElement);
                });
                break;
        }
    });
} // initSidebar

function initPane() {
    let mainTab = document.getElementById("mainTab");
    mainTab.onclick = function () {
        focusItem(this, this.parentElement.querySelectorAll(".tab-item"));
    };
    table = document.getElementsByTagName("tbody")[0];
    let textSearchBar = document.getElementById("searcher");
    textSearchBar.onkeyup = function (e) {
        if (e.keyCode === 13) {
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            populateTable(this.value);
        }
    }; // textSearchBar.onkeyup
} // initPane

function insertTableRow(name, manaCost, type, set, rarity, power, toughness) {
    let row = table.insertRow(0);
    row.onmousedown = function () {
        if (this.classList.contains("selected")) {
            row.classList.remove("selected");
        } else {
            this.parentElement.querySelectorAll("tr").forEach((item) => {
                if (item.classList.contains("selected")) item.classList.remove("selected");
            });
            row.classList.add("selected");
        }
    }; // row.onmousedown
    row.ondblclick = function () {
        let tabs = document.getElementById("tabsGroup");
        let newTab = document.createElement("div");
        let closeTabSpan = document.createElement("span");
        let tabName = document.createTextNode(name);
        tabs.style.display = "";
        closeTabSpan.className = "icon icon-cancel icon-close-tab";
        closeTabSpan.addEventListener('mousedown', function () {
            newTab.remove();
        });
        newTab.className = "tab-item";
        newTab.addEventListener('mousedown', function () {
            if (this.parentElement === null) return;
            focusItem(this, this.parentElement.querySelectorAll(".tab-item"));
        });
        newTab.appendChild(closeTabSpan);
        newTab.appendChild(tabName);
        tabs.insertBefore(newTab, tabs.childNodes[tabs.childNodes.length - 2]);
    }; // row.ondblclick

    let cellManaCost = row.insertCell(0);
    cellManaCost.className = "cell-align-right";
    while (manaCost.includes("{") || manaCost.includes("}")) {
        manaCost = manaCost.replace("{", "").replace("}", "");
    }
    manaCost.split('').forEach((item) => {
        let manaIcon = document.createElement("span");
        manaIcon.className = "mana small s" + item.toLowerCase();
        cellManaCost.appendChild(manaIcon);
    });

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

    let cellPower = row.insertCell(5);
    cellPower.className = "cell-center";
    cellPower.appendChild(document.createTextNode(power !== undefined ? power : ""));

    let cellToughness = row.insertCell(6);
    cellToughness.className = "cell-center";
    cellToughness.appendChild(document.createTextNode(toughness !== undefined ? toughness : ""));
} // insertTableRow

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

function focusItem(focus, unfocus) {
    unfocus.forEach((item) => {
        if (item !== focus && item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });
    if (focus.classList.contains("active")) {
        focus.classList.remove("active");
    } else {
        focus.classList.add("active");
    }
} // focusItem

function hideTabs() {
    let tabs = document.getElementById("tabsGroup");
    tabs.style.display = "none";
}