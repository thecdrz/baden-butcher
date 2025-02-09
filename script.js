// Part 1: Game Variables
const locations = {
    townSquare: {
        description: "You are in the town square. The fog is thick, and the air is cold.",
        items: ["flashlight"],
        connections: ["forest", "church"]
    },
    forest: {
        description: "You are in the dark forest. The trees loom overhead, and you hear faint whispers.",
        items: ["health kit"],
        connections: ["townSquare", "butcherShop"]
    },
    church: {
        description: "You are in the abandoned church. The pews are overturned, and the air smells of decay.",
        items: ["journal"],
        connections: ["townSquare"]
    },
    butcherShop: {
        description: "You are in the butcher shop. The smell of blood is overwhelming.",
        items: [],
        connections: ["forest"]
    }
};

let player = {
    location: "townSquare",
    inventory: [],
    health: 100,
    sanity: 100
};

let butcherLocation = "butcherShop";

// Part 2: Game Loop
const output = document.getElementById("output");
const input = document.getElementById("input");

function log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

function processCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const target = parts.slice(1).join(" ");

    switch (action) {
        case "move":
            movePlayer(target);
            break;
        case "investigate":
            investigate();
            break;
        case "use":
            useItem(target);
            break;
        case "hide":
            hide();
            break;
        default:
            log("Invalid command. Try 'move', 'investigate', 'use', or 'hide'.");
    }
}

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

function useItem(item) {
    if (player.inventory.includes(item)) {
        log(`You use the ${item}.`);
        player.inventory = player.inventory.filter(i => i !== item);
    } else {
        log(`You don't have a ${item}.`);
    }
}

function hide() {
    log("You hide, hoping the Butcher doesn't find you...");
    // Add logic for Butcher's movement and detection.
}

function describeLocation() {
    const currentLocation = locations[player.location];
    log(currentLocation.description);
}

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const command = input.value.trim().toLowerCase();
        input.value = "";
        log(`> ${command}`);
        processCommand(command);
    }
});

// Start the game
describeLocation();