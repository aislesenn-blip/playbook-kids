const fs = require('fs');

// Advanced Curriculum Generation Logic
const stages = [
  {
    name: 'Introduction & Foundations',
    count: 30,
    types: ['vocabulary', 'roleplay'],
    topics: ['Greetings', 'Numbers 1-10', 'Colors', 'Family Members', 'Basic Feelings'],
    verbs: ['Practice', 'Learn', 'Discover', 'Master', 'Explore'],
    goals: ['saying hello naturally', 'counting with confidence', 'identifying colors around you', 'introducing people you love', 'expressing basic emotions']
  },
  {
    name: 'Daily Life & Home',
    count: 30,
    types: ['vocabulary', 'story'],
    topics: ['Rooms in the House', 'Furniture', 'Morning Routine', 'Meals', 'Chores'],
    verbs: ['Describe', 'Talk about', 'Identify', 'Practice', 'Learn'],
    goals: ['naming things in your room', 'explaining your morning habits', 'talking about breakfast', 'asking where things are', 'sharing what you do at home']
  },
  {
    name: 'Expressing Feelings',
    count: 30,
    types: ['roleplay', 'vocabulary'],
    topics: ['Happiness', 'Sadness', 'Excitement', 'Tiredness', 'Hunger & Thirst'],
    verbs: ['Communicate', 'Express', 'Share', 'Talk about', 'Explain'],
    goals: ['saying why you are happy', 'asking for food when hungry', 'telling someone you are tired', 'checking how a friend feels', 'using emotion words accurately']
  },
  {
    name: 'Food & Dining',
    count: 30,
    types: ['story', 'roleplay'],
    topics: ['Fruits & Veggies', 'Ordering Food', 'Likes & Dislikes', 'Table Manners', 'Drinks'],
    verbs: ['Order', 'Request', 'Describe', 'Discuss', 'Roleplay'],
    goals: ['asking for your favorite fruit', 'politely ordering a meal', 'explaining what you do not like', 'using please and thank you at the table', 'describing tastes']
  },
  {
    name: 'Friends & Playtime',
    count: 30,
    types: ['challenge', 'roleplay'],
    topics: ['Sharing Toys', 'Playing Games', 'Inviting Friends', 'Apologizing', 'Taking Turns'],
    verbs: ['Navigate', 'Practice', 'Learn', 'Roleplay', 'Manage'],
    goals: ['asking a friend to play', 'sharing items fairly', 'saying sorry naturally', 'explaining rules of a game', 'being polite during playtime']
  },
  {
    name: 'School & Learning',
    count: 30,
    types: ['vocabulary', 'challenge'],
    topics: ['Classroom Objects', 'Following Instructions', 'Asking for Help', 'Subjects', 'Recess'],
    verbs: ['Identify', 'Understand', 'Master', 'Practice', 'Request'],
    goals: ['naming things on your desk', 'asking a teacher for assistance', 'following simple directions', 'talking about your favorite class', 'describing recess games']
  },
  {
    name: 'Animals & Nature',
    count: 30,
    types: ['story', 'vocabulary'],
    topics: ['Pets', 'Farm Animals', 'Wild Animals', 'Weather', 'Plants'],
    verbs: ['Discover', 'Describe', 'Talk about', 'Learn', 'Explore'],
    goals: ['naming common pets', 'describing the weather outside', 'talking about animals you like', 'explaining what plants need', 'imitating animal sounds and names']
  },
  {
    name: 'Travel & Transport',
    count: 30,
    types: ['roleplay', 'challenge'],
    topics: ['Cars & Buses', 'Airplanes', 'Directions', 'Going on Vacation', 'Packing'],
    verbs: ['Navigate', 'Plan', 'Discuss', 'Roleplay', 'Describe'],
    goals: ['asking for simple directions', 'talking about a trip', 'naming vehicles', 'pretending to buy a ticket', 'listing things in a suitcase']
  },
  {
    name: 'Time & Routines',
    count: 30,
    types: ['vocabulary', 'story'],
    topics: ['Days of the Week', 'Months', 'Telling Time', 'Seasons', 'Holidays'],
    verbs: ['Understand', 'Track', 'Discuss', 'Learn', 'Practice'],
    goals: ['naming the day of the week', 'reading a simple clock', 'talking about your favorite season', 'discussing holiday traditions', 'planning a schedule']
  },
  {
    name: 'Imagination & Stories',
    count: 30,
    types: ['story', 'challenge'],
    topics: ['Fairy Tales', 'Superheroes', 'Space', 'Magic', 'Making up Stories'],
    verbs: ['Create', 'Imagine', 'Tell', 'Listen to', 'Invent'],
    goals: ['describing a hero', 'talking about space travel', 'retelling a short story', 'using descriptive adjectives', 'answering questions about a tale']
  },
  {
    name: 'Advanced Conversations',
    count: 30,
    types: ['roleplay', 'challenge'],
    topics: ['Giving Opinions', 'Comparing Things', 'Solving Problems', 'Agreeing', 'Disagreeing'],
    verbs: ['Debate', 'Discuss', 'Navigate', 'Express', 'Manage'],
    goals: ['stating why you like something more', 'politely disagreeing', 'explaining a simple problem', 'comparing two objects', 'finding a compromise']
  },
  {
    name: 'Fluency Capstone',
    count: 35,
    types: ['roleplay', 'story', 'challenge'],
    topics: ['Review: Home', 'Review: School', 'Review: Travel', 'Storytelling Masterclass', 'Final Celebration'],
    verbs: ['Master', 'Demonstrate', 'Showcase', 'Combine', 'Celebrate'],
    goals: ['using full connected sentences', 'holding a 5-minute conversation', 'switching topics naturally', 'speaking with high confidence', 'reviewing everything learned']
  }
];

let episodes = [];
let idCounter = 1;

stages.forEach((stage, stageIndex) => {
  for (let i = 1; i <= stage.count; i++) {
    const isFirst = idCounter === 1;
    const type = stage.types[Math.floor(Math.random() * stage.types.length)];
    const topic = stage.topics[Math.floor(Math.random() * stage.topics.length)];
    const verb = stage.verbs[Math.floor(Math.random() * stage.verbs.length)];
    const goal = stage.goals[Math.floor(Math.random() * stage.goals.length)];

    // For the first few days, hardcode exact ones to match the user's specific expectations
    let title = `Day ${idCounter}: ${topic}`;
    let description = `${verb} ${goal} in this interactive ${type} session.`;

    if (idCounter === 1) {
       title = "The First Hello";
       description = "Practice saying hello and introducing yourself naturally to Monday.";
    } else if (idCounter === 2) {
       title = "How Are You Today?";
       description = "Learn to express simple feelings and ask how Monday is doing.";
    } else if (idCounter === 3) {
       title = "Saying Goodbye";
       description = "Practice closing a conversation warmly and politely.";
    }

    episodes.push({
      id: idCounter.toString(),
      title: title,
      description: description,
      isLocked: !isFirst,
      isCompleted: false,
      stars: 0,
      type: type
    });
    idCounter++;
  }
});

const filePath = 'unimonday-web/src/lib/store/app-store.ts';
let code = fs.readFileSync(filePath, 'utf8');

const regex = /episodes: \[[\s\S]*?\],(?=\s+dailyQuests:)/;
const replacement = 'episodes: ' + JSON.stringify(episodes, null, 16) + ',';

code = code.replace(regex, replacement);
fs.writeFileSync(filePath, code);

console.log("Successfully injected 365 unique lessons.");
