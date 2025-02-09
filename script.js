// Game Variables
const locations = {
    townSquare: {
        description: "You are in the town square. The fog is thick, and the air is cold.",
        items: ["flashlight"],
        connections: ["forest", "church"],
        actions: ["Investigate", "Move to Forest", "Move to Church"]
    },
    forest: {
        description: "You are in the dark forest. The trees loom overhead, and you hear faint whispers.",
        items: ["health kit"],
        connections: ["townSquare", "butcherShop"],
        actions: ["Investigate", "Move to Town Square", "Move to Butcher Shop"]
    },
    church: {
        description: "You are in the abandoned church. The pews are overturned, and the air smells of decay.",
        items: ["journal"],
        connections: ["townSquare"],
        actions: ["Investigate", "Move to Town Square"]
    },
    butcherShop: {
        description: "You are in the butcher shop. The smell of blood is overwhelming.",
        items: [],
        connections: ["forest"],
        actions: ["Investigate", "Move to Forest"]
    }
};

let player = {
    location: "townSquare",
    inventory: [],
    health: 100,
    sanity: 100
};

let butcherLocation = "butcherShop";

// Game Elements
const output = document.getElementById("output");
const choices = document.getElementById("choices");

// Display a message in the output
function log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// Display choices as buttons
function showChoices(options) {
    choices.innerHTML = ""; // Clear previous choices
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("choice-btn");
        button.addEventListener("click", () => handleChoice(option));
        choices.appendChild(button);
    });
}

// Handle player choice
function handleChoice(choice) {
    const currentLocation = locations[player.location];

    if (choice.startsWith("Move to")) {
        const target = choice.replace("Move to ", "").toLowerCase().replace(" ", "");
        movePlayer(target);
    } else if (choice === "Investigate") {
        investigate();
    } else if (choice === "Hide") {
        hide();
    } else {
        log("Invalid choice.");
    }
}

// Move the player to a new location
function movePlayer(target) {
    const currentLocation = locations[player.location];
    if (currentLocation.connections.includes(target)) {
        player.location = target;
        log(`You move to the ${target}.`);
        describeLocation();
    } else {
        log("You can't go there from here.");
    }
}

// Investigate the current location
function investigate() {
    const currentLocation = locations[player.location];
    if (currentLocation.items.length > 0) {
        const item = currentLocation.items.pop();
        player.inventory.push(item);
        log(`You find a ${item}.`);
    } else {
        log("You find nothing of interest.");
    }
}

// Hide from the Butcher
function hide() {
    log("You hide, hoping the Butcher doesn't find you...");
    // Add logic for Butcher's movement and detection.
}

// Describe the current location and show available actions
function describeLocation() {
    const currentLocation = locations[player.location];
    log(currentLocation.description);
    showChoices(currentLocation.actions);
}

// Start the game
describeLocation();