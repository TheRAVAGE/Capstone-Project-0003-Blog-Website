import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 10000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// 1. storage
function formDetails(id, name, date, author, blog) {
  this.id = id;
  this.name = name;
  this.date = date;
  this.author = author;
  this.blog = blog;
}

let form = [];
let i = 0;
var idPosition;

//create dummy post
form[0] = new formDetails(
  "68433",
  "The Benefits of Remote Work and How to Make It Work for You",
  "2024-8-17 : 0:33:50",
  "ChatGPT",
  "Remote work has evolved from a rare perk to a common work arrangement, especially accelerated by the COVID-19 pandemic. Its benefits are numerous and varied, making it an attractive option for both employees and employers.\r\n" +
    "\r\n" +
    "One of the most notable advantages of remote work is the flexibility it offers. Employees can often set their own hours, which allows for a better balance between work and personal life. This flexibility can lead to increased job satisfaction and overall well-being. Additionally, many remote workers find they are more productive without the typical office distractions and time lost in commuting. The ability to create a personalized workspace can further enhance this productivity.\r\n" +
    "\r\n" +
    "Remote work also brings significant cost savings. Employees can save on commuting expenses, work attire, and daily lunches, thereby retaining more of their earnings. For employers, remote work opens up the opportunity to tap into a global talent pool, leading to more diverse teams and a broader range of skills. Moreover, reduced commuting translates to fewer carbon emissions, contributing positively to environmental sustainability.\r\n" +
    "\r\n" +
    "To make remote work successful, establishing a dedicated workspace at home is crucial. This helps to create a clear boundary between work and personal life, even if it’s just a small, organized corner of your home. Maintaining a consistent routine is also important; set regular work hours and adhere to them to stay disciplined and avoid blending work with leisure time.\r\n" +
    "\r\n" +
    "Leveraging technology is essential for effective remote work. Tools such as Slack, Zoom, and Asana facilitate communication and project management, helping you stay connected with your team and manage tasks efficiently. Regular communication with colleagues and managers is key to preventing feelings of isolation and ensuring alignment with team goals.\r\n" +
    "\r\n" +
    "Prioritizing your well-being cannot be overstated. Taking regular breaks, engaging in physical activity, and setting boundaries are vital to avoid burnout and maintain your mental and physical health. Flexibility is another significant benefit of remote work, so be prepared to adapt your routine or workspace as needed.\r\n" +
    "\r\n" +
    "In conclusion, remote work offers many benefits, including flexibility, cost savings, and increased productivity. By creating a dedicated workspace, sticking to a routine, using technology effectively, staying connected, and prioritizing well-being, you can maximize the advantages of this modern work arrangement and thrive in the evolving work landscape."
);

form[1] = new formDetails(
  "100807",
  "Embracing Minimalism: How Simplifying Your Life Can Lead to Greater Fulfillment",
  "2024-8-17 : 4:58:43",
  "Akhil M Mathew",
  "In a world that often glorifies excess, minimalism presents a refreshing alternative. This lifestyle philosophy focuses on simplifying life by reducing physical and mental clutter, ultimately leading to greater fulfillment and well-being. Embracing minimalism can transform various aspects of your life, making room for what truly matters.\r\n" +
    "\r\n" +
    "One of the primary benefits of minimalism is the reduction of physical clutter. By decluttering your home and eliminating unnecessary possessions, you create a more organized and serene living space. This not only makes it easier to find and appreciate what you own but also contributes to a calmer, less stressful environment. Studies have shown that a clutter-free space can positively impact mental health, leading to improved focus and reduced anxiety.\r\n" +
    "\r\n" +
    "Minimalism also extends beyond physical possessions. It encourages a more mindful approach to time management and personal commitments. By focusing on fewer, more meaningful activities, you can achieve a better work-life balance. This streamlined approach allows for deeper engagement in the tasks and relationships that matter most, enhancing overall life satisfaction.\r\n" +
    "\r\n" +
    "Financial benefits are another significant aspect of minimalism. By reducing spending on unnecessary items, you can save money and make more intentional financial decisions. This approach promotes thoughtful consumption and can lead to long-term financial stability. With fewer material possessions to maintain, you also reduce ongoing costs related to storage, maintenance, and replacement.\r\n" +
    "\r\n" +
    "Embracing minimalism can also foster personal growth and self-discovery. With fewer distractions and less focus on material wealth, you have more space to explore your values, passions, and goals. This self-awareness can lead to a more purposeful and fulfilling life. Minimalism encourages you to define success on your own terms, rather than conforming to societal expectations.\r\n" +
    "\r\n" +
    "To start incorporating minimalism into your life, begin with a thorough decluttering process. Assess your possessions and keep only those items that serve a practical purpose or bring you genuine joy. Apply the same principle to your schedule and commitments, focusing on activities that align with your values and long-term goals. Regularly evaluate and adjust your lifestyle to maintain a minimalist approach.\r\n" +
    "\r\n" +
    "In conclusion, minimalism offers a pathway to a more fulfilling life by simplifying both your physical surroundings and your mental space. By reducing clutter, managing time and finances more intentionally, and fostering personal growth, you can create a life that is richer in meaning and satisfaction. Embracing minimalism is not about depriving yourself but rather about making room for what truly enhances your life."
);
i = 2;

// form [i] =new formDetails();
// ID number Generation
var rng;
var randomIdGen;

//To give a unique random number
function randomNumberGenerator() {
  rng = Math.floor(Math.random() * 1000000);
  if (form.length > 0) {
    for (let j = 0; j < form.length; j++) {
      if (rng === form[j].id) {
        randomNumberGenerator();
      }
    }
  }
  return rng;
}

// 2. create
//DONE
// 3. Edit
//DONE
// 4. delete
function deleteForm(idPos) {
  for (var x = idPos; x < form.length; x++) {
    for (var y = idPos + 1; y < form.length; y++) {
      form[x] = form[y];
    }
  }
  form.pop();
}

// 5. search
function searchForID(idNumber) {
  for (var j = 0; j < form.length; j++) {
    if (idNumber === form[j].id) {
      return j;
    }
  }
}

// Http Request Handlers
app.get("/", (req, res) => {
  res.render("index.ejs", { form });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/form_create", (req, res) => {
  randomIdGen = randomNumberGenerator();
  res.render("formCreate.ejs", { randomIdGen });
});

app.post("/submit", (req, res) => {
  form[i] = new formDetails(
    req.body.ID,
    req.body.titleName,
    req.body.dateOfCreation,
    req.body.authorName,
    req.body.textContent
  );
  i++;
  res.redirect("/");
});

app.get("/form_view", (req, res) => {
  idPosition = searchForID(req.query.ID);
  var fromIdCheck = {
    id: form[idPosition].id,
    name: form[idPosition].name,
    date: form[idPosition].date,
    author: form[idPosition].author,
    blog: form[idPosition].blog,
  };
  res.render("formView.ejs", { fromIdCheck });
});

app.get("/form_edit", (req, res) => {
  idPosition = searchForID(req.query.ID);
  var fromIdCheck = {
    id: form[idPosition].id,
    name: form[idPosition].name,
    date: form[idPosition].date,
    author: form[idPosition].author,
    blog: form[idPosition].blog,
  };
  res.render("formEdit.ejs", { fromIdCheck });
});

app.post("/form_edit_sub", (req, res) => {
  idPosition = searchForID(req.body.ID);
  form[idPosition].name = req.body.titleName;
  form[idPosition].author = req.body.authorName;
  form[idPosition].blog = req.body.textContent;

  res.redirect(`/form_view?ID=${req.body.ID}`);
});

app.post("/form_delete", (req, res) => {
  idPosition = searchForID(req.body.ID);
  deleteForm(idPosition);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}. Lnk : http://localhost:${port}/`);
});
