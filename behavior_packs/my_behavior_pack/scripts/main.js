import { world, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

system.events.playerJoin.subscribe((event) => {
    const player = event.player;
    if (!player) return;

    const form = new ModalFormData()
        .title("Server Rules")
        .textField("Please read the rules below:", "Rules", "1. Be respectful\n2. No griefing\n3. Have fun!")
        .dropdown("Select your preferred language:", ["English", "Spanish", "French", "German"], 0)
        .dropdown("Select your preferred game mode:", ["Survival", "Creative", "Adventure"], 0)
        .toggle("I accept the rules", false);

    form.show(player).then((response) => {
        if (response.canceled || !response.formValues[2]) {
            player.sendMessage("You must accept the rules to continue.");
        } else {
            const selectedLanguage = response.formValues[1];
            const selectedGameMode = response.formValues[2];
            player.sendMessage(`Thank you for reading the rules! Preferred language: ${selectedLanguage}, Game mode: ${selectedGameMode}`);
        }
    }).catch((error) => {
        console.error("Error showing form:", error);
    });
});