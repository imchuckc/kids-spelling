/**
 * Build words.json — Graded vocabulary for kids spelling game.
 *
 * 5 non-overlapping levels. Each word belongs to EXACTLY ONE level.
 * Progression based on:
 *   - Dolch 95 Nouns + Dolch Sight Word frequency
 *   - Oxford Reading Tree Stages 1-5 alignment
 *   - Cambridge YLE Starters → Movers progression
 *   - Word length & syllable count
 *
 * Level 1: First Steps     (age 3-4) — 2-3 letter words, most basic nouns
 * Level 2: Little Learner  (age 4-5) — 3-4 letter words, everyday objects
 * Level 3: Growing Up      (age 5-6) — 4-5 letter words, wider world
 * Level 4: Explorer        (age 6-7) — 5-6 letter words, more variety
 * Level 5: Star Reader     (age 7-8) — 6+ letter words, complex vocabulary
 */

const WORDS = [
  // ==================== LEVEL 1: First Steps (age 3-4) ====================
  // 2-4 letter words. Dolch Pre-Primer nouns. ORT Stage 1.
  // ~40 words

  // Animals
  { id:'cat',  word:'cat',  zh:'猫',   cat:'animals', lvl:1, ex:[{en:'I have a cat.',zh:'我有一只猫。'},{en:'The cat is sleeping.',zh:'猫在睡觉。'}] },
  { id:'dog',  word:'dog',  zh:'狗',   cat:'animals', lvl:1, ex:[{en:'The dog is happy.',zh:'这只狗很开心。'},{en:'I like dogs.',zh:'我喜欢狗。'}] },
  { id:'pig',  word:'pig',  zh:'猪',   cat:'animals', lvl:1, ex:[{en:'The pig is pink.',zh:'猪是粉红色的。'}] },
  { id:'cow',  word:'cow',  zh:'牛',   cat:'animals', lvl:1, ex:[{en:'The cow is on the farm.',zh:'牛在农场上。'}] },
  { id:'hen',  word:'hen',  zh:'母鸡', cat:'animals', lvl:1, ex:[{en:'The hen has eggs.',zh:'母鸡有鸡蛋。'}] },
  { id:'bee',  word:'bee',  zh:'蜜蜂', cat:'animals', lvl:1, ex:[{en:'The bee is small.',zh:'蜜蜂很小。'}] },
  { id:'ant',  word:'ant',  zh:'蚂蚁', cat:'animals', lvl:1, ex:[{en:'The ant is tiny.',zh:'蚂蚁很小。'}] },

  // Body
  { id:'eye',  word:'eye',  zh:'眼睛', cat:'body', lvl:1, ex:[{en:'I have two eyes.',zh:'我有两只眼睛。'}] },
  { id:'ear',  word:'ear',  zh:'耳朵', cat:'body', lvl:1, ex:[{en:'I have two ears.',zh:'我有两只耳朵。'}] },
  { id:'leg',  word:'leg',  zh:'腿',   cat:'body', lvl:1, ex:[{en:'I have two legs.',zh:'我有两条腿。'}] },
  { id:'arm',  word:'arm',  zh:'手臂', cat:'body', lvl:1, ex:[{en:'Wave your arms.',zh:'挥动你的胳膊。'}] },

  // Food
  { id:'egg',  word:'egg',  zh:'鸡蛋', cat:'food', lvl:1, ex:[{en:'I want an egg.',zh:'我想要一个鸡蛋。'}] },
  { id:'pie',  word:'pie',  zh:'派',   cat:'food', lvl:1, ex:[{en:'I like pie.',zh:'我喜欢派。'}] },
  { id:'pea',  word:'pea',  zh:'豌豆', cat:'food', lvl:1, ex:[{en:'Peas are green.',zh:'豌豆是绿色的。'}] },
  { id:'nut',  word:'nut',  zh:'坚果', cat:'food', lvl:1, ex:[{en:'I like nuts.',zh:'我喜欢坚果。'}] },

  // Colors
  { id:'red',  word:'red',  zh:'红色', cat:'colors', lvl:1, ex:[{en:'The apple is red.',zh:'苹果是红色的。'}] },
  { id:'blue', word:'blue', zh:'蓝色', cat:'colors', lvl:1, ex:[{en:'The sky is blue.',zh:'天空是蓝色的。'}] },
  { id:'pink', word:'pink', zh:'粉色', cat:'colors', lvl:1, ex:[{en:'I like pink.',zh:'我喜欢粉色。'}] },

  // Things
  { id:'bed',  word:'bed',  zh:'床',   cat:'things', lvl:1, ex:[{en:'Go to bed!',zh:'去睡觉！'}] },
  { id:'cup',  word:'cup',  zh:'杯子', cat:'things', lvl:1, ex:[{en:'I have a cup.',zh:'我有一个杯子。'}] },
  { id:'box',  word:'box',  zh:'盒子', cat:'things', lvl:1, ex:[{en:'What\'s in the box?',zh:'盒子里有什么？'}] },
  { id:'toy',  word:'toy',  zh:'玩具', cat:'things', lvl:1, ex:[{en:'I have many toys.',zh:'我有很多玩具。'}] },
  { id:'bus',  word:'bus',  zh:'公交', cat:'things', lvl:1, ex:[{en:'I go by bus.',zh:'我坐公交车去。'}] },
  { id:'car',  word:'car',  zh:'汽车', cat:'things', lvl:1, ex:[{en:'Dad has a car.',zh:'爸爸有一辆车。'}] },
  { id:'hat',  word:'hat',  zh:'帽子', cat:'clothes', lvl:1, ex:[{en:'I have a red hat.',zh:'我有一顶红帽子。'}] },
  { id:'bag',  word:'bag',  zh:'包',   cat:'things', lvl:1, ex:[{en:'This is my bag.',zh:'这是我的包。'}] },
  { id:'pen',  word:'pen',  zh:'笔',   cat:'school', lvl:1, ex:[{en:'I have a pen.',zh:'我有一支笔。'}] },
  { id:'sun',  word:'sun',  zh:'太阳', cat:'nature', lvl:1, ex:[{en:'The sun is hot.',zh:'太阳很热。'}] },
  { id:'key',  word:'key',  zh:'钥匙', cat:'things', lvl:1, ex:[{en:'Where is the key?',zh:'钥匙在哪里？'}] },
  { id:'map',  word:'map',  zh:'地图', cat:'things', lvl:1, ex:[{en:'Look at the map.',zh:'看看地图。'}] },
  { id:'net',  word:'net',  zh:'网',   cat:'things', lvl:1, ex:[{en:'I have a net.',zh:'我有一个网。'}] },

  // People
  { id:'mom',  word:'mom',  zh:'妈妈', cat:'family', lvl:1, ex:[{en:'I love my mom.',zh:'我爱我的妈妈。'}] },
  { id:'dad',  word:'dad',  zh:'爸爸', cat:'family', lvl:1, ex:[{en:'My dad is tall.',zh:'我的爸爸很高。'}] },
  { id:'boy',  word:'boy',  zh:'男孩', cat:'family', lvl:1, ex:[{en:'The boy is happy.',zh:'男孩很开心。'}] },

  // Numbers
  { id:'one',  word:'one',  zh:'一', cat:'numbers', lvl:1, ex:[{en:'I have one book.',zh:'我有一本书。'}] },
  { id:'two',  word:'two',  zh:'二', cat:'numbers', lvl:1, ex:[{en:'I have two eyes.',zh:'我有两只眼睛。'}] },
  { id:'six',  word:'six',  zh:'六', cat:'numbers', lvl:1, ex:[{en:'I am six years old.',zh:'我六岁了。'}] },
  { id:'ten',  word:'ten',  zh:'十', cat:'numbers', lvl:1, ex:[{en:'I have ten fingers.',zh:'我有十个手指。'}] },

  // ==================== LEVEL 2: Little Learner (age 4-5) ====================
  // 3-5 letter words. Dolch Primer/Nouns. ORT Stage 2.
  // ~55 words

  // Animals
  { id:'duck', word:'duck', zh:'鸭子', cat:'animals', lvl:2, ex:[{en:'The duck is yellow.',zh:'鸭子是黄色的。'},{en:'Ducks can swim.',zh:'鸭子会游泳。'}] },
  { id:'bird', word:'bird', zh:'鸟',   cat:'animals', lvl:2, ex:[{en:'The bird can fly.',zh:'鸟会飞。'}] },
  { id:'fish', word:'fish', zh:'鱼',   cat:'animals', lvl:2, ex:[{en:'The fish is in the water.',zh:'鱼在水里。'}] },
  { id:'bear', word:'bear', zh:'熊',   cat:'animals', lvl:2, ex:[{en:'The bear is big.',zh:'熊很大。'},{en:'I have a teddy bear.',zh:'我有一只泰迪熊。'}] },
  { id:'frog', word:'frog', zh:'青蛙', cat:'animals', lvl:2, ex:[{en:'The frog can jump.',zh:'青蛙会跳。'}] },
  { id:'goat', word:'goat', zh:'山羊', cat:'animals', lvl:2, ex:[{en:'The goat is on the hill.',zh:'山羊在山上。'}] },
  { id:'lamb', word:'lamb', zh:'小羊', cat:'animals', lvl:2, ex:[{en:'The lamb is white.',zh:'小羊是白色的。'}] },

  // Body
  { id:'head', word:'head', zh:'头',   cat:'body', lvl:2, ex:[{en:'Touch your head.',zh:'摸摸你的头。'}] },
  { id:'hand', word:'hand', zh:'手',   cat:'body', lvl:2, ex:[{en:'Clap your hands.',zh:'拍拍你的手。'}] },
  { id:'face', word:'face', zh:'脸',   cat:'body', lvl:2, ex:[{en:'Wash your face.',zh:'洗洗你的脸。'}] },
  { id:'foot', word:'foot', zh:'脚',   cat:'body', lvl:2, ex:[{en:'Stamp your feet.',zh:'跺跺你的脚。'}] },
  { id:'nose', word:'nose', zh:'鼻子', cat:'body', lvl:2, ex:[{en:'Touch your nose.',zh:'摸摸你的鼻子。'}] },
  { id:'hair', word:'hair', zh:'头发', cat:'body', lvl:2, ex:[{en:'She has long hair.',zh:'她有长头发。'}] },
  { id:'tail', word:'tail', zh:'尾巴', cat:'body', lvl:2, ex:[{en:'The dog has a long tail.',zh:'狗有一条长尾巴。'}] },

  // Food
  { id:'cake', word:'cake', zh:'蛋糕', cat:'food', lvl:2, ex:[{en:'I like cake.',zh:'我喜欢蛋糕。'},{en:'This is a birthday cake.',zh:'这是生日蛋糕。'}] },
  { id:'milk', word:'milk', zh:'牛奶', cat:'food', lvl:2, ex:[{en:'I drink milk every day.',zh:'我每天喝牛奶。'}] },
  { id:'rice', word:'rice', zh:'米饭', cat:'food', lvl:2, ex:[{en:'I have rice for lunch.',zh:'我午饭吃米饭。'}] },
  { id:'meat', word:'meat', zh:'肉',   cat:'food', lvl:2, ex:[{en:'I like meat.',zh:'我喜欢肉。'}] },
  { id:'bean', word:'bean', zh:'豆子', cat:'food', lvl:2, ex:[{en:'I like beans.',zh:'我喜欢豆子。'}] },
  { id:'corn', word:'corn', zh:'玉米', cat:'food', lvl:2, ex:[{en:'I like corn.',zh:'我喜欢玉米。'}] },
  { id:'pear', word:'pear', zh:'梨',   cat:'food', lvl:2, ex:[{en:'This pear is sweet.',zh:'这个梨很甜。'}] },
  { id:'plum', word:'plum', zh:'李子', cat:'food', lvl:2, ex:[{en:'The plum is purple.',zh:'李子是紫色的。'}] },

  // Colors
  { id:'green',  word:'green',  zh:'绿色', cat:'colors', lvl:2, ex:[{en:'The frog is green.',zh:'青蛙是绿色的。'}] },
  { id:'black',  word:'black',  zh:'黑色', cat:'colors', lvl:2, ex:[{en:'The cat is black.',zh:'猫是黑色的。'}] },
  { id:'white',  word:'white',  zh:'白色', cat:'colors', lvl:2, ex:[{en:'Milk is white.',zh:'牛奶是白色的。'}] },
  { id:'brown',  word:'brown',  zh:'棕色', cat:'colors', lvl:2, ex:[{en:'The bear is brown.',zh:'熊是棕色的。'}] },

  // Numbers
  { id:'four',  word:'four',  zh:'四', cat:'numbers', lvl:2, ex:[{en:'A dog has four legs.',zh:'狗有四条腿。'}] },
  { id:'five',  word:'five',  zh:'五', cat:'numbers', lvl:2, ex:[{en:'I have five fingers.',zh:'我有五个手指。'}] },
  { id:'nine',  word:'nine',  zh:'九', cat:'numbers', lvl:2, ex:[{en:'I can count to nine.',zh:'我能数到九。'}] },

  // Things
  { id:'ball',  word:'ball',  zh:'球',     cat:'things', lvl:2, ex:[{en:'Kick the ball!',zh:'踢球！'}] },
  { id:'doll',  word:'doll',  zh:'娃娃',   cat:'things', lvl:2, ex:[{en:'I have a doll.',zh:'我有一个洋娃娃。'}] },
  { id:'kite',  word:'kite',  zh:'风筝',   cat:'things', lvl:2, ex:[{en:'I can fly a kite.',zh:'我会放风筝。'}] },
  { id:'boat',  word:'boat',  zh:'船',     cat:'things', lvl:2, ex:[{en:'The boat is on the water.',zh:'船在水上。'}] },
  { id:'book',  word:'book',  zh:'书',     cat:'school', lvl:2, ex:[{en:'I like reading books.',zh:'我喜欢读书。'}] },
  { id:'door',  word:'door',  zh:'门',     cat:'things', lvl:2, ex:[{en:'Open the door.',zh:'开门。'}] },
  { id:'bell',  word:'bell',  zh:'铃铛',   cat:'things', lvl:2, ex:[{en:'Ring the bell.',zh:'摇铃铛。'}] },
  { id:'tree',  word:'tree',  zh:'树',     cat:'nature', lvl:2, ex:[{en:'The tree is tall.',zh:'树很高。'}] },
  { id:'star',  word:'star',  zh:'星星',   cat:'nature', lvl:2, ex:[{en:'I can see the stars.',zh:'我能看到星星。'}] },
  { id:'lamp',  word:'lamp',  zh:'台灯',   cat:'things', lvl:2, ex:[{en:'Turn on the lamp.',zh:'开台灯。'}] },
  { id:'desk',  word:'desk',  zh:'书桌',   cat:'school', lvl:2, ex:[{en:'The book is on the desk.',zh:'书在桌子上。'}] },
  { id:'shoe',  word:'shoe',  zh:'鞋子',   cat:'clothes', lvl:2, ex:[{en:'Put on your shoes.',zh:'穿上你的鞋子。'}] },
  { id:'sock',  word:'sock',  zh:'袜子',   cat:'clothes', lvl:2, ex:[{en:'I have white socks.',zh:'我有白色的袜子。'}] },
  { id:'girl',  word:'girl',  zh:'女孩',   cat:'family', lvl:2, ex:[{en:'The girl has a red dress.',zh:'女孩穿着红裙子。'}] },
  { id:'baby',  word:'baby',  zh:'宝宝',   cat:'family', lvl:2, ex:[{en:'The baby is small.',zh:'宝宝很小。'}] },
  { id:'home',  word:'home',  zh:'家',     cat:'places', lvl:2, ex:[{en:'I go home.',zh:'我回家。'}] },
  { id:'park',  word:'park',  zh:'公园',   cat:'places', lvl:2, ex:[{en:'Let\'s go to the park.',zh:'我们去公园吧。'}] },
  { id:'shop',  word:'shop',  zh:'商店',   cat:'places', lvl:2, ex:[{en:'Let\'s go to the shop.',zh:'我们去商店吧。'}] },
  { id:'rain',  word:'rain',  zh:'雨',     cat:'nature', lvl:2, ex:[{en:'It\'s raining today.',zh:'今天下雨了。'}] },
  { id:'snow',  word:'snow',  zh:'雪',     cat:'nature', lvl:2, ex:[{en:'It\'s snowing!',zh:'下雪了！'}] },
  { id:'wind',  word:'wind',  zh:'风',     cat:'nature', lvl:2, ex:[{en:'The wind is strong.',zh:'风很大。'}] },
  { id:'song',  word:'song',  zh:'歌',     cat:'things', lvl:2, ex:[{en:'Sing a song!',zh:'唱首歌！'}] },
  { id:'game',  word:'game',  zh:'游戏',   cat:'sports', lvl:2, ex:[{en:'Let\'s play a game!',zh:'我们玩个游戏吧！'}] },

  // ==================== LEVEL 3: Growing Up (age 5-6) ====================
  // 4-6 letter words. Dolch Grade 1. ORT Stage 3. Cambridge YLE Starters basic.
  // ~60 words

  // Animals
  { id:'mouse',  word:'mouse',  zh:'老鼠',   cat:'animals', lvl:3, ex:[{en:'The mouse is small.',zh:'老鼠很小。'}] },
  { id:'snake',  word:'snake',  zh:'蛇',     cat:'animals', lvl:3, ex:[{en:'The snake is long.',zh:'蛇很长。'}] },
  { id:'horse',  word:'horse',  zh:'马',     cat:'animals', lvl:3, ex:[{en:'I can ride a horse.',zh:'我会骑马。'}] },
  { id:'sheep',  word:'sheep',  zh:'羊',     cat:'animals', lvl:3, ex:[{en:'I can see five sheep.',zh:'我能看到五只羊。'}] },
  { id:'tiger',  word:'tiger',  zh:'老虎',   cat:'animals', lvl:3, ex:[{en:'The tiger is big.',zh:'老虎很大。'}] },
  { id:'zebra',  word:'zebra',  zh:'斑马',   cat:'animals', lvl:3, ex:[{en:'The zebra is black and white.',zh:'斑马是黑白色的。'}] },
  { id:'panda',  word:'panda',  zh:'熊猫',   cat:'animals', lvl:3, ex:[{en:'The panda eats bamboo.',zh:'熊猫吃竹子。'}] },
  { id:'hippo',  word:'hippo',  zh:'河马',   cat:'animals', lvl:3, ex:[{en:'Hippos like water.',zh:'河马喜欢水。'}] },

  // Body
  { id:'mouth',  word:'mouth',  zh:'嘴巴',   cat:'body', lvl:3, ex:[{en:'Open your mouth.',zh:'张开你的嘴巴。'}] },
  { id:'teeth',  word:'teeth',  zh:'牙齿',   cat:'body', lvl:3, ex:[{en:'Brush your teeth.',zh:'刷刷你的牙齿。'}] },
  { id:'neck',   word:'neck',   zh:'脖子',   cat:'body', lvl:3, ex:[{en:'Giraffes have long necks.',zh:'长颈鹿有长脖子。'}] },

  // Food
  { id:'apple',  word:'apple',  zh:'苹果',   cat:'food', lvl:3, ex:[{en:'I like apples.',zh:'我喜欢苹果。'},{en:'The apple is red.',zh:'苹果是红色的。'}] },
  { id:'grape',  word:'grape',  zh:'葡萄',   cat:'food', lvl:3, ex:[{en:'The grapes are purple.',zh:'葡萄是紫色的。'}] },
  { id:'lemon',  word:'lemon',  zh:'柠檬',   cat:'food', lvl:3, ex:[{en:'Lemons are sour.',zh:'柠檬是酸的。'}] },
  { id:'mango',  word:'mango',  zh:'芒果',   cat:'food', lvl:3, ex:[{en:'The mango is sweet.',zh:'芒果很甜。'}] },
  { id:'bread',  word:'bread',  zh:'面包',   cat:'food', lvl:3, ex:[{en:'I like bread.',zh:'我喜欢面包。'}] },
  { id:'candy',  word:'candy',  zh:'糖果',   cat:'food', lvl:3, ex:[{en:'I want some candy.',zh:'我想要一些糖果。'}] },
  { id:'juice',  word:'juice',  zh:'果汁',   cat:'food', lvl:3, ex:[{en:'I like orange juice.',zh:'我喜欢橙汁。'}] },
  { id:'water',  word:'water',  zh:'水',     cat:'food', lvl:3, ex:[{en:'I want some water.',zh:'我想要一些水。'}] },
  { id:'chips',  word:'chips',  zh:'薯条',   cat:'food', lvl:3, ex:[{en:'I like chips.',zh:'我喜欢薯条。'}] },
  { id:'pizza',  word:'pizza',  zh:'披萨',   cat:'food', lvl:3, ex:[{en:'Let\'s eat pizza!',zh:'我们吃披萨吧！'}] },
  { id:'salad',  word:'salad',  zh:'沙拉',   cat:'food', lvl:3, ex:[{en:'I like salad.',zh:'我喜欢沙拉。'}] },
  { id:'pasta',  word:'pasta',  zh:'意面',   cat:'food', lvl:3, ex:[{en:'I like pasta.',zh:'我喜欢意面。'}] },

  // Colors
  { id:'yellow', word:'yellow', zh:'黄色',   cat:'colors', lvl:3, ex:[{en:'The banana is yellow.',zh:'香蕉是黄色的。'}] },
  { id:'purple', word:'purple', zh:'紫色',   cat:'colors', lvl:3, ex:[{en:'I like purple.',zh:'我喜欢紫色。'}] },
  { id:'orange_c', word:'orange', zh:'橙色', cat:'colors', lvl:3, ex:[{en:'I have an orange hat.',zh:'我有一顶橙色的帽子。'}] },
  { id:'gray',   word:'gray',   zh:'灰色',   cat:'colors', lvl:3, ex:[{en:'The elephant is gray.',zh:'大象是灰色的。'}] },

  // Numbers
  { id:'three', word:'three', zh:'三', cat:'numbers', lvl:3, ex:[{en:'I have three cats.',zh:'我有三只猫。'}] },
  { id:'seven', word:'seven', zh:'七', cat:'numbers', lvl:3, ex:[{en:'There are seven days in a week.',zh:'一周有七天。'}] },
  { id:'eight', word:'eight', zh:'八', cat:'numbers', lvl:3, ex:[{en:'A spider has eight legs.',zh:'蜘蛛有八条腿。'}] },

  // Clothes
  { id:'shirt', word:'shirt', zh:'衬衫',   cat:'clothes', lvl:3, ex:[{en:'I have a blue shirt.',zh:'我有一件蓝色衬衫。'}] },
  { id:'dress', word:'dress', zh:'裙子',   cat:'clothes', lvl:3, ex:[{en:'She has a nice dress.',zh:'她有一件漂亮的裙子。'}] },
  { id:'skirt', word:'skirt', zh:'短裙',   cat:'clothes', lvl:3, ex:[{en:'The skirt is pink.',zh:'裙子是粉色的。'}] },
  { id:'boots', word:'boots', zh:'靴子',   cat:'clothes', lvl:3, ex:[{en:'I wear boots when it rains.',zh:'下雨时我穿靴子。'}] },
  { id:'scarf', word:'scarf', zh:'围巾',   cat:'clothes', lvl:3, ex:[{en:'I have a warm scarf.',zh:'我有一条暖围巾。'}] },
  { id:'pants', word:'pants', zh:'裤子',   cat:'clothes', lvl:3, ex:[{en:'My pants are blue.',zh:'我的裤子是蓝色的。'}] },

  // Things & Transport
  { id:'plane', word:'plane', zh:'飞机',   cat:'things', lvl:3, ex:[{en:'The plane is in the sky.',zh:'飞机在天上。'}] },
  { id:'train', word:'train', zh:'火车',   cat:'things', lvl:3, ex:[{en:'The train is fast.',zh:'火车很快。'}] },
  { id:'truck', word:'truck', zh:'卡车',   cat:'things', lvl:3, ex:[{en:'The truck is big.',zh:'卡车很大。'}] },
  { id:'clock', word:'clock', zh:'钟',     cat:'school', lvl:3, ex:[{en:'Look at the clock.',zh:'看看钟。'}] },
  { id:'chair', word:'chair', zh:'椅子',   cat:'school', lvl:3, ex:[{en:'Sit on the chair.',zh:'坐在椅子上。'}] },
  { id:'table', word:'table', zh:'桌子',   cat:'things', lvl:3, ex:[{en:'The book is on the table.',zh:'书在桌子上。'}] },
  { id:'phone', word:'phone', zh:'电话',   cat:'things', lvl:3, ex:[{en:'Mom has a phone.',zh:'妈妈有一部手机。'}] },
  { id:'watch', word:'watch', zh:'手表',   cat:'things', lvl:3, ex:[{en:'I have a new watch.',zh:'我有一块新手表。'}] },
  { id:'photo', word:'photo', zh:'照片',   cat:'things', lvl:3, ex:[{en:'This is a family photo.',zh:'这是一张全家福。'}] },
  { id:'piano', word:'piano', zh:'钢琴',   cat:'things', lvl:3, ex:[{en:'She plays the piano.',zh:'她弹钢琴。'}] },

  // Places
  { id:'house', word:'house', zh:'房子', cat:'places', lvl:3, ex:[{en:'This is my house.',zh:'这是我的房子。'}] },
  { id:'beach', word:'beach', zh:'海滩', cat:'places', lvl:3, ex:[{en:'Let\'s go to the beach!',zh:'我们去海滩吧！'}] },
  { id:'farm',  word:'farm',  zh:'农场', cat:'places', lvl:3, ex:[{en:'I can see cows on the farm.',zh:'我能看到农场上有牛。'}] },
  { id:'zoo',   word:'zoo',   zh:'动物园', cat:'places', lvl:3, ex:[{en:'Let\'s go to the zoo!',zh:'我们去动物园吧！'}] },

  // People
  { id:'friend',  word:'friend',  zh:'朋友', cat:'family', lvl:3, ex:[{en:'She is my friend.',zh:'她是我的朋友。'}] },
  { id:'sister',  word:'sister',  zh:'姐妹', cat:'family', lvl:3, ex:[{en:'This is my sister.',zh:'这是我的姐妹。'}] },

  // Nature
  { id:'cloud', word:'cloud', zh:'云',   cat:'nature', lvl:3, ex:[{en:'The cloud is white.',zh:'云是白色的。'}] },
  { id:'sea',   word:'sea',   zh:'大海', cat:'nature', lvl:3, ex:[{en:'The sea is blue.',zh:'大海是蓝色的。'}] },
  { id:'moon',  word:'moon',  zh:'月亮', cat:'nature', lvl:3, ex:[{en:'Look at the moon!',zh:'看月亮！'}] },
  { id:'shell', word:'shell', zh:'贝壳', cat:'nature', lvl:3, ex:[{en:'I found a shell on the beach.',zh:'我在海滩上找到一个贝壳。'}] },

  // Sports
  { id:'sport', word:'sport', zh:'运动', cat:'sports', lvl:3, ex:[{en:'What sport do you like?',zh:'你喜欢什么运动？'}] },

  // ==================== LEVEL 4: Explorer (age 6-7) ====================
  // 5-7 letter words. Dolch Grade 2-3. ORT Stage 4. YLE Starters advanced.
  // ~60 words

  // Animals
  { id:'rabbit',  word:'rabbit',  zh:'兔子',   cat:'animals', lvl:4, ex:[{en:'Rabbits can jump.',zh:'兔子会跳。'},{en:'The rabbit is white.',zh:'兔子是白色的。'}] },
  { id:'monkey',  word:'monkey',  zh:'猴子',   cat:'animals', lvl:4, ex:[{en:'Monkeys like bananas.',zh:'猴子喜欢香蕉。'}] },
  { id:'spider',  word:'spider',  zh:'蜘蛛',   cat:'animals', lvl:4, ex:[{en:'A spider has eight legs.',zh:'蜘蛛有八条腿。'}] },
  { id:'donkey',  word:'donkey',  zh:'驴',     cat:'animals', lvl:4, ex:[{en:'The donkey is gray.',zh:'驴子是灰色的。'}] },
  { id:'lizard',  word:'lizard',  zh:'蜥蜴',   cat:'animals', lvl:4, ex:[{en:'The lizard is green.',zh:'蜥蜴是绿色的。'}] },
  { id:'parrot',  word:'parrot',  zh:'鹦鹉',   cat:'animals', lvl:4, ex:[{en:'Parrots can talk.',zh:'鹦鹉会说话。'}] },
  { id:'turtle',  word:'turtle',  zh:'乌龟',   cat:'animals', lvl:4, ex:[{en:'The turtle is slow.',zh:'乌龟很慢。'}] },
  { id:'kitten',  word:'kitten',  zh:'小猫',   cat:'animals', lvl:4, ex:[{en:'The kitten is cute.',zh:'小猫很可爱。'}] },
  { id:'puppy',   word:'puppy',   zh:'小狗',   cat:'animals', lvl:4, ex:[{en:'The puppy is playful.',zh:'小狗很爱玩。'}] },

  // Body
  { id:'finger',   word:'finger',   zh:'手指', cat:'body', lvl:4, ex:[{en:'I have ten fingers.',zh:'我有十个手指。'}] },
  { id:'shoulder', word:'shoulder', zh:'肩膀', cat:'body', lvl:4, ex:[{en:'Touch your shoulders.',zh:'摸摸你的肩膀。'}] },

  // Food
  { id:'banana',  word:'banana',  zh:'香蕉',   cat:'food', lvl:4, ex:[{en:'The banana is yellow.',zh:'香蕉是黄色的。'}] },
  { id:'orange',  word:'orange',  zh:'橙子',   cat:'food', lvl:4, ex:[{en:'Can I have an orange?',zh:'我能要一个橙子吗？'}] },
  { id:'tomato',  word:'tomato',  zh:'番茄',   cat:'food', lvl:4, ex:[{en:'The tomato is red.',zh:'番茄是红色的。'}] },
  { id:'potato',  word:'potato',  zh:'土豆',   cat:'food', lvl:4, ex:[{en:'I like potatoes.',zh:'我喜欢土豆。'}] },
  { id:'carrot',  word:'carrot',  zh:'胡萝卜', cat:'food', lvl:4, ex:[{en:'Rabbits like carrots.',zh:'兔子喜欢胡萝卜。'}] },
  { id:'burger',  word:'burger',  zh:'汉堡',   cat:'food', lvl:4, ex:[{en:'I want a burger.',zh:'我想要一个汉堡。'}] },
  { id:'cheese',  word:'cheese',  zh:'奶酪',   cat:'food', lvl:4, ex:[{en:'Mice like cheese.',zh:'老鼠喜欢奶酪。'}] },
  { id:'cookie',  word:'cookie',  zh:'饼干',   cat:'food', lvl:4, ex:[{en:'Can I have a cookie?',zh:'我能要一块饼干吗？'}] },
  { id:'noodle',  word:'noodles', zh:'面条',   cat:'food', lvl:4, ex:[{en:'Noodles are yummy.',zh:'面条很好吃。'}] },
  { id:'chicken', word:'chicken', zh:'鸡肉',   cat:'food', lvl:4, ex:[{en:'I like chicken.',zh:'我喜欢鸡肉。'}] },

  // Clothes
  { id:'jacket', word:'jacket', zh:'夹克',   cat:'clothes', lvl:4, ex:[{en:'Put on your jacket.',zh:'穿上你的夹克。'}] },
  { id:'shorts', word:'shorts', zh:'短裤',   cat:'clothes', lvl:4, ex:[{en:'I wear shorts in summer.',zh:'夏天我穿短裤。'}] },
  { id:'gloves', word:'gloves', zh:'手套',   cat:'clothes', lvl:4, ex:[{en:'I wear gloves in winter.',zh:'冬天我戴手套。'}] },

  // School
  { id:'pencil', word:'pencil', zh:'铅笔',   cat:'school', lvl:4, ex:[{en:'I have a pencil.',zh:'我有一支铅笔。'}] },
  { id:'ruler',  word:'ruler',  zh:'尺子',   cat:'school', lvl:4, ex:[{en:'I have a ruler.',zh:'我有一把尺子。'}] },
  { id:'eraser', word:'eraser', zh:'橡皮',   cat:'school', lvl:4, ex:[{en:'Can I use your eraser?',zh:'我能用你的橡皮吗？'}] },
  { id:'crayon', word:'crayon', zh:'蜡笔',   cat:'school', lvl:4, ex:[{en:'I have many crayons.',zh:'我有很多蜡笔。'}] },
  { id:'school', word:'school', zh:'学校',   cat:'school', lvl:4, ex:[{en:'I like my school.',zh:'我喜欢我的学校。'}] },
  { id:'paper',  word:'paper',  zh:'纸',     cat:'school', lvl:4, ex:[{en:'I need some paper.',zh:'我需要一些纸。'}] },

  // Things
  { id:'window', word:'window', zh:'窗户',   cat:'things', lvl:4, ex:[{en:'Open the window.',zh:'开窗。'}] },
  { id:'mirror', word:'mirror', zh:'镜子',   cat:'things', lvl:4, ex:[{en:'I can see myself in the mirror.',zh:'我能在镜子里看到自己。'}] },
  { id:'camera', word:'camera', zh:'相机',   cat:'things', lvl:4, ex:[{en:'Take a photo with the camera.',zh:'用相机拍照。'}] },
  { id:'guitar', word:'guitar', zh:'吉他',   cat:'things', lvl:4, ex:[{en:'I can play the guitar.',zh:'我会弹吉他。'}] },
  { id:'robot',  word:'robot',  zh:'机器人', cat:'things', lvl:4, ex:[{en:'I have a toy robot.',zh:'我有一个玩具机器人。'}] },
  { id:'bottle', word:'bottle', zh:'瓶子',   cat:'things', lvl:4, ex:[{en:'I have a bottle of water.',zh:'我有一瓶水。'}] },
  { id:'basket', word:'basket', zh:'篮子',   cat:'things', lvl:4, ex:[{en:'The fruit is in the basket.',zh:'水果在篮子里。'}] },

  // Places
  { id:'garden', word:'garden', zh:'花园',   cat:'places', lvl:4, ex:[{en:'I play in the garden.',zh:'我在花园里玩。'}] },
  { id:'street', word:'street', zh:'街道',   cat:'places', lvl:4, ex:[{en:'I live on this street.',zh:'我住在这条街上。'}] },
  { id:'forest', word:'forest', zh:'森林',   cat:'places', lvl:4, ex:[{en:'There are many trees in the forest.',zh:'森林里有很多树。'}] },
  { id:'bridge', word:'bridge', zh:'桥',     cat:'places', lvl:4, ex:[{en:'Walk across the bridge.',zh:'走过桥。'}] },

  // People
  { id:'brother', word:'brother', zh:'兄弟',   cat:'family', lvl:4, ex:[{en:'This is my brother.',zh:'这是我的兄弟。'}] },
  { id:'grandma', word:'grandma', zh:'奶奶',   cat:'family', lvl:4, ex:[{en:'I love my grandma.',zh:'我爱我的奶奶。'}] },
  { id:'grandpa', word:'grandpa', zh:'爷爷',   cat:'family', lvl:4, ex:[{en:'Grandpa tells me stories.',zh:'爷爷给我讲故事。'}] },
  { id:'teacher', word:'teacher', zh:'老师',   cat:'family', lvl:4, ex:[{en:'The teacher is nice.',zh:'老师很好。'}] },
  { id:'doctor',  word:'doctor',  zh:'医生',   cat:'family', lvl:4, ex:[{en:'The doctor is kind.',zh:'医生很和蔼。'}] },
  { id:'farmer',  word:'farmer',  zh:'农民',   cat:'family', lvl:4, ex:[{en:'The farmer has a cow.',zh:'农民有一头牛。'}] },

  // Nature
  { id:'flower', word:'flower', zh:'花',     cat:'nature', lvl:4, ex:[{en:'The flower is beautiful.',zh:'花很美。'}] },
  { id:'river',  word:'river',  zh:'河',     cat:'nature', lvl:4, ex:[{en:'The river is long.',zh:'河很长。'}] },
  { id:'island', word:'island', zh:'岛屿',   cat:'nature', lvl:4, ex:[{en:'The island is small.',zh:'岛屿很小。'}] },
  { id:'plant',  word:'plant',  zh:'植物',   cat:'nature', lvl:4, ex:[{en:'Water the plant.',zh:'浇浇植物。'}] },

  // Sports
  { id:'tennis',  word:'tennis',  zh:'网球', cat:'sports', lvl:4, ex:[{en:'I play tennis.',zh:'我打网球。'}] },
  { id:'hockey',  word:'hockey',  zh:'曲棍球', cat:'sports', lvl:4, ex:[{en:'I like hockey.',zh:'我喜欢曲棍球。'}] },

  // ==================== LEVEL 5: Star Reader (age 7-8) ====================
  // 6+ letter words. ORT Stage 5. YLE Movers. Complex vocabulary.
  // ~55 words

  // Animals
  { id:'giraffe',   word:'giraffe',   zh:'长颈鹿', cat:'animals', lvl:5, ex:[{en:'The giraffe is tall.',zh:'长颈鹿很高。'}] },
  { id:'elephant',  word:'elephant',  zh:'大象',   cat:'animals', lvl:5, ex:[{en:'Elephants have big ears.',zh:'大象有大耳朵。'}] },
  { id:'penguin',   word:'penguin',   zh:'企鹅',   cat:'animals', lvl:5, ex:[{en:'Penguins like the snow.',zh:'企鹅喜欢雪。'}] },
  { id:'dolphin',   word:'dolphin',   zh:'海豚',   cat:'animals', lvl:5, ex:[{en:'Dolphins are very clever.',zh:'海豚非常聪明。'}] },
  { id:'crocodile', word:'crocodile', zh:'鳄鱼',   cat:'animals', lvl:5, ex:[{en:'The crocodile is in the river.',zh:'鳄鱼在河里。'}] },
  { id:'kangaroo',  word:'kangaroo',  zh:'袋鼠',   cat:'animals', lvl:5, ex:[{en:'Kangaroos can jump very far.',zh:'袋鼠能跳得很远。'}] },
  { id:'squirrel',  word:'squirrel',  zh:'松鼠',   cat:'animals', lvl:5, ex:[{en:'The squirrel is in the tree.',zh:'松鼠在树上。'}] },
  { id:'jellyfish', word:'jellyfish', zh:'水母',   cat:'animals', lvl:5, ex:[{en:'I can see a jellyfish in the sea.',zh:'我能看到海里有水母。'}] },
  { id:'butterfly', word:'butterfly', zh:'蝴蝶',   cat:'animals', lvl:5, ex:[{en:'The butterfly is beautiful.',zh:'蝴蝶很美。'}] },

  // Food
  { id:'chocolate',  word:'chocolate',  zh:'巧克力', cat:'food', lvl:5, ex:[{en:'I love chocolate.',zh:'我爱巧克力。'}] },
  { id:'pineapple',  word:'pineapple',  zh:'菠萝',   cat:'food', lvl:5, ex:[{en:'I like pineapple.',zh:'我喜欢菠萝。'}] },
  { id:'watermelon', word:'watermelon', zh:'西瓜',   cat:'food', lvl:5, ex:[{en:'Watermelon is sweet.',zh:'西瓜很甜。'}] },
  { id:'sandwich',   word:'sandwich',   zh:'三明治', cat:'food', lvl:5, ex:[{en:'I have a sandwich for lunch.',zh:'我午饭吃三明治。'}] },
  { id:'sausage',    word:'sausage',    zh:'香肠',   cat:'food', lvl:5, ex:[{en:'I like sausages.',zh:'我喜欢香肠。'}] },
  { id:'ice_cream',  word:'ice cream',  zh:'冰淇淋', cat:'food', lvl:5, ex:[{en:'I love ice cream!',zh:'我爱冰淇淋！'}] },
  { id:'lemonade',   word:'lemonade',   zh:'柠檬水', cat:'food', lvl:5, ex:[{en:'I want some lemonade.',zh:'我想要一些柠檬水。'}] },

  // Clothes
  { id:'glasses',  word:'glasses',  zh:'眼镜', cat:'clothes', lvl:5, ex:[{en:'Grandpa wears glasses.',zh:'爷爷戴眼镜。'}] },
  { id:'sweater',  word:'sweater',  zh:'毛衣', cat:'clothes', lvl:5, ex:[{en:'My sweater is warm.',zh:'我的毛衣很暖和。'}] },
  { id:'umbrella', word:'umbrella', zh:'雨伞', cat:'clothes', lvl:5, ex:[{en:'Take your umbrella.',zh:'带上你的雨伞。'}] },

  // School
  { id:'computer',  word:'computer',  zh:'电脑',   cat:'school', lvl:5, ex:[{en:'I play on the computer.',zh:'我在电脑上玩。'}] },
  { id:'library',   word:'library',   zh:'图书馆', cat:'school', lvl:5, ex:[{en:'I read books in the library.',zh:'我在图书馆里看书。'}] },
  { id:'notebook',  word:'notebook',  zh:'笔记本', cat:'school', lvl:5, ex:[{en:'Write in your notebook.',zh:'写在你的笔记本上。'}] },
  { id:'bookcase',  word:'bookcase',  zh:'书柜',   cat:'school', lvl:5, ex:[{en:'The books are in the bookcase.',zh:'书在书柜里。'}] },

  // Things
  { id:'balloon',    word:'balloon',    zh:'气球',   cat:'things', lvl:5, ex:[{en:'I have a red balloon.',zh:'我有一个红色的气球。'}] },
  { id:'helicopter', word:'helicopter', zh:'直升机', cat:'things', lvl:5, ex:[{en:'I can see a helicopter.',zh:'我能看到一架直升机。'}] },
  { id:'picture',    word:'picture',    zh:'图画',   cat:'things', lvl:5, ex:[{en:'Draw a picture.',zh:'画一幅画。'}] },
  { id:'present',    word:'present',    zh:'礼物',   cat:'things', lvl:5, ex:[{en:'Thank you for the present!',zh:'谢谢你的礼物！'}] },
  { id:'blanket',    word:'blanket',    zh:'毯子',   cat:'things', lvl:5, ex:[{en:'The blanket is warm.',zh:'毯子很暖和。'}] },
  { id:'bicycle',    word:'bicycle',    zh:'自行车', cat:'things', lvl:5, ex:[{en:'I can ride a bicycle.',zh:'我会骑自行车。'}] },

  // Places
  { id:'kitchen',   word:'kitchen',   zh:'厨房',   cat:'places', lvl:5, ex:[{en:'Mom is in the kitchen.',zh:'妈妈在厨房里。'}] },
  { id:'bedroom',   word:'bedroom',   zh:'卧室',   cat:'places', lvl:5, ex:[{en:'I sleep in my bedroom.',zh:'我在卧室睡觉。'}] },
  { id:'bathroom',  word:'bathroom',  zh:'浴室',   cat:'places', lvl:5, ex:[{en:'Wash your hands in the bathroom.',zh:'在浴室洗手。'}] },
  { id:'hospital',  word:'hospital',  zh:'医院',   cat:'places', lvl:5, ex:[{en:'The doctor is in the hospital.',zh:'医生在医院里。'}] },
  { id:'mountain',  word:'mountain',  zh:'山',     cat:'places', lvl:5, ex:[{en:'The mountain is very high.',zh:'山非常高。'}] },
  { id:'village',   word:'village',   zh:'村庄',   cat:'places', lvl:5, ex:[{en:'The village is small.',zh:'村庄很小。'}] },

  // Nature
  { id:'rainbow',  word:'rainbow',  zh:'彩虹', cat:'nature', lvl:5, ex:[{en:'I can see a rainbow!',zh:'我能看到彩虹！'}] },

  // Sports
  { id:'football',   word:'football',   zh:'足球', cat:'sports', lvl:5, ex:[{en:'Let\'s play football!',zh:'我们踢足球吧！'}] },
  { id:'basketball', word:'basketball', zh:'篮球', cat:'sports', lvl:5, ex:[{en:'I play basketball.',zh:'我打篮球。'}] },
  { id:'baseball',   word:'baseball',   zh:'棒球', cat:'sports', lvl:5, ex:[{en:'I play baseball.',zh:'我打棒球。'}] },
];

const words = WORDS.map(w => ({
  id: w.id,
  word: w.word,
  zh: w.zh,
  img: `${w.cat}/${w.id}`,
  audio: `words/${w.word}`,
  category: w.cat,
  level: w.lvl,
  examples: w.ex,
}));

const json = JSON.stringify(words, null, 2);
require('fs').writeFileSync(
  require('path').join(__dirname, '..', 'src', 'data', 'words.json'),
  json, 'utf8'
);

// Stats
for (let lvl = 1; lvl <= 5; lvl++) {
  const count = words.filter(w => w.level === lvl).length;
  console.log(`Level ${lvl}: ${count} words`);
}
console.log(`\nTotal: ${words.length} words`);
