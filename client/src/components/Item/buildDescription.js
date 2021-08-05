const BuildDescription = (item) => {
  if (!item.description) {
    return;
  }
  let description = [];
  for (const element in item.description) {
    if (element === "damage") {
      description.push(`Damage: ${item.description[element]} `);
    } else if (element === "crit") {
      description.push(`Critical: ${item.description[element]} `);
    } else if (element === "ac") {
      description.push(`Armor Class: ${item.description[element]} `);
    } else if (element === "abilityReq") {
      description.push(`Ability Requirement: ${item.description[element]} `);
    } else if (element === "skillModifier") {
      description.push(`Skill Modifier: ${item.description[element]} `);
    } else if (element === "dexBonus") {
      description.push(`Max Dexterity Bonus: ${item.description[element]} `);
    } else if (element === "armorCheckPenalty") {
      description.push(`Armor Check Penalty: ${item.description[element]} `);
    } else if (element === "arcaneSpellFailure") {
      description.push(
        `Arcane Spell Failure Chance: ${item.description[element]} `
      );
    } else if (element === "description") {
      description.push(`Description: ${item.description[element]} `);
    } else if (element === "properties") {
      description.push(`Properties: ${item.description[element]} `);
    } else if (element === "capacity") {
      description.push(`Capacity: ${item.description[element]} `);
    } else if (element === "spellLevel") {
      description.push(`Spell Level: ${item.description[element]} `);
    } else if (element === "casterLevel") {
      description.push(`Caster Level: ${item.description[element]} `);
    }
  }
  let descJSX = description.map((element) => {
    return (
      <p className='mb-1' key={element}>
        {element}
      </p>
    );
  });

  return descJSX;
};

export default BuildDescription;
