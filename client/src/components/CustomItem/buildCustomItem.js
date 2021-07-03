const buildDamage = (diceNumber, diceType, damageType) => {
  return `${diceNumber}d${diceType} ${damageType}`;
};

const removeEmpty = (item) => {
  return Object.entries(item)
    .map(([k, v]) => [k, v && typeof v === "object" ? removeEmpty(v) : v])
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
};

const buildCustomItem = (form) => {
  let newItem = {};
  if (form.system === "Pathfinder1e") {
    if (form.type === "Armor") {
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          ac: form.ac,
          dexBonus: form.dexBonus,
          armorCheckPenalty: form.armorCheckPenalty,
          arcaneSpellFailure: `${form.arcaneSpellFailure}%`,
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    } else if (form.type === "Weapon") {
      let builtDamage = buildDamage(
        form.weaponDamageDiceNumber,
        form.weaponDamageDiceType,
        form.weaponDamageType
      );
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          damage: builtDamage,
          crit: form.crit,
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    } else if (
      form.type === "Wearable" ||
      form.type === "Misc" ||
      form.type === "Adventuring Gear" ||
      form.type === "Service"
    ) {
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    }
  } else {
    //DnD item
    if (form.type === "Armor") {
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          ac: form.ac,
          skillModifier: form.skillModifier,
          abilityReq: form.abilityReq,
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    } else if (form.type === "Weapon") {
      let builtDamage = buildDamage(
        form.weaponDamageDiceNumber,
        form.weaponDamageDiceType,
        form.weaponDamageType
      );
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          damage: builtDamage,
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    } else if (
      form.type === "Wearable" ||
      form.type === "Misc" ||
      form.type === "Adventuring Gear" ||
      form.type === "Service"
    ) {
      newItem = {
        name: form.name,
        value: form.value,
        weight: form.weight,
        type: form.type,
        subtype: form.subtype,
        custom: true,
        system: form.system,
        description: {
          properties: form.properties,
          description: form.description,
        },
      };
      return removeEmpty(newItem);
    }
    return;
  }
};

export default buildCustomItem;
