import { world, system, BlockLocation } from "@minecraft/server";

const staffLog = []; // Array to store logs for staff
const playerPositions = new Map(); // Track player positions for teleportation and speed detection

system.events.tick.subscribe(() => {
    for (const player of world.getPlayers()) {
        const velocity = player.getVelocity();
        const currentPosition = player.location;
        const lastPosition = playerPositions.get(player.name);

        // Detect abnormally high jumps
        if (velocity.y > 5) {
            console.warn(`Suspicious activity detected: ${player.name} has an unusually high velocity.`);
            player.sendMessage("Suspicious activity detected. Please play fairly.");
            staffLog.push(`[${new Date().toISOString()}] High velocity detected for ${player.name}`);
        }

        // Detect teleportation
        if (lastPosition) {
            const distance = Math.sqrt(
                Math.pow(currentPosition.x - lastPosition.x, 2) +
                Math.pow(currentPosition.y - lastPosition.y, 2) +
                Math.pow(currentPosition.z - lastPosition.z, 2)
            );
            if (distance > 50) { // Threshold for teleportation
                console.warn(`Teleportation detected: ${player.name} moved ${distance.toFixed(2)} blocks.`);
                player.sendMessage("Teleportation detected. Please play fairly.");
                staffLog.push(`[${new Date().toISOString()}] Teleportation detected for ${player.name}`);
            }
        }

        // Update player position
        playerPositions.set(player.name, currentPosition);

        // Enhanced X-ray detection
        const blockBreaking = player.getBlockBreakingProgress();
        if (blockBreaking) {
            const blockLocation = new BlockLocation(
                Math.floor(blockBreaking.location.x),
                Math.floor(blockBreaking.location.y),
                Math.floor(blockBreaking.location.z)
            );
            const surroundingBlocks = [
                blockLocation.offset(1, 0, 0),
                blockLocation.offset(-1, 0, 0),
                blockLocation.offset(0, 1, 0),
                blockLocation.offset(0, -1, 0),
                blockLocation.offset(0, 0, 1),
                blockLocation.offset(0, 0, -1),
            ];

            let hiddenBlockCount = 0;
            for (const loc of surroundingBlocks) {
                const block = world.getDimension("overworld").getBlock(loc);
                if (!block || block.typeId === "minecraft:air") {
                    hiddenBlockCount++;
                }
            }

            if (hiddenBlockCount >= 5) { // Threshold for hidden blocks
                console.warn(`X-ray detected: ${player.name} is mining a hidden block at ${blockLocation}.`);
                player.sendMessage("X-ray detected. Please play fairly.");
                staffLog.push(`[${new Date().toISOString()}] X-ray detected for ${player.name} at ${blockLocation}`);
            }
        }
    }
});

// Command to allow staff to view logs
system.events.beforeChat.subscribe((event) => {
    const { sender, message } = event;
    if (message === "!stafflog") {
        if (sender.hasTag("staff")) { // Check if the player is a staff member
            sender.sendMessage("Staff Log:");
            staffLog.forEach((log) => sender.sendMessage(log));
        } else {
            sender.sendMessage("You do not have permission to view the staff log.");
        }
        event.cancel = true; // Prevent the message from being broadcast
    }
});
