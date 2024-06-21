/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
