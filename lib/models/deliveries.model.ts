import { CreationOptional, InferAttributes, InferCreationAttributes, Model, ForeignKey, NonAttribute, DataTypes } from 'sequelize';
import sequelize from './init/sequelize';
import Book from './books.model';
import User from './users.model';

class BookDelivery extends Model<InferAttributes<BookDelivery>, InferCreationAttributes<BookDelivery>> {
  declare id: CreationOptional<number>;
  declare Book?: NonAttribute<Book>;
  declare book_id: ForeignKey<Book['id']>;
  declare User?: NonAttribute<User>;
  declare user_id: ForeignKey<User['id']>;
  declare picked_date: CreationOptional<Date>;
  declare delivered_date: CreationOptional<Date> | null;
  declare score: CreationOptional<number>;
}

BookDelivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picked_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    },
    delivered_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'book_deliveries',
  },
);


BookDelivery.belongsTo(Book, { foreignKey: 'book_id' });
BookDelivery.belongsTo(User, { foreignKey: 'user_id' });

export default BookDelivery;