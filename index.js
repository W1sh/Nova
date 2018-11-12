// jshint esversion: 6
var table;
var filter = ["none", "none"];

window.onload = function onload() {
    initSidebar();
    initPane();

    populateTable();
}; // onload

function initSidebar() {
    let navItems = document.getElementsByClassName("nav-group-item");
    Array.from(navItems).forEach(function (navItem) {
        switch (navItem.parentElement.id) {
            case "colorsNavGroup":
                navItem.addEventListener('mousedown', function () {
                    focus(navItem, navItem.parentElement.getElementsByClassName("nav-group-item"));
                    filter[0] = (filter[0] === navItem.childNodes[1].id.substring(0, 2)) ?
                        "none" : navItem.childNodes[1].id.substring(0, 2);
                    filterResults();
                });
                break;
            case "raritiesNavGroup":
                navItem.addEventListener('mousedown', function () {
                    focus(navItem, navItem.parentElement.getElementsByClassName("nav-group-item"));
                    filter[1] = filter[1] === navItem.childNodes[1].id ? "none" : navItem.childNodes[1].id;
                    filterResults();
                });
                break;
            case "deckNavGroup":
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
                break;
        } // switch
    });
} // initSidebar

function initPane() {
    let mainTab = document.getElementById("mainTab");
    mainTab.onclick = function(){
        focus(this, this.parentElement.getElementsByClassName("tab-item"));
    };
    table = document.getElementsByTagName("tbody")[0];
    let textSearchBar = $("searcher");
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
            for (let row of this.parentElement.getElementsByTagName("tr")) {
                if (row.classList.contains("selected")) {
                    row.classList.remove("selected");
                }
            }
            row.classList.add("selected");
        }
    }; // row.onmousedown
    row.ondblclick = function(){
        let tabs = document.getElementById("tabsGroup");
        let newTab = document.createElement("div");
        let closeTabSpan = document.createElement("span");
        let tabName = document.createTextNode(name);
        tabs.style.display = "";
        newTab.className = "tab-item";
        newTab.onclick = function (){
            focus(this, this.parentElement.getElementsByClassName("tab-item"));
        };
        closeTabSpan.className = "icon icon-cancel icon-close-tab";
        closeTabSpan.onclick = function (){
            tabs.removeChild(this.parentElement);
        };
        newTab.appendChild(closeTabSpan);
        newTab.appendChild(tabName);
        tabs.insertBefore(newTab, tabs.childNodes[tabs.childNodes.length - 2]);
    }; // row.ondblclick

    let cellManaCost = row.insertCell(0);
    cellManaCost.className = "cell-align-right";
    let separatedManaCost = manaCost;
    while (separatedManaCost.includes("{") || separatedManaCost.includes("}")) {
        separatedManaCost = separatedManaCost.replace("{", "").replace("}", "");
    }
    for (let index = 0; index < separatedManaCost.length; index++) {
        let manaIcon = document.createElement("span");
        manaIcon.className = "mana small s" + separatedManaCost.charAt(index).toLowerCase();
        cellManaCost.appendChild(manaIcon);
    }

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
    } // while
} // sortColumn

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

function hideTabs(){
    let tabs = document.getElementById("tabsGroup");
    tabs.style.display = "none";
}