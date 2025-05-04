import { world, system } from "@minecraft/server";

system.events.tick.subscribe(() => {
    for (const player of world.getPlayers()) {
        const velocity = player.getVelocity();
        if (velocity.y > 5) { // Example: Detect abnormally high jumps
            console.warn(`Suspicious activity detected: ${player.name} has an unusually high velocity.`);
            player.sendMessage("Suspicious activity detected. Please play fairly.");
        }
    }
});
