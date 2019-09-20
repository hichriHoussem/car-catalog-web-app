const model = {
  model: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit 30 car max' : null;
    },
  },
  manufacturer: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 40 ? 'reach limit 40 car max' : null;
    },
  },
  transmission: {
    isRequired: true,
    validate: (input: string): string | null =>
      input ? null : 'Required field',
  },
  co2: {
    isRequired: false,
    validate: (input: string): string | null => {
      if (!input) {
        return null;
      }
      return parseInt(input, 0) > 0 ? null : 'provide non negative number';
    },
  },
  image: {
    isRequired: false,
    validate: (): null => null,
  },
};

export { model };
