import { world, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

system.events.playerJoin.subscribe((event) => {
    const player = event.player;
    if (!player) return; // Ensure player object is valid

    const form = new ModalFormData()
        .title("Server Rules")
        .textField("Please read the rules below:", "Rules", "1. Be respectful\n2. No griefing\n3. Have fun!");

    form.show(player).then((response) => {
        if (response.canceled) {
            player.sendMessage("You must read and accept the rules to continue.");
        } else {
            player.sendMessage("Thank you for reading the rules!");
        }
    }).catch((error) => {
        console.error("Error showing form:", error); // Added error handling
    });
});