import { Interaction } from "discord.js";
import { BaseInteraction, InteractionType } from "./BaseInteraction";
import { DiscClient } from "../client/DiscClient";

export abstract class BaseClassicCommand extends BaseInteraction<Interaction> {
  type: InteractionType = "classicCommand"

  abstract execute(client: DiscClient, interaction: Interaction): Promise<void>;
}