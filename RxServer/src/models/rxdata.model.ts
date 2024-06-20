export const rxDataModel = (sequelize: any, Sequelize: any) => {
  const RxData = sequelize.define("rxdata", {
    synopsis: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    dosage: {
      type: Sequelize.STRING
    }
  });

  return RxData;
};
