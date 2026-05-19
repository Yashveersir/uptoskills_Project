export const mentors = [
  {
    id: "srk",
    name: "Shah Rukh Khan",
    role: "Business & Charisma",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Shah_Rukh_Khan_graces_the_launch_of_the_new_Santro.jpg",
    description: "The King of Bollywood brings his unparalleled charisma to teach you business ethics and communication.",
    expertise: ["Business", "Public Speaking", "Soft Skills"]
  },
  {
    id: "deepika",
    name: "Deepika Padukone",
    role: "Visual Arts & Wellness",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Deepika_Padukone_2025_%281%29.png/500px-Deepika_Padukone_2025_%281%29.png",
    description: "Deepika combines her focus on wellness and aesthetics to guide you through design and mindfulness.",
    expertise: ["UI/UX Design", "Mental Wellness", "Productivity"]
  },
  {
    id: "ranveer",
    name: "Ranveer Singh",
    role: "Creative Arts & Performance",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Ranveer_Singh_in_2023_%281%29_%28cropped%29.jpg",
    description: "Ranveer's high energy and creative flair will help you master the art of creative thinking and performance.",
    expertise: ["Creative Writing", "Marketing", "Brand Building"]
  },
  {
    id: "alia",
    name: "Alia Bhatt",
    role: "Modern Tech & Innovation",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg/960px-Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg",
    description: "Alia brings a fresh, modern perspective to help you understand the latest in tech and innovation.",
    expertise: ["Python", "AI Basics", "Social Media Strategy"]
  },
  {
    id: "akshay",
    name: "Akshay Kumar",
    role: "Discipline & Full-Stack",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Akshay_Kumar_National_Award_for_Padman_%28cropped%29.jpg",
    description: "Akshay's legendary discipline is the perfect guide for the rigorous journey of becoming a Full-Stack developer.",
    expertise: ["MERN Stack", "Fitness Tech", "Agile Methodologies"]
  }
];

export const getMentorById = (id) => mentors.find(m => m.id === id);
