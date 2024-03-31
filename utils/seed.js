const connection = require('./config/connection');
const { userData, thoughtData, reactionData } = require('./utils/data');

const User = require('./models/User');
const Thought = require('./models/Thought');


async function seedDatabase() {
  await connection();

  // Delete existing data
  await User.deleteMany({});
  await Thought.deleteMany({});
 

  // Seed new data
  const users = await User.insertMany(userData);
  const thoughts = await Thought.insertMany(thoughtData);

  // Add thoughts to user's thoughts array
  for (const thought of thoughts) {
    const user = users[Math.floor(Math.random() * users.length)];
    user.thoughts.push(thought._id);
    await user.save();
  }

  // Seed reactions
  for (const reaction of reactionData) {
    const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
    reaction.thoughtId = thought._id;
    await Reaction.create(reaction);
  }
}

seedDatabase().then(() => {
  console.log('Database seeded!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});