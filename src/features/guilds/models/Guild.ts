// import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

// export class Guild extends Model {
//   declare id: CreationOptional<number>

//   declare disc_id: string
//   declare name: string
//   declare owner_disc_id: string
//   declare owner_username: string

//   declare created_by: string | null
//   declare created_at: CreationOptional<Date>
//   declare modified_by: string | null
//   declare modified_at: CreationOptional<Date | null>

//   public static initialize(sequelize: Sequelize) {
//     Guild.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           primaryKey: true,
//           autoIncrement: true
//         },
//         disc_id: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true
//         },
//         name: {
//           type: DataTypes.TEXT,
//           allowNull: false
//         },
//         owner_disc_id: {
//           type: DataTypes.STRING,
//           allowNull: false
//         },
//         owner_username: {
//           type: DataTypes.TEXT,
//           allowNull: false
//         },

//         createdBy: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         createdAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: new Date()
//         },
//         modifiedBy: {
//           type: DataTypes.STRING,
//           allowNull: true,
//         },
//         modifiedAt: {
//           type: DataTypes.DATE,
//           allowNull: true,
//         }
//       },
//       {
//         sequelize,
//         tableName: 'guilds',
//         modelName: 'Guild',
//         timestamps: false
//       }
//     )
//   }
// }