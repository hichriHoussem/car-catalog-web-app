const validatorsMapper = {
  model: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  manufacturer: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  transmission: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  co2: {
    isRequired: false,
  },
  image: {
    isRequired: false,
  },
};

export { validatorsMapper };
