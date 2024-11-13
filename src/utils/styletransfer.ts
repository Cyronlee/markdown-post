export const objectToStyleString = (styleObject: any) =>
  Object.entries(styleObject)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

export const cssToRecord = (cssString: string): Record<string, string> => {
  const styles: Record<string, string> = {};
  const cssDeclarations = cssString.split(";").filter(Boolean);

  cssDeclarations.forEach((declaration) => {
    const [property, value] = declaration.split(":").map((part) => part.trim());

    if (property && value) {
      styles[property] = value;
    }
  });

  return styles;
};

export const getUnnestStyle = (containerStyle: string) =>
  containerStyle.replace(/.*\.(\w+)-(\w+)\s*\{([^}]+)}.*/, "$3");
