// models/index.js
import User from './User.js';
import Teacher from './Teacher.js';
import Vote from './Vote.js';
import Candidate from './Candidate.js';

// Definisikan asosiasi
User.hasOne(Vote, { foreignKey: 'userId', onDelete: 'CASCADE' });
Vote.belongsTo(User, { foreignKey: 'userId' });

Teacher.hasOne(Vote, { foreignKey: 'teacherId', onDelete: 'CASCADE' });
Vote.belongsTo(Teacher, { foreignKey: 'teacherId' });

Candidate.hasMany(Vote, { foreignKey: 'candidateId', onDelete: 'CASCADE' });
Vote.belongsTo(Candidate, { foreignKey: 'candidateId' });

export { User, Teacher, Vote, Candidate };
