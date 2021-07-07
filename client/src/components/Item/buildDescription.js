const BuildDescription = (item) => {
  if (!item.description) {
    return;
  }
  let description = "";
  for (const element in item.description) {
    if (element === "damage") {
      description += `Damage: ${item.description[element]} `;
    } else if (element === "crit") {
      description += `Critical: ${item.description[element]} `;
    } else if (element === "ac") {
      description += `Armor Class: ${item.description[element]} `;
    } else if (element === "abilityReq") {
      description += `Ability Requirement: ${item.description[element]} `;
    } else if (element === "skillModifier") {
      description += `Skill Modifier: ${item.description[element]} `;
    } else if (element === "dexBonus") {
      description += `Max Dexterity Bonus: ${item.description[element]} `;
    } else if (element === "armorCheckPenalty") {
      description += `Armor Check Penalty: ${item.description[element]} `;
    } else if (element === "arcaneSpellFailure") {
      description += `Arcane Spell Failure Chance: ${item.description[element]} `;
    } else if (element === "description") {
      description += `Description: ${item.description[element]} `;
    } else if (element === "properties") {
      description += `Properties: ${item.description[element]} `;
    } else if (element === "capacity") {
      description += `Capacity: ${item.description[element]} `;
    }
  }

  return description;
};

export default BuildDescription;
