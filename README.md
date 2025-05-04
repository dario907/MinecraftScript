# Minecraft Bedrock Script Project

This project contains a behavior pack and a resource pack for Minecraft Bedrock Edition. Below are the details on how to install and use these packs.

## Installation

1. **Download the Packs**: Clone or download this repository to your local machine.

2. **Locate the Packs**:
   - The behavior pack is located in `behavior_packs/my_behavior_pack`.
   - The resource pack is located in `resource_packs/my_resource_pack`.

3. **Copy to Minecraft**:
   - Navigate to your Minecraft installation directory.
   - Copy the contents of `my_behavior_pack` into the `behavior_packs` folder.
   - Copy the contents of `my_resource_pack` into the `resource_packs` folder.

## Usage

1. **Activate the Packs**:
   - Launch Minecraft and go to the settings.
   - Under the "Storage" section, ensure that the packs are listed.
   - Activate the behavior pack and resource pack in your world settings.

2. **Features**:
   - **GUI Enhancements**: Players will see a form with server rules and can select their preferred language.
   - **Anti-Cheat**: Detects and logs suspicious player behavior, such as abnormally high jumps.
   - **Enhanced Anti-Cheat**:
     - Detects abnormally high jumps, teleportation, and speed hacks.
     - Improved X-ray detection with calculations for hidden blocks.
     - Staff members can view an in-game log of suspicious activity using the `!stafflog` command.

   - **Enhanced GUI**:
     - Players must confirm acceptance of server rules.
     - Dropdowns for selecting preferred language and game mode.

3. **Using the Function**:
   - The function defined in `functions/example.mcfunction` can be executed in-game by using the command `/function example`.

3. **Staff Log**:
   - Staff members with the `staff` tag can use the `!stafflog` command in chat to view a log of suspicious activity detected by the anti-cheat system.

## Troubleshooting

1. **Packs Not Showing in Minecraft**:
   - Ensure the `manifest.json` files have unique UUIDs.
   - Verify the `min_engine_version` matches your Minecraft version.

2. **Script Errors**:
   - Check that the required dependencies (`@minecraft/server` and `@minecraft/server-ui`) are installed and compatible.
   - Ensure your Minecraft world has "Enable Cheats" and "Activate Experimental Features" enabled.

## Notes

- Ensure that you have the correct version of Minecraft Bedrock Edition that supports custom behavior and resource packs.
- For any issues or contributions, please refer to the project's GitHub page.